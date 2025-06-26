'use client'
import React from 'react'
import { OnboardingSlider } from '@/components/ui/OnboardingSlider'

export default function OnboardingStepPage() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-white p-4">
            <OnboardingSlider />
        </div>
    )
}