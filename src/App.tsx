import JourneyGraph from './components/visualization/JourneyGraph';
import { degreeProgram } from './services/data/sampleData';

const App = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <h1 className="text-2xl font-bold p-4">Student Journey Visualization</h1>
      <div className="flex-1">
        <JourneyGraph courses={degreeProgram} />
      </div>
    </div>
  );
};

export default App;
