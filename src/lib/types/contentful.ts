// Contentful specific types
export interface ContentfulSys {
  id: string;
}

export interface ContentfulFile {
  fields: {
    file: {
      url: string;
    };
  };
}

export interface ContentfulInstructor {
  fields: {
    name: string;
    role: string;
    avatar: ContentfulFile;
    bio: string;
    expertise: string[];
  };
}

export interface ContentfulEvent {
  sys: ContentfulSys;
  fields: {
    title: string;
    date: string;
    time: string;
    format: string;
    description: string;
    imageUrl: ContentfulFile;
    xp: number;
    attendeeLimit: number;
    tags: string[];
    skills: string[];
    requirements: string[];
    instructor: ContentfulInstructor;
    meetingLink?: string;
    externalLink?: string;
    duration?: string;
    participants?: number;
    learningOutcomes?: string[];
  };
}