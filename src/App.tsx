// src/App.tsx
import JourneyGraph from './components/visualization/JourneyGraph';
import type { CourseNode } from './types/student';

const sampleCourses: CourseNode[] = [
  {
    id: 'math101',
    code: 'MATH 101',
    title: 'Introduction to Calculus',
    credits: 3,
    prerequisites: [],
    status: 'completed',
  },
  {
    id: 'math102',
    code: 'MATH 102',
    title: 'Advanced Calculus',
    credits: 3,
    prerequisites: ['math101'],
    status: 'in-progress',
  },
  {
    id: 'math103',
    code: 'MATH 103',
    title: 'Linear Algebra',
    credits: 3,
    prerequisites: ['math101'],
    status: 'planned',
  },
  {
    id: 'math201',
    code: 'MATH 201',
    title: 'Differential Equations',
    credits: 3,
    prerequisites: ['math102'],
    status: 'not-started',
  },
  {
    id: 'math202',
    code: 'MATH 202',
    title: 'Complex Analysis',
    credits: 3,
    prerequisites: ['math102', 'math103'],
    status: 'not-started',
  },
];

const App = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <h1 className="text-2xl font-bold p-4">Student Journey Visualization</h1>
      <div className="flex-1">
        <JourneyGraph courses={sampleCourses} />
      </div>
    </div>
  );
};

export default App;
