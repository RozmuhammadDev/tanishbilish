'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RegistrationStep1 from '@/components/registration/RegistrationStep1'
import RegistrationStep2 from '@/components/registration/RegistrationStep2'
import RegistrationStep3 from '@/components/registration/RegistrationStep3'
import RegistrationStep4 from '@/components/registration/RegistrationStep4'
import RegistrationStep5 from '@/components/registration/RegistrationStep5'
import { AuthService } from '@/lib/auth'
import type { RegistrationStep1 as Step1Data, RegistrationStep2 as Step2Data, RegistrationStep3 as Step3Data, RegistrationStep4 as Step4Data } from '@/lib/types'

export default function RegisterPage() {
  const router = useRouter()
  const authService = new AuthService()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [registrationData, setRegistrationData] = useState({
    // Step 1
    first_name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2
    technologies: [] as string[],
    custom_technologies: [] as string[],
    // Step 3
    role: undefined as any,
    custom_role: '',
    // Step 4
    linkedin_url: '',
    github_url: '',
    telegram_url: '',
    instagram_url: '',
    youtube_url: '',
    // Step 5
    province_id: ''
  })

  const handleStep1Complete = async (data: Step1Data) => {
    try {
      // Create user account
      const result = await authService.signUp(data)
      
      if (result.user) {
        // Update registration data
        setRegistrationData(prev => ({ ...prev, ...data }))
        
        // Move to next step
        setCurrentStep(2)
        
        // Update registration step in database
        await authService.updateRegistrationStep(result.user.id, 2)
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      alert(error.message || 'Registration failed. Please try again.')
    }
  }

  const handleStep2Complete = (data: Step2Data) => {
    setRegistrationData(prev => ({ ...prev, ...data }))
    setCurrentStep(3)
  }

  const handleStep3Complete = (data: Step3Data) => {
    setRegistrationData(prev => ({ ...prev, ...data }))
    setCurrentStep(4)
  }

  const handleStep4Complete = (data: Step4Data) => {
    setRegistrationData(prev => ({ ...prev, ...data }))
    setCurrentStep(5)
  }

  const handleStep5Complete = async (data: { province_id: string }) => {
    try {
      const finalData = { ...registrationData, ...data }
      
      // Get current user
      const user = await authService.getCurrentUser()
      if (!user) throw new Error('User not found')

      // Update user profile with all data
      await authService.updateUserProfile(user.id, {
        first_name: finalData.first_name,
        surname: finalData.surname,
        email: finalData.email,
        province_id: finalData.province_id,
        technologies: finalData.technologies,
        custom_technologies: finalData.custom_technologies,
        role: finalData.role,
        custom_role: finalData.custom_role,
        linkedin_url: finalData.linkedin_url,
        github_url: finalData.github_url,
        telegram_url: finalData.telegram_url,
        instagram_url: finalData.instagram_url,
        youtube_url: finalData.youtube_url,
        registration_step: 6,
        profile_completed: true
      })

      // Complete registration
      await authService.completeRegistration(user.id)
      
      // Redirect to browse page
      router.push('/browse')
    } catch (error: any) {
      console.error('Final registration error:', error)
      alert(error.message || 'Failed to complete registration. Please try again.')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {currentStep === 1 && (
          <RegistrationStep1
            data={{
              first_name: registrationData.first_name,
              surname: registrationData.surname,
              email: registrationData.email,
              password: registrationData.password,
              confirmPassword: registrationData.confirmPassword
            }}
            onNext={handleStep1Complete}
          />
        )}
        
        {currentStep === 2 && (
          <RegistrationStep2
            data={{
              technologies: registrationData.technologies,
              custom_technologies: registrationData.custom_technologies
            }}
            onNext={handleStep2Complete}
            onBack={handleBack}
          />
        )}
        
        {currentStep === 3 && (
          <RegistrationStep3
            data={{
              role: registrationData.role,
              custom_role: registrationData.custom_role
            }}
            onNext={handleStep3Complete}
            onBack={handleBack}
          />
        )}
        
        {currentStep === 4 && (
          <RegistrationStep4
            data={{
              linkedin_url: registrationData.linkedin_url,
              github_url: registrationData.github_url,
              telegram_url: registrationData.telegram_url,
              instagram_url: registrationData.instagram_url,
              youtube_url: registrationData.youtube_url
            }}
            onNext={handleStep4Complete}
            onBack={handleBack}
          />
        )}
        
        {currentStep === 5 && (
          <RegistrationStep5
            data={{
              province_id: registrationData.province_id
            }}
            onNext={handleStep5Complete}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}
