
import { memo } from 'react';
import { Handle, type NodeProps, Position } from 'reactflow';
import type { CourseCategory, CourseStatus, Grade } from '../../types/student';

interface CourseNodeData {
  code: string;
  title: string;
  status: CourseStatus;
  credits: number;
  grade?: Grade;
  term?: string;
  description?: string;
  categories: CourseCategory[];
  requirements?: {
    minGrade?: string;
    majorGPA?: boolean;
  };
  isFlexible?: boolean;
}

const statusConfig: Record<CourseStatus, { color: string; label: string }> = {
  completed: { color: 'bg-green-500', label: 'Completed' },
  'in-progress': { color: 'bg-blue-500', label: 'In Progress' },
  planned: { color: 'bg-yellow-500', label: 'Planned' },
  'not-started': { color: 'bg-gray-400', label: 'Not Started' },
};

const categoryColors: Record<CourseCategory, string> = {
  'Gen Ed': 'bg-purple-500',
  'WCOB Lower Level Core': 'bg-blue-500',
  'WCOB Upper Level Core': 'bg-indigo-500',
  'Major Requirement': 'bg-red-500',
  'Free Elective': 'bg-gray-500',
};

const CourseNode = ({ data }: NodeProps<CourseNodeData>) => {
  const statusStyle = statusConfig[data.status];

  return (
    <div className="group relative">
      <div
        className={`
        w-[250px] rounded-lg border border-gray-700 bg-gray-800
        shadow-lg transition-transform duration-200 group-hover:scale-105
      `}
      >
        {/* Status indicator */}
        <div
          className={`
          h-1.5 rounded-t-lg ${statusStyle.color}
          transition-all duration-200 group-hover:h-2
        `}
        />

        {/* Main content */}
        <div className="p-4">
          {/* Header with code and requirements */}
          <div className="flex justify-between text-xs text-gray-400">
            {data.term && <span>{data.term}</span>}
          </div>
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium text-gray-200">{data.code}</div>
            <div className="flex flex-col items-end">
              {data.grade && (
                <span
                  className={`font-bold text-sm px-2 py-0.5 rounded
                  ${data.grade === 'IP' ? 'text-blue-300' : 'text-green-400'}`}
                >
                  {data.grade}
                </span>
              )}
              {data.requirements?.minGrade && (
                <span className="text-xs text-gray-400">Min: {data.requirements.minGrade}</span>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="text-sm text-gray-300 mb-2">
            {data.isFlexible ? `Choose: ${data.title}` : data.title}
          </div>

          {/* Categories */}
          {data.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {data.categories.map((category) => (
                <span
                  key={category}
                  className={`px-1.5 py-0.5 rounded-full text-xs text-white
                ${categoryColors[category]} bg-opacity-80`}
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Details */}
          <div className="flex justify-between text-xs text-gray-400">
            <span>{data.credits} credits</span>
          </div>

          {/* Major GPA Indicator */}
          {data.requirements?.majorGPA && (
            <div className="mt-1 text-xs text-yellow-500">Counts in Major GPA</div>
          )}

          {/* Status label */}
          <div className="mt-2 text-xs">
            <span
              className={`
              px-2 py-1 rounded-full 
              ${statusStyle.color.replace('bg-', 'text-')} 
              bg-opacity-10
            `}
            >
              {statusStyle.label}
            </span>
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-gray-700 border-2 border-gray-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-gray-700 border-2 border-gray-500"
      />
    </div>
  );
};

export default memo(CourseNode);
