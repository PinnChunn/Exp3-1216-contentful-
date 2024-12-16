import { createClient } from 'contentful';

const client = createClient({
  space: 'h4x0zkfupnbi',
  accessToken: 'usl1XJA55TCyu-PDscYIISoki8fQCv0BqiUoCe-N4Cw',
  environment: 'master',
});

export interface ContentfulEvent {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    date: string;
    time: string;
    format: string;
    description: string;
    imageUrl: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    xp: number;
    attendeeLimit: number;
    tags: string[];
    skills: string[];
    requirements: string[];
    instructor: {
      fields: {
        name: string;
        role: string;
        avatar: {
          fields: {
            file: {
              url: string;
            };
          };
        };
        bio: string;
        expertise: string[];
      };
    };
    meetingLink?: string;
    externalLink?: string;
    duration?: string;
    participants?: number;
    learningOutcomes?: string[];
  };
}

export const getContentfulEvents = async () => {
  try {
    const response = await client.getEntries<ContentfulEvent>({
      content_type: 'event',
      order: 'fields.date',
    });

    return {
      events: response.items.map(item => ({
        id: item.sys.id,
        ...item.fields,
        imageUrl: item.fields.imageUrl?.fields.file.url || '',
        instructor: {
          ...item.fields.instructor.fields,
          avatar: item.fields.instructor.fields.avatar?.fields.file.url || '',
        },
      })),
      error: null,
    };
  } catch (error) {
    console.error('Error fetching events from Contentful:', error);
    return {
      events: [],
      error: 'Failed to fetch events',
    };
  }
};

export const getContentfulEvent = async (id: string) => {
  try {
    const entry = await client.getEntry<ContentfulEvent>(id);
    
    return {
      event: {
        id: entry.sys.id,
        ...entry.fields,
        imageUrl: entry.fields.imageUrl?.fields.file.url || '',
        instructor: {
          ...entry.fields.instructor.fields,
          avatar: entry.fields.instructor.fields.avatar?.fields.file.url || '',
        },
      },
      error: null,
    };
  } catch (error) {
    console.error('Error fetching event from Contentful:', error);
    return {
      event: null,
      error: 'Failed to fetch event',
    };
  }
};