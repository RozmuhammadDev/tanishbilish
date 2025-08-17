'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DEFAULT_ROLES } from '@/lib/types'
import { Briefcase, Edit3 } from 'lucide-react'
import type { RegistrationStep3, UserRole } from '@/lib/types'

interface RegistrationStep3Props {
  data: RegistrationStep3
  onNext: (data: RegistrationStep3) => void
  onBack: () => void
}

export default function RegistrationStep3({ data, onNext, onBack }: RegistrationStep3Props) {
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(data.role)
  const [customRole, setCustomRole] = useState(data.custom_role || '')
  const [isCustomRole, setIsCustomRole] = useState(!!data.custom_role)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setIsCustomRole(false)
    setCustomRole('')
    // Clear error when user selects a role
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: '' }))
    }
  }

  const handleCustomRoleToggle = () => {
    setIsCustomRole(true)
    setSelectedRole(undefined)
    // Clear error when user switches to custom role
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: '' }))
    }
  }

  const handleCustomRoleChange = (value: string) => {
    setCustomRole(value)
    // Clear error when user types custom role
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!selectedRole && (!isCustomRole || !customRole.trim())) {
      newErrors.role = 'Please select a role or enter a custom role'
    }

    if (isCustomRole && customRole.trim().length < 2) {
      newErrors.role = 'Custom role must be at least 2 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    onNext({
      role: isCustomRole ? undefined : selectedRole,
      custom_role: isCustomRole ? customRole.trim() : ''
    })
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
              <Briefcase className="h-8 w-8 text-brand-yellow" />
            </div>
          </motion.div>
          <CardTitle className="text-3xl font-display font-bold text-brand-black">
            Your Professional Role
          </CardTitle>
          <CardDescription className="text-lg text-brand-black/80 font-medium">
            What's your specialization in the tech field?
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
              <div className="w-3 h-3 bg-brand-yellow rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.role && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 text-sm text-red-600 bg-red-50 border-2 border-red-200 rounded-lg font-medium"
              >
                {errors.role}
              </motion.div>
            )}

            {/* Default Roles */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h3 className="font-display font-bold text-xl text-brand-black flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                Choose Your Role
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DEFAULT_ROLES.map((role, index) => (
                  <motion.div
                    key={role}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedRole === role && !isCustomRole
                        ? 'border-brand-yellow bg-brand-yellow/10'
                        : 'border-gray-200 hover:border-brand-yellow/50'
                    }`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRoleSelect(role)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${
                        selectedRole === role && !isCustomRole
                          ? 'border-brand-yellow bg-brand-yellow'
                          : 'border-gray-300'
                      }`}>
                        {selectedRole === role && !isCustomRole && (
                          <div className="w-2 h-2 bg-brand-black rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display font-semibold text-brand-black">{role}</h4>
                        <p className="text-sm text-brand-black/70 font-medium mt-1">
                          {getRoleDescription(role)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Custom Role Option */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.div
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isCustomRole
                    ? 'border-brand-yellow bg-brand-yellow/10'
                    : 'border-gray-200 hover:border-brand-yellow/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCustomRoleToggle}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${
                    isCustomRole
                      ? 'border-brand-yellow bg-brand-yellow'
                      : 'border-gray-300'
                  }`}>
                    {isCustomRole && (
                      <div className="w-2 h-2 bg-brand-black rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-brand-black flex items-center gap-2">
                      <Edit3 className="h-4 w-4 text-brand-yellow" />
                      Other / Custom Role
                    </h4>
                    <p className="text-sm text-brand-black/70 font-medium mt-1">
                      Specify your own professional role
                    </p>
                  </div>
                </div>
              </motion.div>

              {isCustomRole && (
                <motion.div 
                  className="ml-8 space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="customRole" className="text-sm font-display font-semibold text-brand-black">
                    Enter your role
                  </Label>
                  <Input
                    id="customRole"
                    placeholder="e.g., Machine Learning Engineer, Product Manager, etc."
                    value={customRole}
                    onChange={(e) => handleCustomRoleChange(e.target.value)}
                    className={`border-2 font-medium transition-all duration-200 focus:border-brand-yellow ${
                      errors.role ? 'border-red-500' : 'border-gray-200 hover:border-brand-yellow/50'
                    }`}
                  />
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              className="flex justify-between pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
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
                className="bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark font-semibold"
              >
                Next: Social Links
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    'Frontend Engineer': 'UI/UX development, React, Vue, Angular',
    'Backend Engineer': 'Server-side development, APIs, databases',
    'Full-Stack Engineer': 'Both frontend and backend development',
    'Mobile Engineer': 'iOS, Android, React Native, Flutter',
    'Data Scientist': 'Machine learning, analytics, research',
    'Data Analyst': 'Data visualization, reporting, insights',
    'Data Engineer': 'Data pipelines, ETL, big data systems',
    'DevOps Engineer': 'Infrastructure, CI/CD, cloud platforms',
    'AI Engineer': 'Artificial intelligence, deep learning, NLP'
  }
  return descriptions[role] || ''
}
