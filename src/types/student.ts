// src/types/student.ts
export type CourseStatus = 'completed' | 'in-progress' | 'planned' | 'not-started';

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F' | 'IP' | 'N/A';

export interface CourseNode {
  id: string;
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  status: CourseStatus;
  // Optional fields
  grade?: Grade;
  term?: string;
  description?: string;
  completionDate?: string; // Added this field
}

export interface StudentProgress {
  studentId: string;
  program: string;
  courses: CourseNode[];
}

// Helper type for node data passed to ReactFlow
export interface CourseNodeData {
  code: string;
  title: string;
  status: CourseStatus;
  credits: number;
  grade?: Grade;
  term?: string;
  description?: string;
  completionDate?: string; // Added this field here as well
}
