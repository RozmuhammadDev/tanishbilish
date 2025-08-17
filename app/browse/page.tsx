'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthService } from '@/lib/auth'
import { MapPin, Users, Send, Github, Linkedin, MessageCircle, UserPlus, Code, Settings } from 'lucide-react'
import Link from 'next/link'

interface Engineer {
  id: string
  first_name: string
  surname: string
  email: string
  role: string
  custom_role?: string
  technologies: string[]
  linkedin_url?: string
  github_url?: string
  telegram_url?: string
  province_name: string
}

interface FriendRequest {
  id: string
  receiver_id: string
  status: string
}

export default function BrowsePage() {
  const [engineers, setEngineers] = useState<Engineer[]>([])
  const [user, setUser] = useState<any>(null)
  const [userProvince, setUserProvince] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [sendingRequests, setSendingRequests] = useState<Set<string>>(new Set())
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set())
  const router = useRouter()
  const authService = new AuthService()

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if user is logged in
        const currentUser = await authService.getCurrentUser()
        if (!currentUser) {
          router.push('/login')
          return
        }
        setUser(currentUser)

        // Get user's full profile to check province
        const userProfile = await authService.getUserProfile(currentUser.id)
        if (!userProfile?.province_id) {
          router.push('/location')
          return
        }

        // Load engineers from same province
        const engineersData = await authService.getEngineersByProvince(userProfile.province_id)
        setEngineers(engineersData.filter((eng: Engineer) => eng.id !== currentUser.id))
        
        // Get province name
        const provinces = await authService.getProvinces()
        const province = provinces.find((p: any) => p.id === userProfile.province_id)
        setUserProvince(province?.name || '')

        // Load sent friend requests
        const requests = await authService.getSentFriendRequests(currentUser.id)
        setSentRequests(new Set(requests.map((req: FriendRequest) => req.receiver_id)))
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const sendFriendRequest = async (receiverId: string) => {
    if (!user) return

    setSendingRequests(prev => new Set(prev).add(receiverId))
    try {
      await authService.sendFriendRequest(user.id, receiverId, 'Hi! I would like to connect with you.')
      setSentRequests(prev => new Set(prev).add(receiverId))
    } catch (error) {
      console.error('Error sending friend request:', error)
      alert('Failed to send friend request. Please try again.')
    } finally {
      setSendingRequests(prev => {
        const newSet = new Set(prev)
        newSet.delete(receiverId)
        return newSet
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-white to-brand-yellow/10 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow mx-auto mb-4"></div>
          <p className="text-brand-black font-medium">Loading engineers...</p>
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
            <Link href="/">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Code className="h-8 w-8 text-brand-yellow" />
                <span className="ml-2 text-xl font-display font-bold text-brand-black">Tanish-Bilish</span>
              </motion.div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white font-semibold">
                    Dashboard
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
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
                <Users className="h-10 w-10 text-brand-black" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-4">
              Software Engineers in {userProvince}
            </h1>
            <p className="text-xl text-brand-black/70 font-medium max-w-2xl mx-auto">
              Connect with local developers and expand your network
            </p>
          </motion.div>

          {engineers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="text-center py-16 shadow-2xl bg-brand-white border-2 border-brand-yellow/20">
                <CardContent>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="mb-6"
                  >
                    <div className="bg-brand-yellow/20 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                      <Users className="h-10 w-10 text-brand-black/60" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold text-brand-black mb-3">
                    No Engineers Found
                  </h3>
                  <p className="text-brand-black/70 font-medium mb-6 max-w-md mx-auto">
                    There are no other software engineers in {userProvince} yet. Be the first to connect when others join!
                  </p>
                  <Button 
                    onClick={() => router.push('/location')}
                    className="bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark font-semibold"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Change Location
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {engineers.map((engineer, index) => (
                <motion.div
                  key={engineer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="shadow-2xl hover:shadow-3xl transition-all duration-300 bg-brand-white border-2 border-brand-yellow/20 hover:border-brand-yellow/40 h-full">
                    <CardHeader className="bg-gradient-to-r from-brand-yellow/10 to-brand-yellow/5">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-display font-bold text-brand-black">
                            {engineer.first_name} {engineer.surname}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2 text-brand-black/60 font-medium">
                            <MapPin className="h-4 w-4 text-brand-yellow" />
                            {engineer.province_name}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="space-y-4 flex-1">
                        {/* Role */}
                        <div>
                          <h4 className="font-display font-semibold text-sm text-brand-black mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                            Role
                          </h4>
                          <p className="text-brand-black font-semibold bg-brand-yellow/10 px-3 py-2 rounded-lg border border-brand-yellow/20">
                            {engineer.custom_role || engineer.role}
                          </p>
                        </div>

                        {/* Technologies */}
                        {engineer.technologies.length > 0 && (
                          <div>
                            <h4 className="font-display font-semibold text-sm text-brand-black mb-2 flex items-center gap-2">
                              <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                              Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {engineer.technologies.slice(0, 6).map((tech, index) => (
                                <motion.span
                                  key={index}
                                  className="px-3 py-1 bg-brand-yellow/20 text-brand-black text-xs font-medium rounded-full border border-brand-yellow/30"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                              {engineer.technologies.length > 6 && (
                                <span className="px-3 py-1 bg-brand-black/10 text-brand-black text-xs font-medium rounded-full border border-brand-black/20">
                                  +{engineer.technologies.length - 6} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Social Links */}
                        <div>
                          <h4 className="font-display font-semibold text-sm text-brand-black mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                            Connect
                          </h4>
                          <div className="flex gap-2">
                            {engineer.linkedin_url && (
                              <motion.a
                                href={engineer.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 text-blue-600 hover:bg-blue-50 rounded-lg border-2 border-blue-100 hover:border-blue-200 transition-all duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Linkedin className="h-4 w-4" />
                              </motion.a>
                            )}
                            {engineer.github_url && (
                              <motion.a
                                href={engineer.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 text-gray-700 hover:bg-gray-50 rounded-lg border-2 border-gray-100 hover:border-gray-200 transition-all duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Github className="h-4 w-4" />
                              </motion.a>
                            )}
                            {engineer.telegram_url && (
                              <motion.a
                                href={engineer.telegram_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 text-blue-500 hover:bg-blue-50 rounded-lg border-2 border-blue-100 hover:border-blue-200 transition-all duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <MessageCircle className="h-4 w-4" />
                              </motion.a>
                            )}
                          </div>
                        </div>

                        {/* Friend Request Button */}
                        <div className="mt-auto pt-4">
                          <Button
                            onClick={() => sendFriendRequest(engineer.id)}
                            disabled={sendingRequests.has(engineer.id) || sentRequests.has(engineer.id)}
                            className={`w-full font-semibold transition-all duration-200 ${
                              sentRequests.has(engineer.id) 
                                ? 'border-2 border-green-500 text-green-600 bg-green-50 hover:bg-green-100' 
                                : 'bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark'
                            }`}
                            variant={sentRequests.has(engineer.id) ? "outline" : "default"}
                          >
                            {sendingRequests.has(engineer.id) ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-black mr-2"></div>
                                Sending...
                              </>
                            ) : sentRequests.has(engineer.id) ? (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Request Sent
                              </>
                            ) : (
                              <>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Send Friend Request
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <Button
              variant="outline"
              onClick={() => router.push('/location')}
              className="border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white font-semibold px-6"
            >
              <Settings className="mr-2 h-4 w-4" />
              Change Location
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
