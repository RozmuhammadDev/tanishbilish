'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { validateEmail, validatePassword } from '@/lib/auth'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import type { RegistrationStep1 } from '@/lib/types'

interface RegistrationStep1Props {
  data: RegistrationStep1
  onNext: (data: RegistrationStep1) => void
  onBack?: () => void
}

export default function RegistrationStep1({ data, onNext, onBack }: RegistrationStep1Props) {
  const [formData, setFormData] = useState<RegistrationStep1>(data)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (field: keyof RegistrationStep1, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // First name validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required'
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = 'First name must be at least 2 characters'
    }

    // Surname validation
    if (!formData.surname.trim()) {
      newErrors.surname = 'Surname is required'
    } else if (formData.surname.trim().length < 2) {
      newErrors.surname = 'Surname must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else {
      const passwordValidation = validatePassword(formData.password)
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0]
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    try {
      onNext(formData)
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
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
              <User className="h-8 w-8 text-brand-yellow" />
            </div>
          </motion.div>
          <CardTitle className="text-3xl font-display font-bold text-brand-black">
            Join Tanish-Bilish
          </CardTitle>
          <CardDescription className="text-lg text-brand-black/80 font-medium">
            Connect with IT professionals in Uzbekistan
          </CardDescription>
          <motion.div 
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-brand-yellow rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Label htmlFor="first_name" className="text-sm font-display font-semibold text-brand-black">
                  First Name
                </Label>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="John"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  className={`border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                    errors.first_name ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                  }`}
                />
                {errors.first_name && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-600 font-medium"
                  >
                    {errors.first_name}
                  </motion.p>
                )}
              </motion.div>
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Label htmlFor="surname" className="text-sm font-display font-semibold text-brand-black">
                  Surname
                </Label>
                <Input
                  id="surname"
                  type="text"
                  placeholder="Doe"
                  value={formData.surname}
                  onChange={(e) => handleInputChange('surname', e.target.value)}
                  className={`border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                    errors.surname ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                  }`}
                />
                {errors.surname && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-600 font-medium"
                  >
                    {errors.surname}
                  </motion.p>
                )}
              </motion.div>
            </div>

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Label htmlFor="email" className="text-sm font-display font-semibold text-brand-black flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-yellow" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                  errors.email ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                }`}
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
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Label htmlFor="password" className="text-sm font-display font-semibold text-brand-black flex items-center gap-2">
                <Lock className="h-4 w-4 text-brand-yellow" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pr-10 border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                    errors.password ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brand-yellow transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
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

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Label htmlFor="confirmPassword" className="text-sm font-display font-semibold text-brand-black flex items-center gap-2">
                <Lock className="h-4 w-4 text-brand-yellow" />
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`pr-10 border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brand-yellow transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-600 font-medium"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            <motion.div 
              className="flex justify-between pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              {onBack && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onBack}
                  className="border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white font-semibold"
                >
                  Back
                </Button>
              )}
              <Button 
                type="submit" 
                disabled={isLoading}
                className={`bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark font-semibold transition-all duration-200 ${
                  !onBack ? 'w-full' : ''
                }`}
              >
                {isLoading ? 'Creating Account...' : 'Next: Tech Stack'}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
