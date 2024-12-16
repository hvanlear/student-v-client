// src/types/student.ts
export type CourseStatus = 'completed' | 'in-progress' | 'planned' | 'not-started';
export type Grade = 'A' | 'B' | 'C' | 'D' | 'F' | 'IP' | 'N/A';

export type CourseCategory =
  | 'Gen Ed'
  | 'WCOB Lower Level Core'
  | 'WCOB Upper Level Core'
  | 'Major Requirement'
  | 'Free Elective';

export interface CourseRequirement {
  minGrade?: string; // For cases like "C-" requirement
  majorGPA?: boolean; // For courses that count in major GPA
}

export interface CourseNode {
  id: string;
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  status: CourseStatus;
  categories: CourseCategory[];
  requirements?: CourseRequirement;
  isFlexible?: boolean; // For Gen Ed choices
  allowedChoices?: string[]; // For flexible requirements

  // Optional fields
  grade?: Grade;
  term?: string;
  description?: string;
  completionDate?: string;
}
