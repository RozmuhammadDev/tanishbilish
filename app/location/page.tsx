'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthService } from '@/lib/auth'
import { MapPin, Users, ArrowRight, Code } from 'lucide-react'
import Link from 'next/link'

interface Province {
  id: string
  name: string
  name_uz: string
  name_ru: string
}

export default function LocationPage() {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
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

        // Load provinces
        const provincesData = await authService.getProvinces()
        setProvinces(provincesData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSaveLocation = async () => {
    if (!selectedProvince || !user) return

    setSaving(true)
    try {
      await authService.updateUserProfile(user.id, {
        province_id: selectedProvince
      })

      // Redirect to browse engineers
      router.push('/browse')
    } catch (error) {
      console.error('Error saving location:', error)
      alert('Failed to save location. Please try again.')
    } finally {
      setSaving(false)
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
          <p className="text-brand-black font-medium">Loading provinces...</p>
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
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-8"
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
                <MapPin className="h-10 w-10 text-brand-black" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-black mb-4">
              Choose Your Location
            </h1>
            <p className="text-xl text-brand-black/70 font-medium max-w-2xl mx-auto">
              Select your province to connect with local software engineers in Uzbekistan
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="shadow-2xl bg-brand-white border-2 border-brand-yellow/20">
              <CardHeader className="text-center bg-gradient-to-r from-brand-yellow to-brand-yellow-light">
                <motion.div 
                  className="flex items-center justify-center mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  <div className="bg-brand-black p-3 rounded-full">
                    <Users className="h-8 w-8 text-brand-yellow" />
                  </div>
                </motion.div>
                <CardTitle className="text-3xl font-display font-bold text-brand-black">
                  Uzbekistan Provinces
                </CardTitle>
                <CardDescription className="text-lg text-brand-black/80 font-medium">
                  Choose your province to discover and connect with software engineers in your area
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {provinces.map((province, index) => (
                    <motion.div
                      key={province.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedProvince === province.id
                          ? 'border-brand-yellow bg-brand-yellow/10 shadow-md'
                          : 'border-gray-200 hover:border-brand-yellow/50'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProvince(province.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${
                          selectedProvince === province.id
                            ? 'border-brand-yellow bg-brand-yellow'
                            : 'border-gray-300'
                        }`}>
                          {selectedProvince === province.id && (
                            <div className="w-2 h-2 bg-brand-black rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-brand-black mb-1">
                            {province.name}
                          </h3>
                          <p className="text-sm text-brand-black/70 font-medium mb-1">
                            {province.name_uz}
                          </p>
                          <p className="text-sm text-brand-black/50 font-medium">
                            {province.name_ru}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                >
                  <Button
                    onClick={handleSaveLocation}
                    disabled={!selectedProvince || saving}
                    size="lg"
                    className="px-8 py-3 bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark font-semibold text-lg transition-all duration-200"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-black mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        Continue to Browse Engineers
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
