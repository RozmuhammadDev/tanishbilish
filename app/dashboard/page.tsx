'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthService } from '@/lib/auth'
import { User, Code2, Link2, Users, MessageCircle, BarChart3, Target, LogOut, Settings, Search } from 'lucide-react'
import Link from 'next/link'
import type { UserProfile } from '@/lib/types'

export default function DashboardPage() {
  const router = useRouter()
  const authService = new AuthService()
  
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        if (!currentUser) {
          router.push('/login')
          return
        }

        const userProfile = await authService.getUserProfile(currentUser.id)
        if (!userProfile?.profile_completed) {
          router.push('/register')
          return
        }

        setUser(currentUser)
        setProfile(userProfile)
      } catch (error) {
        console.error('Error loading user data:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [router])

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-white to-brand-yellow/10 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mx-auto mb-4"></div>
          <p className="text-brand-black font-medium">Loading your dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-white to-brand-yellow/10">
      {/* Navigation */}
      <motion.nav 
        className="bg-brand-white/90 backdrop-blur-sm border-b-2 border-brand-yellow sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-200">
              <Code2 className="h-8 w-8 text-brand-yellow" />
              <span className="ml-2 text-xl font-display font-bold text-brand-black">Tanish-Bilish</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/browse">
                <Button variant="outline" className="border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white font-semibold hover:scale-105 transition-all duration-200">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Engineers
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white font-semibold"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="bg-brand-yellow p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <User className="h-10 w-10 text-brand-black" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-4">
            Welcome back, {profile?.first_name}!
          </h1>
          <p className="text-xl text-brand-black/70 font-medium">
            Your Tanish-Bilish dashboard
          </p>
        </motion.div>

        {/* Profile Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="shadow-2xl bg-brand-white border-2 border-brand-yellow/20 hover:border-brand-yellow/40 transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-brand-yellow/10 to-brand-yellow/5">
                <CardTitle className="flex items-center gap-3 font-display font-bold text-brand-black">
                  <div className="bg-brand-yellow p-2 rounded-full">
                    <User className="h-5 w-5 text-brand-black" />
                  </div>
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                    <p className="font-medium text-brand-black">
                      <span className="text-brand-black/60">Name:</span> {profile?.first_name} {profile?.surname}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                    <p className="font-medium text-brand-black">
                      <span className="text-brand-black/60">Email:</span> {profile?.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                    <p className="font-medium text-brand-black">
                      <span className="text-brand-black/60">Role:</span> {profile?.role || profile?.custom_role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="shadow-2xl bg-brand-white border-2 border-brand-yellow/20 hover:border-brand-yellow/40 transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-brand-yellow/10 to-brand-yellow/5">
                <CardTitle className="flex items-center gap-3 font-display font-bold text-brand-black">
                  <div className="bg-brand-yellow p-2 rounded-full">
                    <Code2 className="h-5 w-5 text-brand-black" />
                  </div>
                  Tech Stack
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-brand-yellow/10 p-4 rounded-lg border border-brand-yellow/20">
                    <p className="text-2xl font-display font-bold text-brand-black">
                      {profile?.technologies?.length || 0}
                    </p>
                    <p className="text-sm font-medium text-brand-black/70">
                      Technologies selected
                    </p>
                  </div>
                  <div className="bg-brand-yellow/10 p-4 rounded-lg border border-brand-yellow/20">
                    <p className="text-2xl font-display font-bold text-brand-black">
                      {profile?.custom_technologies?.length || 0}
                    </p>
                    <p className="text-sm font-medium text-brand-black/70">
                      Custom technologies
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="shadow-2xl bg-brand-white border-2 border-brand-yellow/20 hover:border-brand-yellow/40 transition-all duration-300 h-full">
              <CardHeader className="bg-gradient-to-r from-brand-yellow/10 to-brand-yellow/5">
                <CardTitle className="flex items-center gap-3 font-display font-bold text-brand-black">
                  <div className="bg-brand-yellow p-2 rounded-full">
                    <Link2 className="h-5 w-5 text-brand-black" />
                  </div>
                  Social Links
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {profile?.linkedin_url && (
                    <motion.a 
                      href={profile.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-blue-600">LinkedIn</span>
                    </motion.a>
                  )}
                  {profile?.github_url && (
                    <motion.a 
                      href={profile.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                      <span className="font-medium text-gray-700">GitHub</span>
                    </motion.a>
                  )}
                  {profile?.telegram_url && (
                    <motion.a 
                      href={profile.telegram_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium text-blue-500">Telegram</span>
                    </motion.a>
                  )}
                  {(!profile?.linkedin_url && !profile?.github_url && !profile?.telegram_url) && (
                    <p className="text-brand-black/60 font-medium text-center py-4">
                      No social links added yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-display font-bold text-brand-black mb-6 text-center">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/browse" className="block hover:scale-102 transition-transform duration-300">
              <Card className="shadow-2xl bg-brand-white border-2 border-brand-yellow/20 hover:border-brand-yellow/40 transition-all duration-300 cursor-pointer h-full">
                <CardHeader className="bg-gradient-to-r from-brand-yellow/10 to-brand-yellow/5">
                  <CardTitle className="flex items-center gap-3 font-display font-bold text-brand-black">
                    <div className="bg-brand-yellow p-2 rounded-full">
                      <Users className="h-5 w-5 text-brand-black" />
                    </div>
                    Browse Engineers
                  </CardTitle>
                  <CardDescription className="font-medium text-brand-black/70">
                    Discover professionals in your area
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-brand-black/80 mb-4">
                    Find and connect with IT professionals who share your interests and tech stack.
                  </p>
                  <div className="bg-brand-yellow/20 p-3 rounded-lg border border-brand-yellow/30">
                    <p className="text-sm font-semibold text-brand-black text-center">
                      Start Networking →
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/location" className="block hover:scale-102 transition-transform duration-300">
              <Card className="shadow-2xl bg-brand-white border-2 border-brand-yellow/20 hover:border-brand-yellow/40 transition-all duration-300 cursor-pointer h-full">
                <CardHeader className="bg-gradient-to-r from-brand-yellow/10 to-brand-yellow/5">
                  <CardTitle className="flex items-center gap-3 font-display font-bold text-brand-black">
                    <div className="bg-brand-yellow p-2 rounded-full">
                      <Settings className="h-5 w-5 text-brand-black" />
                    </div>
                    Update Location
                  </CardTitle>
                  <CardDescription className="font-medium text-brand-black/70">
                    Change your province settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-brand-black/80 mb-4">
                    Update your location to connect with engineers in different provinces.
                  </p>
                  <div className="bg-brand-yellow/20 p-3 rounded-lg border border-brand-yellow/30">
                    <p className="text-sm font-semibold text-brand-black text-center">
                      Manage Settings →
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </motion.div>

        {/* Coming Soon Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h2 className="text-2xl font-display font-bold text-brand-black mb-6 text-center">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-2xl bg-brand-white border-2 border-gray-200 opacity-75">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-25">
                <CardTitle className="flex items-center gap-3 font-display font-bold text-brand-black">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <MessageCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  Messages
                </CardTitle>
                <CardDescription className="font-medium text-brand-black/70">
                  Chat with your connections
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-brand-black/60 mb-4">
                  Send messages and collaborate with other professionals in your network.
                </p>
                <Button disabled variant="outline" className="w-full border-2 border-gray-300 text-gray-500">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-2xl bg-brand-white border-2 border-gray-200 opacity-75">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-25">
                <CardTitle className="flex items-center gap-3 font-display font-bold text-brand-black">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <BarChart3 className="h-5 w-5 text-gray-600" />
                  </div>
                  Analytics
                </CardTitle>
                <CardDescription className="font-medium text-brand-black/70">
                  Track your network growth
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-brand-black/60 mb-4">
                  See insights about your professional network and connections.
                </p>
                <Button disabled variant="outline" className="w-full border-2 border-gray-300 text-gray-500">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-2xl bg-brand-white border-2 border-gray-200 opacity-75">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-25">
                <CardTitle className="flex items-center gap-3 font-display font-bold text-brand-black">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <Target className="h-5 w-5 text-gray-600" />
                  </div>
                  Job Board
                </CardTitle>
                <CardDescription className="font-medium text-brand-black/70">
                  Discover opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-brand-black/60 mb-4">
                  Find job opportunities posted by companies and other professionals.
                </p>
                <Button disabled variant="outline" className="w-full border-2 border-gray-300 text-gray-500">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
