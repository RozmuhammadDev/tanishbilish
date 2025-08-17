-- Tanish-Bilish Social Network Database Schema
-- This file contains the SQL commands to set up the database structure

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing types and tables if they exist
DROP TABLE IF EXISTS user_technologies CASCADE;
DROP TABLE IF EXISTS custom_roles CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS technologies CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- Create enum types for user roles and technology categories
CREATE TYPE user_role AS ENUM (
  'Frontend Engineer',
  'Backend Engineer', 
  'Full-Stack Engineer',
  'Mobile Engineer',
  'Data Scientist',
  'Data Analyst',
  'Data Engineer',
  'DevOps Engineer',
  'AI Engineer'
);

-- Create technologies table for predefined tech stack options
CREATE TABLE IF NOT EXISTS technologies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default technologies
INSERT INTO technologies (name, category) VALUES
  -- Frontend Technologies
  ('HTML', 'Frontend'),
  ('CSS', 'Frontend'),
  ('Bootstrap', 'Frontend'),
  ('JavaScript', 'Frontend'),
  ('TypeScript', 'Frontend'),
  ('React', 'Frontend'),
  ('Vue', 'Frontend'),
  ('Angular', 'Frontend'),
  ('Next.js', 'Frontend'),
  ('Nuxt', 'Frontend'),
  
  -- Backend Technologies
  ('Node.js', 'Backend'),
  ('Express', 'Backend'),
  ('NestJS', 'Backend'),
  ('Python', 'Backend'),
  ('Django', 'Backend'),
  ('Django REST API', 'Backend'),
  ('.NET', 'Backend'),
  ('C#', 'Backend'),
  
  -- Database Technologies
  ('MySQL', 'Database'),
  ('PostgreSQL', 'Database'),
  ('SQL', 'Database'),
  ('NoSQL', 'Database'),
  
  -- Data & AI Technologies
  ('AI', 'Data & AI'),
  ('LLM', 'Data & AI'),
  ('Data Science', 'Data & AI'),
  ('PowerBI', 'Analytics'),
  ('Excel', 'Analytics')
ON CONFLICT (name) DO NOTHING;

-- Create custom_roles table for user-defined roles
CREATE TABLE IF NOT EXISTS custom_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table with custom authentication
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Step 1: Basic Info
  first_name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  
  -- Step 2: Technology Stack (stored as array of UUIDs)
  technologies UUID[] DEFAULT '{}',
  custom_technologies TEXT[] DEFAULT '{}',
  
  -- Step 3: Tech Field/Role
  role user_role,
  custom_role VARCHAR(100),
  
  -- Step 4: Social Links
  linkedin_url VARCHAR(255),
  github_url VARCHAR(255),
  telegram_url VARCHAR(255),
  instagram_url VARCHAR(255),
  youtube_url VARCHAR(255),
  
  -- Profile completion tracking
  registration_step INTEGER DEFAULT 1,
  profile_completed BOOLEAN DEFAULT FALSE,
  
  -- Authentication
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_technologies junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS user_technologies (
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  technology_id UUID REFERENCES technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, technology_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Remove Supabase Auth triggers since we're using custom authentication

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at on user_profiles
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Disable Row Level Security for easier access
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE technologies DISABLE ROW LEVEL SECURITY;
ALTER TABLE custom_roles DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_technologies DISABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_registration_step ON user_profiles(registration_step);
CREATE INDEX IF NOT EXISTS idx_technologies_category ON technologies(category);
CREATE INDEX IF NOT EXISTS idx_user_technologies_user_id ON user_technologies(user_id);
CREATE INDEX IF NOT EXISTS idx_user_technologies_technology_id ON user_technologies(technology_id);
