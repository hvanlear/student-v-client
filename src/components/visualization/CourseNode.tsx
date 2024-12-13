// src/components/visualization/CourseNodeComponent.tsx
import { memo } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position } from 'reactflow';
import type { CourseStatus } from '../../types/student';

interface CourseNodeData {
  label: string;
  status: CourseStatus;
  credits: number;
}

const statusColors: Record<CourseStatus, string> = {
  completed: 'bg-green-500',
  'in-progress': 'bg-blue-500',
  planned: 'bg-yellow-500',
  'not-started': 'bg-gray-300',
};

const CourseNodeComponent = ({ data }: NodeProps<CourseNodeData>) => {
  const bgColor = statusColors[data.status] || statusColors['not-started'];

  return (
    <div className={`px-4 py-2 rounded-lg border ${bgColor} shadow-md`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="font-bold text-sm">{data.label}</div>
      <div className="text-xs">Credits: {data.credits}</div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};

export default memo(CourseNodeComponent);
