export interface CourseNode {
  id: string;
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  status: 'completed' | 'in-progress' | 'planned' | 'not-started';
}

export interface StudentProgress {
  studentId: string;
  program: string;
  courses: CourseNode[];
}
