'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { DEFAULT_TECHNOLOGIES } from '@/lib/types'
import { Code2, Plus, X } from 'lucide-react'
import type { RegistrationStep2 } from '@/lib/types'

interface RegistrationStep2Props {
  data: RegistrationStep2
  onNext: (data: RegistrationStep2) => void
  onBack: () => void
}

export default function RegistrationStep2({ data, onNext, onBack }: RegistrationStep2Props) {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(data.technologies)
  const [customTechnologies, setCustomTechnologies] = useState<string[]>(data.custom_technologies)
  const [newTechnology, setNewTechnology] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Group technologies by category
  const technologiesByCategory = DEFAULT_TECHNOLOGIES.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = []
    }
    acc[tech.category].push(tech.name)
    return acc
  }, {} as Record<string, string[]>)

  const handleTechnologyToggle = (technology: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(technology)
        ? prev.filter(t => t !== technology)
        : [...prev, technology]
    )
    // Clear error when user selects technologies
    if (errors.technologies) {
      setErrors(prev => ({ ...prev, technologies: '' }))
    }
  }

  const handleAddCustomTechnology = () => {
    if (newTechnology.trim() && !customTechnologies.includes(newTechnology.trim())) {
      setCustomTechnologies(prev => [...prev, newTechnology.trim()])
      setNewTechnology('')
      // Clear error when user adds custom technology
      if (errors.technologies) {
        setErrors(prev => ({ ...prev, technologies: '' }))
      }
    }
  }

  const handleRemoveCustomTechnology = (technology: string) => {
    setCustomTechnologies(prev => prev.filter(t => t !== technology))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (selectedTechnologies.length === 0 && customTechnologies.length === 0) {
      newErrors.technologies = 'Please select at least one technology'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    onNext({
      technologies: selectedTechnologies,
      custom_technologies: customTechnologies
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddCustomTechnology()
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
              <Code2 className="h-8 w-8 text-brand-yellow" />
            </div>
          </motion.div>
          <CardTitle className="text-3xl font-display font-bold text-brand-black">
            Your Tech Stack
          </CardTitle>
          <CardDescription className="text-lg text-brand-black/80 font-medium">
            Select the technologies you work with
          </CardDescription>
          <motion.div 
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-yellow rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
              <div className="w-3 h-3 bg-brand-black/20 rounded-full"></div>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.technologies && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 text-sm text-red-600 bg-red-50 border-2 border-red-200 rounded-lg font-medium"
              >
                {errors.technologies}
              </motion.div>
            )}

            {/* Default Technologies by Category */}
            {Object.entries(technologiesByCategory).map(([category, technologies], categoryIndex) => (
              <motion.div 
                key={category} 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + categoryIndex * 0.1, duration: 0.4 }}
              >
                <h3 className="font-display font-bold text-xl text-brand-black flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                  {category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {technologies.map((technology, techIndex) => (
                    <motion.div 
                      key={technology} 
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                        selectedTechnologies.includes(technology)
                          ? 'border-brand-yellow bg-brand-yellow/10'
                          : 'border-gray-200 hover:border-brand-yellow/50'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + categoryIndex * 0.1 + techIndex * 0.02, duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Checkbox
                        id={technology}
                        checked={selectedTechnologies.includes(technology)}
                        onCheckedChange={() => handleTechnologyToggle(technology)}
                        className="data-[state=checked]:bg-brand-yellow data-[state=checked]:border-brand-yellow"
                      />
                      <Label 
                        htmlFor={technology}
                        className="text-sm font-medium text-brand-black cursor-pointer flex-1"
                        onClick={() => handleTechnologyToggle(technology)}
                      >
                        {technology}
                      </Label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Custom Technologies */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <h3 className="font-display font-bold text-xl text-brand-black flex items-center gap-2">
                <Plus className="h-5 w-5 text-brand-yellow" />
                Add Your Own
              </h3>
              <div className="flex gap-3">
                <Input
                  placeholder="Enter a technology not listed above"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-2 font-medium transition-all duration-200 focus:border-brand-yellow border-gray-200 hover:border-brand-yellow/50"
                />
                <Button 
                  type="button" 
                  onClick={handleAddCustomTechnology}
                  disabled={!newTechnology.trim()}
                  className="bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark font-semibold px-6"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              
              {/* Display Custom Technologies */}
              {customTechnologies.length > 0 && (
                <motion.div 
                  className="flex flex-wrap gap-3 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  {customTechnologies.map((technology, index) => (
                    <motion.div 
                      key={technology}
                      className="bg-brand-yellow/20 text-brand-black px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 border-2 border-brand-yellow/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {technology}
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomTechnology(technology)}
                        className="text-brand-black hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Selected Count */}
            <motion.div 
              className="text-center p-4 bg-brand-yellow/10 rounded-lg border-2 border-brand-yellow/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <p className="text-lg font-display font-semibold text-brand-black">
                {selectedTechnologies.length + customTechnologies.length} technologies selected
              </p>
              <p className="text-sm text-brand-black/70 font-medium mt-1">
                Great! This helps other professionals find you
              </p>
            </motion.div>

            <motion.div 
              className="flex justify-between pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
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
                Next: Your Role
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
