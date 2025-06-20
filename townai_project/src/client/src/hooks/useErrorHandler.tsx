
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ErrorHandler } from '@/utils/errorHandler';

interface UseErrorHandlerReturn {
  error: string | null;
  isLoading: boolean;
  clearError: () => void;
  handleError: (error: any) => void;
  executeWithErrorHandling: <T>(
    asyncFn: () => Promise<T>,
    successMessage?: string
  ) => Promise<T | null>;
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error: any) => {
    const errorMessage = ErrorHandler.getErrorMessage(error);
    setError(errorMessage);
    
    ErrorHandler.logError(error, 'useErrorHandler');
    
    toast({
      title: "حدث خطأ",
      description: errorMessage,
      variant: "destructive",
    });
  }, [toast]);

  const executeWithErrorHandling = useCallback(async <T,>(
    asyncFn: () => Promise<T>,
    successMessage?: string
  ): Promise<T | null> => {
    try {
      setIsLoading(true);
      clearError();
      
      const result = await asyncFn();
      
      if (successMessage) {
        toast({
          title: "نجحت العملية",
          description: successMessage,
        });
      }
      
      return result;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [handleError, clearError, toast]);

  return {
    error,
    isLoading,
    clearError,
    handleError,
    executeWithErrorHandling
  };
};
