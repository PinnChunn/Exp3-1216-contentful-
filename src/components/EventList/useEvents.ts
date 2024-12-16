import { useState, useEffect, useCallback } from 'react';
import { Event } from '../../lib/types/models';
import { fetchEvents } from '../../lib/api/contentful/queries';

interface EventsState {
  events: Event[] | null;
  loading: boolean;
  error: string | null;
}

export const useEvents = () => {
  const [state, setState] = useState<EventsState>({
    events: null,
    loading: true,
    error: null
  });

  const loadEvents = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const { data, error } = await fetchEvents();
      
      setState({
        events: data,
        loading: false,
        error
      });
    } catch (error) {
      setState({
        events: null,
        loading: false,
        error: 'Failed to load events'
      });
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const refresh = useCallback(() => {
    loadEvents();
  }, [loadEvents]);

  return { ...state, refresh };
};