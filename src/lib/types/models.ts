// Application domain models
export interface Instructor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  expertise: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  format: string;
  description: string;
  imageUrl: string;
  xp: number;
  attendeeLimit: number;
  tags: string[];
  skills: string[];
  requirements: string[];
  instructor: Instructor;
  meetingLink?: string;
  externalLink?: string;
  duration?: string;
  participants?: number;
  learningOutcomes?: string[];
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}