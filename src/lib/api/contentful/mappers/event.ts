import { ContentfulEvent } from '../../../types/contentful';
import { Event } from '../../../types/models';
import { sanitizeUrl } from '../../../utils/url';
import { validateRequired } from '../../../utils/validation';

const mapInstructor = (instructorFields: ContentfulEvent['fields']['instructor']['fields']) => {
  // Create a new plain object with only the data we need
  return {
    name: instructorFields.name || '',
    role: instructorFields.role || '',
    avatar: sanitizeUrl(instructorFields.avatar?.fields?.file?.url),
    bio: instructorFields.bio || '',
    expertise: Array.from(instructorFields.expertise || []),
  };
};

export const mapContentfulEvent = (entry: ContentfulEvent): Event => {
  const { fields, sys } = entry;
  
  // Validate required fields
  if (!validateRequired(fields.title) || !validateRequired(sys.id)) {
    throw new Error('Missing required fields');
  }

  // Create a new plain object without any Symbol properties
  return {
    id: sys.id,
    title: fields.title,
    date: fields.date || '',
    time: fields.time || '',
    format: fields.format || '',
    description: fields.description || '',
    imageUrl: sanitizeUrl(fields.imageUrl?.fields?.file?.url),
    xp: Number(fields.xp) || 0,
    attendeeLimit: Number(fields.attendeeLimit) || 0,
    // Use Array.from to create new arrays without Symbol properties
    tags: Array.from(fields.tags || []),
    skills: Array.from(fields.skills || []),
    requirements: Array.from(fields.requirements || []),
    instructor: mapInstructor(fields.instructor.fields),
    meetingLink: fields.meetingLink || '',
    externalLink: fields.externalLink || '',
    duration: fields.duration || '',
    participants: Number(fields.participants) || 0,
    learningOutcomes: Array.from(fields.learningOutcomes || [])
  };
};