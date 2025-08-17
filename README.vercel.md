# Vercel Deployment Guide for Tanish-Bilish

## Prerequisites
- Vercel account (free tier works)
- GitHub/GitLab repository with your code
- Supabase project set up

## Quick Deploy Steps

### 1. Connect Repository to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select "tanishbilish" folder as root directory

### 2. Configure Environment Variables
Add these variables in Vercel dashboard under Settings > Environment Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://qyurjasflvddrziqlefu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5dXJqYXNmbHZkZHJ6aXFsZWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MjM2NDEsImV4cCI6MjA3MDk5OTY0MX0.8u-3c7svqpwVJwuy8B6qKUHNB-Qk3hhkh5WHjJM2Tbg
```

### 3. Build Settings (Auto-detected)
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. Deploy
Click "Deploy" - Vercel will automatically build and deploy your app.

## Files Added for Vercel Compatibility

### `vercel.json`
- Framework configuration
- Function timeout settings
- Security headers
- Routing rules

### `next.config.js` (Updated)
- Standalone output for better performance
- Image optimization settings
- Build optimizations

### `.vercelignore`
- Excludes unnecessary files from deployment
- Reduces bundle size

## Common Issues & Solutions

### Build Errors
- Check TypeScript errors: Set `typescript.ignoreBuildErrors: false` in next.config.js
- ESLint errors: Set `eslint.ignoreDuringBuilds: true` in next.config.js

### Environment Variables
- Ensure all `NEXT_PUBLIC_` variables are set in Vercel dashboard
- Variables are case-sensitive

### Database Connection
- Supabase should work automatically with provided keys
- Check Supabase dashboard for connection issues

## Performance Optimizations Included

1. **Standalone Output**: Smaller deployment bundle
2. **Image Optimization**: Automatic image optimization
3. **Compression**: Gzip compression enabled
4. **Framer Motion**: Package optimization for animations
5. **Security Headers**: XSS protection, content type options

## Post-Deployment Checklist

- [ ] App loads without errors
- [ ] Authentication works (login/register)
- [ ] Database operations work
- [ ] All pages render correctly
- [ ] Mobile responsiveness works
- [ ] Environment variables are set correctly

## Support
If deployment fails, check:
1. Build logs in Vercel dashboard
2. Environment variables are correctly set
3. Supabase connection is working
4. All dependencies are in package.json
