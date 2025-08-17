# Supabase Database Setup for Tanish-Bilish

## Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized
3. Copy your project URL and anon key from Settings > API

## Step 2: Set Environment Variables
1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 3: Run Database Schema
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the entire contents of `lib/database.sql`
4. Click "Run" to execute the schema

## What the Schema Creates:
- **User profiles table** with all registration fields
- **Technologies table** with predefined tech stack options
- **Custom roles table** for user-defined roles
- **User technologies junction table** for many-to-many relationships
- **Row Level Security policies** for data protection
- **Automatic triggers** for profile creation and updates

## Verify Setup:
After running the schema, you should see these tables in your Supabase dashboard:
- `user_profiles`
- `technologies` (pre-populated with tech stack options)
- `custom_roles`
- `user_technologies`

The app will now work with full database functionality!
