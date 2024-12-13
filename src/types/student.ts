export type CourseStatus = 'completed' | 'in-progress' | 'planned' | 'not-started';

export interface CourseNode {
  id: string;
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  status: CourseStatus;
}

export interface StudentProgress {
  studentId: string;
  program: string;
  courses: CourseNode[];
}
