// src/components/visualization/CourseNode.tsx
import { memo } from 'react';
import { Handle, type NodeProps, Position } from 'reactflow';
import type { CourseStatus, Grade } from '../../types/student';

interface CourseNodeData {
  code: string;
  title: string;
  status: CourseStatus;
  credits: number;
  grade?: Grade;
  term?: string;
  description?: string;
}

const statusConfig: Record<CourseStatus, { color: string; label: string }> = {
  completed: { color: 'bg-green-500', label: 'Completed' },
  'in-progress': { color: 'bg-blue-500', label: 'In Progress' },
  planned: { color: 'bg-yellow-500', label: 'Planned' },
  'not-started': { color: 'bg-gray-400', label: 'Not Started' },
};

const gradeColors: Record<Grade, string> = {
  A: 'text-green-400',
  B: 'text-green-300',
  C: 'text-yellow-300',
  D: 'text-orange-400',
  F: 'text-red-400',
  IP: 'text-blue-300',
  'N/A': 'text-gray-400',
};

const CourseNode = ({ data }: NodeProps<CourseNodeData>) => {
  const statusStyle = statusConfig[data.status];
  const gradeColor = data.grade ? gradeColors[data.grade] : '';

  return (
    <div
      className="group relative"
      data-tooltip-id="course-tooltip"
      data-tooltip-content={data.description}
    >
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
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium text-gray-200">{data.code}</div>
            {data.grade && (
              <span
                className={`
                font-bold ${gradeColor}
                px-2 py-0.5 rounded text-sm
              `}
              >
                {data.grade}
              </span>
            )}
          </div>

          {/* Title */}
          <div className="text-sm text-gray-300 mb-2">{data.title}</div>

          {/* Details */}
          <div className="flex justify-between text-xs text-gray-400">
            <span>{data.credits} credits</span>
            {data.term && <span>{data.term}</span>}
          </div>

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

      {/* Handles */}
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
