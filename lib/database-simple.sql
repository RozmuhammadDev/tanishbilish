-- Simple Database Schema for Tanish-Bilish (No RLS, No Complex Types)

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS friend_requests CASCADE;
DROP TABLE IF EXISTS user_technologies CASCADE;
DROP TABLE IF EXISTS custom_roles CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS technologies CASCADE;
DROP TABLE IF EXISTS provinces CASCADE;

-- Create provinces table first
CREATE TABLE provinces (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  name_uz VARCHAR(100) NOT NULL,
  name_ru VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Uzbekistan provinces
INSERT INTO provinces (name, name_uz, name_ru) VALUES
  ('Andijan Region', 'Andijon viloyati', 'Андижанская область'),
  ('Bukhara Region', 'Buxoro viloyati', 'Бухарская область'),
  ('Fergana Region', 'Farg''ona viloyati', 'Ферганская область'),
  ('Jizzakh Region', 'Jizzax viloyati', 'Джизакская область'),
  ('Namangan Region', 'Namangan viloyati', 'Наманганская область'),
  ('Navoi Region', 'Navoiy viloyati', 'Навоийская область'),
  ('Kashkadarya Region', 'Qashqadaryo viloyati', 'Кашкадарьинская область'),
  ('Samarkand Region', 'Samarqand viloyati', 'Самаркандская область'),
  ('Surkhandarya Region', 'Surxondaryo viloyati', 'Сурхандарьинская область'),
  ('Syrdarya Region', 'Sirdaryo viloyati', 'Сырдарьинская область'),
  ('Tashkent Region', 'Toshkent viloyati', 'Ташкентская область'),
  ('Khorezm Region', 'Xorazm viloyati', 'Хорезмская область'),
  ('Republic of Karakalpakstan', 'Qoraqalpog''iston Respublikasi', 'Республика Каракалпакстан')
ON CONFLICT (name) DO NOTHING;

-- Create technologies table
CREATE TABLE technologies (
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

-- Create user_profiles table with simple structure
CREATE TABLE user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Step 1: Basic Info
  first_name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  
  -- Location
  province_id UUID REFERENCES provinces(id),
  
  -- Step 2: Technology Stack (stored as text arrays)
  technologies TEXT[] DEFAULT '{}',
  custom_technologies TEXT[] DEFAULT '{}',
  
  -- Step 3: Tech Field/Role (stored as text)
  role VARCHAR(100),
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

-- Create custom_roles table
CREATE TABLE custom_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_technologies junction table
CREATE TABLE user_technologies (
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  technology_id UUID REFERENCES technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, technology_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Create friend_requests table
CREATE TABLE friend_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(sender_id, receiver_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_registration_step ON user_profiles(registration_step);
CREATE INDEX IF NOT EXISTS idx_user_profiles_province_id ON user_profiles(province_id);
CREATE INDEX IF NOT EXISTS idx_technologies_category ON technologies(category);
CREATE INDEX IF NOT EXISTS idx_user_technologies_user_id ON user_technologies(user_id);
CREATE INDEX IF NOT EXISTS idx_user_technologies_technology_id ON user_technologies(technology_id);
CREATE INDEX IF NOT EXISTS idx_friend_requests_sender_id ON friend_requests(sender_id);
CREATE INDEX IF NOT EXISTS idx_friend_requests_receiver_id ON friend_requests(receiver_id);
CREATE INDEX IF NOT EXISTS idx_friend_requests_status ON friend_requests(status);
