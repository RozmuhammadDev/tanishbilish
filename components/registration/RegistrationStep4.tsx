'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { validateUrl } from '@/lib/auth'
import { Link2, Linkedin, Github, Send, Instagram, Youtube, Shield } from 'lucide-react'
import type { RegistrationStep4 } from '@/lib/types'

interface RegistrationStep4Props {
  data: RegistrationStep4
  onNext: (data: RegistrationStep4) => void
  onBack: () => void
}

export default function RegistrationStep4({ data, onNext, onBack }: RegistrationStep4Props) {
  const [formData, setFormData] = useState<RegistrationStep4>(data)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof RegistrationStep4, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Required fields validation
    if (!formData.linkedin_url.trim()) {
      newErrors.linkedin_url = 'LinkedIn URL is required'
    } else if (!validateUrl(formData.linkedin_url, 'linkedin')) {
      newErrors.linkedin_url = 'Please enter a valid LinkedIn URL'
    }

    if (!formData.github_url.trim()) {
      newErrors.github_url = 'GitHub URL is required'
    } else if (!validateUrl(formData.github_url, 'github')) {
      newErrors.github_url = 'Please enter a valid GitHub URL'
    }

    if (!formData.telegram_url.trim()) {
      newErrors.telegram_url = 'Telegram URL is required'
    } else if (!validateUrl(formData.telegram_url, 'telegram')) {
      newErrors.telegram_url = 'Please enter a valid Telegram URL (t.me/username)'
    }

    // Optional fields validation
    if (formData.instagram_url && !validateUrl(formData.instagram_url, 'instagram')) {
      newErrors.instagram_url = 'Please enter a valid Instagram URL'
    }

    if (formData.youtube_url && !validateUrl(formData.youtube_url, 'youtube')) {
      newErrors.youtube_url = 'Please enter a valid YouTube URL'
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
      console.error('Final step error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
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
              <Link2 className="h-8 w-8 text-brand-yellow" />
            </div>
          </motion.div>
          <CardTitle className="text-3xl font-display font-bold text-brand-black">
            Connect Your Profiles
          </CardTitle>
          <CardDescription className="text-lg text-brand-black/80 font-medium">
            Link your professional social media accounts
          </CardDescription>
          <motion.div 
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-yellow rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Required Social Links */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h3 className="font-display font-bold text-xl text-brand-black flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Required Links
              </h3>
              
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <Label htmlFor="linkedin_url" className="text-sm font-display font-semibold text-brand-black flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedin_url"
                  type="url"
                  placeholder="https://linkedin.com/in/your-profile"
                  value={formData.linkedin_url}
                  onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                  className={`border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                    errors.linkedin_url ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                  }`}
                />
                {errors.linkedin_url && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-600 font-medium"
                  >
                    {errors.linkedin_url}
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Label htmlFor="github_url" className="text-sm font-display font-semibold text-brand-black flex items-center gap-2">
                  <Github className="h-4 w-4 text-gray-800" />
                  GitHub Profile
                </Label>
                <Input
                  id="github_url"
                  type="url"
                  placeholder="https://github.com/your-username"
                  value={formData.github_url}
                  onChange={(e) => handleInputChange('github_url', e.target.value)}
                  className={`border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                    errors.github_url ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                  }`}
                />
                {errors.github_url && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-600 font-medium"
                  >
                    {errors.github_url}
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Label htmlFor="telegram_url" className="text-sm font-display font-semibold text-brand-black flex items-center gap-2">
                  <Send className="h-4 w-4 text-blue-500" />
                  Telegram
                </Label>
                <Input
                  id="telegram_url"
                  type="url"
                  placeholder="https://t.me/your-username"
                  value={formData.telegram_url}
                  onChange={(e) => handleInputChange('telegram_url', e.target.value)}
                  className={`border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                    errors.telegram_url ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                  }`}
                />
                {errors.telegram_url && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-600 font-medium"
                  >
                    {errors.telegram_url}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>

            {/* Optional Social Links */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <h3 className="font-display font-bold text-xl text-brand-black flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Optional Links
              </h3>
              
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <Label htmlFor="instagram_url" className="text-sm font-display font-semibold text-brand-black flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-500" />
                  Instagram (Optional)
                </Label>
                <Input
                  id="instagram_url"
                  type="url"
                  placeholder="https://instagram.com/your-username"
                  value={formData.instagram_url || ''}
                  onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                  className={`border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                    errors.instagram_url ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                  }`}
                />
                {errors.instagram_url && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-600 font-medium"
                  >
                    {errors.instagram_url}
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <Label htmlFor="youtube_url" className="text-sm font-display font-semibold text-brand-black flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  YouTube (Optional)
                </Label>
                <Input
                  id="youtube_url"
                  type="url"
                  placeholder="https://youtube.com/@your-channel"
                  value={formData.youtube_url || ''}
                  onChange={(e) => handleInputChange('youtube_url', e.target.value)}
                  className={`border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                    errors.youtube_url ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                  }`}
                />
                {errors.youtube_url && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-600 font-medium"
                  >
                    {errors.youtube_url}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>

            {/* Privacy Notice */}
            <motion.div 
              className="bg-brand-yellow/10 border-2 border-brand-yellow/30 rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
            >
              <h4 className="font-display font-semibold text-brand-black mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-brand-yellow" />
                Privacy & Visibility
              </h4>
              <p className="text-sm text-brand-black/80 font-medium">
                Your social links will be visible to other professionals on the platform to help facilitate networking and collaboration. 
                You can update these links anytime from your profile settings.
              </p>
            </motion.div>

            <motion.div 
              className="flex justify-between pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            >
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                className="border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white font-semibold"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8"
              >
                {isLoading ? 'Completing Registration...' : 'Next: Choose Location'}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
