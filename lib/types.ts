// TypeScript types for Tanish-Bilish Social Network

export type UserRole = 
  | 'Frontend Engineer'
  | 'Backend Engineer'
  | 'Full-Stack Engineer'
  | 'Mobile Engineer'
  | 'Data Scientist'
  | 'Data Analyst'
  | 'Data Engineer'
  | 'DevOps Engineer'
  | 'AI Engineer';

export interface Technology {
  id: string;
  name: string;
  category: string;
  created_at: string;
}

export interface CustomRole {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
}

export interface Province {
  id: string;
  name: string;
  name_uz: string;
  name_ru: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  first_name: string;
  surname: string;
  email: string;
  province_id?: string;
  technologies: string[];
  custom_technologies: string[];
  role?: UserRole;
  custom_role?: string;
  linkedin_url: string;
  github_url: string;
  telegram_url: string;
  instagram_url?: string;
  youtube_url?: string;
  registration_step: number;
  profile_completed: boolean;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface FriendRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface RegistrationStep1 {
  first_name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationStep2 {
  technologies: string[];
  custom_technologies: string[];
}

export interface RegistrationStep3 {
  role?: UserRole;
  custom_role?: string;
}

export interface RegistrationStep4 {
  linkedin_url: string;
  github_url: string;
  telegram_url: string;
  instagram_url?: string;
  youtube_url?: string;
}

export interface RegistrationData extends RegistrationStep1, RegistrationStep2, RegistrationStep3, RegistrationStep4 {}

export const DEFAULT_TECHNOLOGIES = [
  // Frontend
  { name: 'HTML', category: 'Frontend' },
  { name: 'CSS', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Vue', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Nuxt', category: 'Frontend' },
  
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'NestJS', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Django', category: 'Backend' },
  { name: 'Django REST API', category: 'Backend' },
  { name: '.NET', category: 'Backend' },
  { name: 'C#', category: 'Backend' },
  
  // Database
  { name: 'MySQL', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'SQL', category: 'Database' },
  { name: 'NoSQL', category: 'Database' },
  
  // Data & AI
  { name: 'AI', category: 'Data & AI' },
  { name: 'LLM', category: 'Data & AI' },
  { name: 'Data Science', category: 'Data & AI' },
  { name: 'PowerBI', category: 'Analytics' },
  { name: 'Excel', category: 'Analytics' }
];

export const DEFAULT_ROLES: UserRole[] = [
  'Frontend Engineer',
  'Backend Engineer',
  'Full-Stack Engineer',
  'Mobile Engineer',
  'Data Scientist',
  'Data Analyst',
  'Data Engineer',
  'DevOps Engineer',
  'AI Engineer'
];
