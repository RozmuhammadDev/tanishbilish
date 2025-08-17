'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthService } from '@/lib/auth'
import { validateEmail } from '@/lib/auth'
import { Eye, EyeOff, LogIn, ArrowLeft, Code } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const authService = new AuthService()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await authService.signIn(formData.email, formData.password)
      
      if (result.user) {
        // Check if user has completed registration
        const profile = await authService.getUserProfile(result.user.id)
        
        if (profile?.profile_completed) {
          router.push('/dashboard')
        } else {
          // Continue registration from where they left off
          router.push('/register')
        }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      setErrors({ general: error.message || 'Login failed. Please check your credentials.' })
    } finally {
      setIsLoading(false)
    }
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
              <Link href="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark font-semibold">
                    Get Started
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex items-center justify-center p-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl bg-brand-white border-2 border-brand-yellow/20">
            <CardHeader className="text-center bg-gradient-to-r from-brand-yellow to-brand-yellow-light">
              <motion.div 
                className="flex items-center justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="bg-brand-black p-3 rounded-full">
                  <LogIn className="h-8 w-8 text-brand-yellow" />
                </div>
              </motion.div>
              <CardTitle className="text-3xl font-display font-bold text-brand-black">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-lg text-brand-black/80 font-medium">
                Sign in to your Tanish-Bilish account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                    {errors.general}
                  </div>
                )}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Label htmlFor="email" className="text-sm font-display font-semibold text-brand-black">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                      errors.email ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                    }`}
                    required
                  />
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-600 font-medium"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <Label htmlFor="password" className="text-sm font-display font-semibold text-brand-black">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pr-10 border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                        errors.password ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                      }`}
                      required
                    />
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-red-600 font-medium"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark font-semibold"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-blue-600 hover:underline">
                    Join Tanish-Bilish
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
