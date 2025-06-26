'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingSlider } from '@/components/ui/OnboardingSlider'
import { Button } from '@/components/ui/Button'

export default function OnboardingStepPage({ params }: { params: { step: string } }) {
    const step = parseInt(params.step, 10)
    const router = useRouter()
    const nextStep = () => {
        if (step < 3) router.push(`/onboarding/step/${step + 1}`)
        else router.push('/home')
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
            <OnboardingSlider />
            <Button variant="primary" className="mt-6 w-full max-w-md" onClick={nextStep}>
                {step < 3 ? 'Suivant' : "C'est parti !"}
            </Button>
        </div>
    )
}