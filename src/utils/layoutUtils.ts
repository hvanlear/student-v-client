// src/utils/layoutUtils.ts
import type { CourseNode } from '../types/student';

interface Position {
  x: number;
  y: number;
}

interface NodeWithLayout extends CourseNode {
  level?: number;
  position: Position;
  width: number;
  height: number;
}

interface LayoutConfig {
  horizontalSpacing: number;
  verticalSpacing: number;
  nodeWidth: number;
  nodeHeight: number;
  padding: number;
}

const DEFAULT_CONFIG: LayoutConfig = {
  horizontalSpacing: 250,
  verticalSpacing: 150,
  nodeWidth: 200,
  nodeHeight: 80,
  padding: 20,
};

function detectOverlap(node1: NodeWithLayout, node2: NodeWithLayout): boolean {
  return (
    Math.abs(node1.position.x - node2.position.x) < (node1.width + node2.width) / 2 &&
    Math.abs(node1.position.y - node2.position.y) < (node1.height + node2.height) / 2
  );
}

function adjustNodePosition(
  node: NodeWithLayout,
  allNodes: NodeWithLayout[],
  config: LayoutConfig
): void {
  const overlappingNodes = allNodes.filter((other) => other !== node && detectOverlap(node, other));

  if (overlappingNodes.length === 0) return;

  // Try to move horizontally first
  const moveRight = overlappingNodes.some((other) => other.position.x <= node.position.x);

  if (moveRight) {
    node.position.x += config.horizontalSpacing / 2;
  } else {
    node.position.x -= config.horizontalSpacing / 2;
  }
}

export const calculateNodeLayout = (
  courses: CourseNode[],
  config: Partial<LayoutConfig> = {}
): NodeWithLayout[] => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const nodeMap = new Map<string, NodeWithLayout>();

  // Initialize nodes with positions and dimensions
  courses.forEach((course) => {
    nodeMap.set(course.id, {
      ...course,
      position: { x: 0, y: 0 },
      level: undefined,
      width: finalConfig.nodeWidth,
      height: finalConfig.nodeHeight,
    });
  });

  // Calculate levels (y-positions) based on prerequisites
  const assignLevels = (nodeId: string, currentLevel = 0): void => {
    const node = nodeMap.get(nodeId);
    if (!node) return;

    if (node.level === undefined || currentLevel > node.level) {
      node.level = currentLevel;
    }

    courses.forEach((course) => {
      if (course.prerequisites.includes(nodeId)) {
        assignLevels(course.id, currentLevel + 1);
      }
    });
  };

  // Start with nodes that have no prerequisites
  courses
    .filter((course) => course.prerequisites.length === 0)
    .forEach((course) => {
      assignLevels(course.id);
    });

  // Group nodes by level with explicit array initialization
  const nodesByLevel = Array.from(nodeMap.values()).reduce<NodeWithLayout[][]>((acc, node) => {
    const level = node.level ?? 0;
    // Initialize the array for this level if it doesn't exist
    acc[level] = acc[level] || [];
    acc[level].push(node);
    return acc;
  }, []);

  // Initial positioning
  nodesByLevel.forEach((level, levelIndex) => {
    const levelWidth = level.length * finalConfig.horizontalSpacing;
    const startX = -levelWidth / 2;

    level.forEach((node, nodeIndex) => {
      node.position = {
        x: startX + nodeIndex * finalConfig.horizontalSpacing,
        y: levelIndex * finalConfig.verticalSpacing,
      };
    });
  });

  // Adjust positions to avoid overlaps
  const allNodes = Array.from(nodeMap.values());
  let iterations = 0;
  const MAX_ITERATIONS = 100;

  let shouldContinue = true;
  while (shouldContinue && iterations < MAX_ITERATIONS) {
    shouldContinue = false;

    nodesByLevel.forEach((level) => {
      level.forEach((node) => {
        const hasOverlap = allNodes.some((other) => other !== node && detectOverlap(node, other));

        if (hasOverlap) {
          adjustNodePosition(node, allNodes, finalConfig);
          shouldContinue = true;
        }
      });
    });

    iterations += 1;
  }

  // Center nodes horizontally after all adjustments
  nodesByLevel.forEach((level) => {
    const minX = Math.min(...level.map((node) => node.position.x));
    const maxX = Math.max(...level.map((node) => node.position.x));
    const centerOffset = (minX + maxX) / 2;

    level.forEach((node) => {
      node.position.x -= centerOffset;
    });
  });

  return allNodes;
};
