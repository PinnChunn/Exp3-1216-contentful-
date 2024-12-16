import { createClient } from 'contentful';
import { contentfulConfig } from '../config/contentful';
import { ContentfulEvent } from '../types/contentful';
import { Event, ApiResponse } from '../types/models';
import { mapContentfulEvent } from '../mappers/contentful';

const client = createClient(contentfulConfig);

// Helper to safely serialize error objects
const serializeError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const getEvents = async (): Promise<ApiResponse<Event[]>> => {
  try {
    const response = await client.getEntries<ContentfulEvent>({
      content_type: 'event',
      order: 'fields.date',
      include: 2, // Include nested entries up to 2 levels deep
    });

    // Safely map and transform the data
    const events = response.items.map((item) => {
      try {
        return mapContentfulEvent(item);
      } catch (error) {
        console.error(`Error mapping event ${item.sys?.id}:`, serializeError(error));
        return null;
      }
    }).filter((event): event is Event => event !== null);

    return {
      data: events,
      error: null,
    };
  } catch (error) {
    const errorMessage = serializeError(error);
    console.error('Error fetching events from Contentful:', errorMessage);
    return {
      data: null,
      error: 'Failed to fetch events. Please try again later.',
    };
  }
};

export const getEvent = async (id: string): Promise<ApiResponse<Event>> => {
  try {
    const entry = await client.getEntry<ContentfulEvent>(id, {
      include: 2, // Include nested entries up to 2 levels deep
    });
    
    return {
      data: mapContentfulEvent(entry),
      error: null,
    };
  } catch (error) {
    const errorMessage = serializeError(error);
    console.error('Error fetching event from Contentful:', errorMessage);
    return {
      data: null,
      error: 'Failed to fetch event details. Please try again later.',
    };
  }
};