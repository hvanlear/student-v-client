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
  semesterSpacing: number;
}

const DEFAULT_CONFIG: LayoutConfig = {
  horizontalSpacing: 250,
  verticalSpacing: 150,
  nodeWidth: 200,
  nodeHeight: 80,
  padding: 20,
  semesterSpacing: 100,
};

function groupBySemester(courses: CourseNode[]): Map<string, CourseNode[]> {
  const semesterMap = new Map<string, CourseNode[]>();

  const semesterOrder = [
    'Semester One',
    'Semester Two',
    'Semester Three',
    'Semester Four',
    'Semester Five',
    'Semester Six',
    'Semester Seven',
    'Semester Eight',
  ];

  semesterOrder.forEach((semester) => {
    semesterMap.set(semester, []);
  });

  courses.forEach((course) => {
    if (course.term) {
      const coursesInSemester = semesterMap.get(course.term) || [];
      coursesInSemester.push(course);
      semesterMap.set(course.term, coursesInSemester);
    }
  });

  return semesterMap;
}

function detectOverlap(node1: NodeWithLayout, node2: NodeWithLayout): boolean {
  return (
    Math.abs(node1.position.x - node2.position.x) < (node1.width + node2.width) / 2 &&
    Math.abs(node1.position.y - node2.position.y) < (node1.height + node2.height) / 2
  );
}

function adjustNodePositionsInSemester(nodes: NodeWithLayout[], config: LayoutConfig): void {
  let hasOverlap = true;
  let iterations = 0;
  const MAX_ITERATIONS = 100;

  while (hasOverlap && iterations < MAX_ITERATIONS) {
    hasOverlap = false;
    iterations++;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (detectOverlap(nodes[i], nodes[j])) {
          hasOverlap = true;
          const pushDistance = config.horizontalSpacing * 0.1;
          nodes[i].position.x -= pushDistance;
          nodes[j].position.x += pushDistance;
        }
      }
    }
  }

  // Center the nodes after adjusting positions
  const minX = Math.min(...nodes.map((n) => n.position.x));
  const maxX = Math.max(...nodes.map((n) => n.position.x));
  const centerOffset = (minX + maxX) / 2;
  nodes.forEach((node) => {
    node.position.x -= centerOffset;
  });
}

export const calculateNodeLayout = (
  courses: CourseNode[],
  config: Partial<LayoutConfig> = {}
): NodeWithLayout[] => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const semesterMap = groupBySemester(courses);
  const allNodes: NodeWithLayout[] = [];
  let currentY = finalConfig.padding;

  // Process each semester
  Array.from(semesterMap.entries()).forEach(([_semester, semesterCourses]) => {
    if (semesterCourses.length === 0) return;

    // Calculate initial positions
    const semesterWidth = semesterCourses.length * finalConfig.horizontalSpacing;
    const startX = -semesterWidth / 2;
    const semesterNodes: NodeWithLayout[] = [];

    // Position each course in the semester
    semesterCourses.forEach((course, index) => {
      const node: NodeWithLayout = {
        ...course,
        position: {
          x: startX + index * finalConfig.horizontalSpacing,
          y: currentY,
        },
        width: finalConfig.nodeWidth,
        height: finalConfig.nodeHeight,
      };
      semesterNodes.push(node);
      allNodes.push(node);
    });

    // Adjust positions for this semester's nodes
    adjustNodePositionsInSemester(semesterNodes, finalConfig);

    // Move to next semester vertical position
    currentY += finalConfig.verticalSpacing + finalConfig.semesterSpacing;
  });

  return allNodes;
};

export const calculateSemesterLabels = (
  courses: CourseNode[],
  config: LayoutConfig
): SemesterLabel[] => {
  const semesterMap = groupBySemester(courses);
  const labels: SemesterLabel[] = [];
  let currentY = config.padding;

  Array.from(semesterMap.entries()).forEach(([semester, semesterCourses]) => {
    if (semesterCourses.length === 0) return;

    labels.push({
      id: `label-${semester}`,
      text: semester,
      position: {
        x: -config.horizontalSpacing * 2,
        y: currentY + config.nodeHeight / 2,
      },
    });

    currentY += config.verticalSpacing + config.semesterSpacing;
  });

  return labels;
};

export interface SemesterLabel {
  id: string;
  text: string;
  position: Position;
}
