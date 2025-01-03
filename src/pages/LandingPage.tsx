import { Button } from '../components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/services/api/api';

export default function LandingPage() {
  const testMutation = useMutation({
    mutationFn: apiService.test,
    onSuccess: (data) => {
      console.log('Successss', data);
    },
  });
  return (
    <div className="w-full mx-auto text-center">
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <h1 className="text-4xl font-bold mb-6">Student Viz</h1>
        <Button
          onClick={() => {
            testMutation.mutate();
          }}
          disabled={testMutation.isPending}
        >
          {testMutation.isPending ? 'Testing...' : 'Test Connection'}
        </Button>
        {testMutation.isError && (
          <pre className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg text-left overflow-auto">
            {testMutation.error.message}
          </pre>
        )}
        {testMutation.isSuccess && (
          <pre className="mt-4 p-4 bg-muted rounded-lg text-left overflow-auto">
            {JSON.stringify(testMutation.data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
