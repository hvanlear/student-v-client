import { useCallback, useState } from 'react';
import { FileUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/services/api/api';
import { cn } from '@/lib/utils';
import { UploadProgress } from './UploadProgress';
import axios from 'axios';
import type { CancelTokenSource } from 'axios';

import type { UploadResponse } from '@/types/api';

interface FileUploadProps {
  onUploadSuccess?: (data: UploadResponse) => void;
  onUploadError?: (error: Error) => void;
  className?: string;
}

export function FileUpload({ onUploadSuccess, onUploadError, className }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    'preparing' | 'uploading' | 'processing' | 'success' | 'error'
  >('preparing');
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(null);

  const resetUpload = useCallback(() => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadStatus('preparing');
    setCancelToken(null);
  }, []);

  const uploadMutation = useMutation<UploadResponse, Error, File>({
    mutationFn: async (file: File) => {
      setUploadStatus('uploading');
      const source = axios.CancelToken.source();
      setCancelToken(source);

      try {
        const response = await apiService.uploadPdf(file, {
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
          cancelToken: source.token,
        });

        setUploadStatus('processing');
        setUploadProgress(100);
        return response;
      } catch (error) {
        if (axios.isCancel(error)) {
          throw new Error('Upload cancelled by user');
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      setUploadStatus('success');
      onUploadSuccess?.(data);
      setTimeout(resetUpload, 2000);
    },
    onError: (error) => {
      setUploadStatus('error');
      onUploadError?.(error);
    },
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus('preparing');
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === 'application/pdf') {
      setSelectedFile(file);
      setUploadStatus('preparing');
    }
  }, []);

  const handleUpload = useCallback(() => {
    if (selectedFile) {
      setUploadProgress(0);
      setUploadStatus('preparing');
      uploadMutation.mutate(selectedFile);
    }
  }, [selectedFile, uploadMutation]);

  const handleCancel = useCallback(() => {
    cancelToken?.cancel('Upload cancelled by user');
    resetUpload();
  }, [cancelToken, resetUpload]);

  return (
    <div className={cn('w-full max-w-xl mx-auto space-y-4', className)}>
      <div
        className={cn(
          'relative rounded-lg border-2 border-dashed p-8 text-center',
          dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
          selectedFile ? 'bg-muted/50' : ''
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="space-y-4">
            <FileUp className="mx-auto h-10 w-10 text-muted-foreground" />
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedFile.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={resetUpload}
                disabled={uploadMutation.isPending}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {!uploadMutation.isPending && (
              <Button onClick={handleUpload} className="mt-2">
                Upload PDF
              </Button>
            )}
          </div>
        ) : (
          <>
            <FileUp className="mx-auto h-10 w-10 text-muted-foreground" />
            <div className="mt-4">
              <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary hover:text-primary/80">
                <span>Choose a PDF</span>
                <input type="file" className="sr-only" accept=".pdf" onChange={handleFileInput} />
              </label>
              <p className="text-sm text-muted-foreground mt-1">or drag and drop</p>
            </div>
          </>
        )}
      </div>

      {uploadMutation.isPending && (
        <UploadProgress progress={uploadProgress} status={uploadStatus} onCancel={handleCancel} />
      )}

      {uploadMutation.isError && (
        <div className="mt-4 p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
          {uploadMutation.error.message}
        </div>
      )}
    </div>
  );
}
