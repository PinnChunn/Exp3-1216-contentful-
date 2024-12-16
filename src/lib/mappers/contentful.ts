import { ContentfulEvent } from '../types/contentful';
import { Event } from '../types/models';

const sanitizeUrl = (url: string | undefined): string => {
  if (!url) return '';
  // Ensure URL starts with https:// if it's a relative URL
  return url.startsWith('//') ? `https:${url}` : url;
};

export const mapContentfulEvent = (contentfulEvent: ContentfulEvent): Event => {
  try {
    // Safely access nested properties with optional chaining
    const imageUrl = sanitizeUrl(contentfulEvent.fields.imageUrl?.fields?.file?.url);
    const avatarUrl = sanitizeUrl(contentfulEvent.fields.instructor?.fields?.avatar?.fields?.file?.url);

    return {
      id: contentfulEvent.sys.id,
      title: contentfulEvent.fields.title || '',
      date: contentfulEvent.fields.date || '',
      time: contentfulEvent.fields.time || '',
      format: contentfulEvent.fields.format || '',
      description: contentfulEvent.fields.description || '',
      imageUrl,
      xp: contentfulEvent.fields.xp || 0,
      attendeeLimit: contentfulEvent.fields.attendeeLimit || 0,
      tags: contentfulEvent.fields.tags || [],
      skills: contentfulEvent.fields.skills || [],
      requirements: contentfulEvent.fields.requirements || [],
      instructor: {
        name: contentfulEvent.fields.instructor?.fields?.name || '',
        role: contentfulEvent.fields.instructor?.fields?.role || '',
        avatar: avatarUrl,
        bio: contentfulEvent.fields.instructor?.fields?.bio || '',
        expertise: contentfulEvent.fields.instructor?.fields?.expertise || [],
      },
      meetingLink: contentfulEvent.fields.meetingLink,
      externalLink: contentfulEvent.fields.externalLink,
      duration: contentfulEvent.fields.duration,
      participants: contentfulEvent.fields.participants,
      learningOutcomes: contentfulEvent.fields.learningOutcomes || [],
    };
  } catch (error) {
    console.error('Error mapping Contentful event:', error);
    throw new Error('Failed to map Contentful event data');
  }
};