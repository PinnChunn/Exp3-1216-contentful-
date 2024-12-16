import { useState, useEffect } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useAsync = <T>(
  asyncFn: () => Promise<{ data: T | null; error: string | null }>,
  dependencies: any[] = []
) => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const { data, error } = await asyncFn();
        
        if (!mounted) return;

        setState({
          data,
          loading: false,
          error,
        });
      } catch (err) {
        if (!mounted) return;
        setState({
          data: null,
          loading: false,
          error: 'An unexpected error occurred',
        });
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, dependencies);

  return state;
};