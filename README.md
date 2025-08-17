# Tanish-Bilish

A modern Next.js application built with TypeScript, TailwindCSS, Shadcn UI, and Supabase integration.

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Beautiful and accessible React components
- **Supabase** - Open-source Firebase alternative

## 📦 What's Included

- ✅ Next.js 14 with App Router
- ✅ TypeScript configuration
- ✅ TailwindCSS with custom design system
- ✅ Shadcn UI components (Button, Card, Input)
- ✅ Supabase client setup (browser & server)
- ✅ ESLint configuration
- ✅ PostCSS and Autoprefixer
- ✅ Responsive homepage design
- ✅ Dark mode support

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Supabase credentials in `.env.local`:
   - Get your project URL and anon key from [Supabase Dashboard](https://app.supabase.com)

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tanish-bilish/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   └── ui/               # Shadcn UI components
├── lib/                  # Utility functions
│   ├── utils.ts          # Class name utilities
│   ├── supabase.ts       # Supabase client
│   └── supabase/         # Supabase configurations
├── public/               # Static assets
└── ...config files
```

## 🎨 Customization

### Adding New Shadcn UI Components

To add more Shadcn UI components, you can copy them from the [Shadcn UI documentation](https://ui.shadcn.com/docs/components) and place them in the `components/ui/` directory.

### Supabase Integration

The app includes both client-side and server-side Supabase configurations:

- **Client-side**: `lib/supabase/client.ts`
- **Server-side**: `lib/supabase/server.ts`
- **Legacy**: `lib/supabase.ts`

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Use Tailwind classes

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js, TypeScript, TailwindCSS, Shadcn UI, and Supabase.
