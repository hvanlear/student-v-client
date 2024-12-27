import { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  type Edge,
  MarkerType,
  type Node,
  type NodeTypes,
  Panel,
} from 'reactflow';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
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
      horizontalSpacing: 400,
      verticalSpacing: 200,
      nodeWidth: 250,
      nodeHeight: 150,
      padding: 50,
      semesterSpacing: 150,
    });

    return layoutNodes.map((course) => ({
      id: course.id,
      type: 'courseNode',
      position: course.position,
      data: {
        code: course.code,
        title: course.title,
        status: course.status,
        credits: course.credits,
        categories: course.categories,
        grade: course.grade,
        term: course.term,
        description: course.description,
        requirements: course.requirements,
        isFlexible: course.isFlexible,
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
          style: {
            stroke: '#6366f1',
            strokeWidth: 2,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#6366f1',
          },
        }))
      ),
    [courses]
  );

  const totalCredits = useMemo(
    () => courses.reduce((sum, course) => sum + course.credits, 0),
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
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
      >
        <Background gap={12} size={1} />
        <Controls />
        <Tooltip id="course-tooltip" className="z-50 max-w-md" place="top" delayShow={200} />

        <Panel position="top-left" className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="text-white space-y-2">
            <div className="font-medium">Degree Progress</div>
            <div className="text-sm">
              <div>Total Courses: {courses.length}</div>
              <div>Total Credits: {totalCredits}</div>
              <div>Prerequisites: {edges.length}</div>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default JourneyGraph;
