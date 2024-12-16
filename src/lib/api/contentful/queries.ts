import { contentfulClient } from './client';
import { ContentfulEvent } from '../../types/contentful';
import { Event, ApiResponse } from '../../types/models';
import { mapContentfulEvent } from './mappers/event';
import { serializeError, isNetworkError, isCorsError } from '../../utils/error';
import { handleResponse } from '../../utils/http';

export const fetchEvents = async (): Promise<ApiResponse<Event[]>> => {
  try {
    const response = await contentfulClient.getEntries<ContentfulEvent>({
      content_type: 'event',
      order: 'fields.date',
      include: 2,
    });

    // Safely transform the response
    const events = await Promise.all(
      response.items.map(async (item) => {
        try {
          // Clone the item to remove Symbol properties
          const cleanItem = JSON.parse(JSON.stringify(item));
          return mapContentfulEvent(cleanItem);
        } catch (error) {
          console.error(`Error mapping event ${item.sys?.id}:`, serializeError(error));
          return null;
        }
      })
    );

    return {
      data: events.filter((event): event is Event => event !== null),
      error: null,
    };
  } catch (error) {
    console.error('Error fetching events:', serializeError(error));
    
    // Provide more specific error messages
    if (isNetworkError(error)) {
      return {
        data: null,
        error: 'Network error. Please check your connection.',
      };
    }
    
    if (isCorsError(error)) {
      return {
        data: null,
        error: 'Access denied. Please try again later.',
      };
    }

    return {
      data: null,
      error: 'Failed to fetch events. Please try again later.',
    };
  }
};