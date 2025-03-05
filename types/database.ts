export interface SiteSettings {
  id: string;
  site_name: string;
  tagline: string;
  description: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  social_links: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  appearance: {
    primary_color: string;
    secondary_color: string;
    logo_url: string;
  };
  features: {
    enable_ai_chatroom: boolean;
    enable_enrollment: boolean;
    show_testimonials: boolean;
    show_expert_sessions: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface Placement {
  id: string;
  student_name: string;
  company: string;
  role: string;
  package: string; // salary package
  batch: string; // e.g. "2023"
  image_url: string;
  testimonial?: string;
  instagram_post_url?: string;
  instagram_post_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ExpertSession {
  id: string;
  expert_name: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in minutes
  topics: string[];
  image_url: string;
  linkedin_post_url?: string;
  linkedin_post_id?: string;
  registration_link?: string;
  is_recorded: boolean;
  recording_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in minutes
  location: string;
  image_url: string;
  linkedin_post_url?: string;
  linkedin_post_id?: string;
  registration_link?: string;
  is_recorded: boolean;
  recording_url?: string;
  created_at: string;
  updated_at: string;
}

export interface BehindTheScenes {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
  instagram_post_url?: string;
  instagram_post_id?: string;
  created_at: string;
  updated_at: string;
}
