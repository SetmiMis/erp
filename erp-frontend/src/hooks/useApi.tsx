// erp-frontend/src/hooks/useApi.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiRequest, ApiError } from '../lib/apiClient';

// Hook ke return value ke liye ek type define kar rahe hain
interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Custom hook ko ek generic type <T> ke saath define kiya gaya hai
// T ka matlab hai 'Type', yeh data ke structure ko represent karega
export function useApi<T = any>(endpoint: string): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // apiRequest resolves the base URL (with the /api prefix), attaches the
      // auth header, and unwraps the backend's { success, message, data } envelope.
      const result = await apiRequest<T>(endpoint);
      setData(result);
    } catch (err) {
      if (err instanceof ApiError || err instanceof Error) {
        setError(err.message);
        console.error('API Hook Error:', err.message);
      } else {
        setError('An unknown error occurred.');
        console.error('API Hook Unknown Error:', err);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
