'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react'
import { AuthService } from '@/lib/auth'

interface Province {
  id: string
  name: string
  name_uz: string
  name_ru: string
}

interface RegistrationStep5Props {
  data: {
    province_id: string
  }
  onNext: (data: { province_id: string }) => void
  onBack: () => void
}

export default function RegistrationStep5({ data, onNext, onBack }: RegistrationStep5Props) {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [selectedProvince, setSelectedProvince] = useState(data.province_id || '')
  const [loading, setLoading] = useState(true)
  const authService = new AuthService()

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const provincesData = await authService.getProvinces()
        setProvinces(provincesData)
      } catch (error) {
        console.error('Error loading provinces:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProvinces()
  }, [])

  const handleSubmit = () => {
    if (!selectedProvince) {
      alert('Please select your province')
      return
    }

    onNext({ province_id: selectedProvince })
  }

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto shadow-xl bg-white border-2 border-brand-yellow/20">
        <CardHeader className="text-center bg-gradient-to-r from-brand-yellow to-brand-yellow-light text-brand-black">
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="bg-brand-black p-3 rounded-full">
              <MapPin className="h-8 w-8 text-brand-yellow" />
            </div>
          </motion.div>
          <CardTitle className="text-3xl font-display font-bold text-brand-black">
            Choose Your Location
          </CardTitle>
          <CardDescription className="text-lg text-brand-black/80 font-medium">
            Step 5 of 5: Select your province to connect with local software engineers
          </CardDescription>
        </CardHeader>
      
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {provinces.map((province, index) => (
              <motion.div
                key={province.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  selectedProvince === province.id
                    ? 'border-brand-yellow bg-brand-yellow/10 shadow-md'
                    : 'border-gray-200 hover:border-brand-yellow/50 bg-white'
                }`}
                onClick={() => setSelectedProvince(province.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-display font-semibold text-brand-black mb-1">
                  {province.name}
                </h3>
                <p className="text-sm text-brand-black/70 mb-1 font-medium">
                  {province.name_uz}
                </p>
                <p className="text-sm text-brand-black/50">
                  {province.name_ru}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleSubmit}
                disabled={!selectedProvince}
                className="flex items-center gap-2 bg-brand-yellow text-brand-black hover:bg-brand-yellow-dark font-semibold px-6 py-3 text-lg"
              >
                Complete Registration
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
