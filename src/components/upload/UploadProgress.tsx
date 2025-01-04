import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadProgressProps {
  progress: number;
  status: 'preparing' | 'uploading' | 'processing' | 'success' | 'error';
  onCancel?: () => void;
  className?: string;
}

export function UploadProgress({ progress, status, onCancel, className }: UploadProgressProps) {
  const statusMessages = {
    preparing: 'Preparing upload...',
    uploading: 'Uploading PDF...',
    processing: 'Processing document...',
    success: 'Upload complete!',
    error: 'Upload failed',
  };

  const progressColor = status === 'error' ? 'bg-destructive' : undefined;

  return (
    <div className={cn('w-full space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{statusMessages[status]}</span>
        {(status === 'uploading' || status === 'processing') && (
          <Button variant="ghost" size="sm" onClick={onCancel} className="h-6 w-6 p-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Progress
        value={progress}
        className={cn('h-2', status === 'error' && '[&>.bg-primary]:bg-destructive')}
      />
    </div>
  );
}
