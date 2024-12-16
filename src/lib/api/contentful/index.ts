import { Event, ApiResponse } from '../../types/models';
import { fetchEvents, fetchEvent } from './queries';
import { mapContentfulEvent } from './mappers/event';
import { createApiError } from '../../utils/error';

export const getEvents = async (): Promise<ApiResponse<Event[]>> => {
  try {
    const response = await fetchEvents();

    const events = response.items
      .map((item) => {
        try {
          return mapContentfulEvent(item);
        } catch (error) {
          console.error(`Error mapping event ${item.sys?.id}:`, error);
          return null;
        }
      })
      .filter((event): event is Event => event !== null);

    return {
      data: events,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: createApiError('Failed to fetch events', error),
    };
  }
};

export const getEvent = async (id: string): Promise<ApiResponse<Event>> => {
  try {
    const entry = await fetchEvent(id);
    
    return {
      data: mapContentfulEvent(entry),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: createApiError('Failed to fetch event', error),
    };
  }
};