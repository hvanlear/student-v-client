// src/components/visualization/JourneyGraph.tsx
import { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  type Edge,
  type Node,
  type NodeTypes,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { CourseNode } from '../../types/student';
import CourseNodeComponent from './CourseNode';
import { calculateNodeLayout } from '../../utils/layoutUtils';

interface JourneyGraphProps {
  courses: CourseNode[];
}

const nodeTypes: NodeTypes = {
  courseNode: CourseNodeComponent,
};

const JourneyGraph = ({ courses }: JourneyGraphProps) => {
  const nodes: Node[] = useMemo(() => {
    const layoutNodes = calculateNodeLayout(courses, {
      horizontalSpacing: 300, // Increased spacing
      verticalSpacing: 150,
      nodeWidth: 200,
      nodeHeight: 80,
      padding: 30,
    });

    return layoutNodes.map((course) => ({
      id: course.id,
      type: 'courseNode',
      position: course.position,
      data: {
        label: `${course.code}\n${course.title}`,
        status: course.status,
        credits: course.credits,
      },
    }));
  }, [courses]);

  const edges: Edge[] = useMemo(
    () =>
      courses.flatMap((course) =>
        course.prerequisites.map((prereq) => ({
          id: `${prereq}-${course.id}`,
          source: prereq,
          target: course.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#555', strokeWidth: 2 },
        }))
      ),
    [courses]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-gray-900"
        minZoom={0.1}
        maxZoom={1.5}
      >
        <Background />
        <Controls />
        <Panel position="top-left" className="bg-gray-800 p-2 rounded">
          <div className="text-white text-sm">
            {courses.length} Courses • {edges.length} Prerequisites
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default JourneyGraph;
