export interface Skill {
  id: string;
  name: string;
  level: number;
  icon: string;
  color: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  image: string;
  demo_url: string;
  github_url: string;
  title_en: string;
  title_uz: string;
  title_ru: string;
  description_en: string;
  description_uz: string;
  description_ru: string;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  key: string;
  icon: string;
  color: string;
  title_en: string;
  title_uz: string;
  title_ru: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  github_url: string;
  telegram_url: string;
  linkedin_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface CVInfo {
  id: string;
  name: string;
  title: string;
  experience: string;
  projects_count: string;
  skills_count: string;
  cv_file_url: string;
  key_skills: string[];
  created_at?: string;
  updated_at?: string;
}

export interface AboutSection {
  id: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
  content_uz: string;
  content_en: string;
  content_ru: string;
  experience_years?: string;
  projects_completed?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

