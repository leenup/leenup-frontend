'use client'

import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Card } from './Card'

type Mentor = {
    id: string
    avatar: string
    firstName: string
    specialty: string
    rating: number
    learners: number
}

const mentors: Mentor[] = [
    {
        id: '1',
        avatar: '/images/mentors/francois.png',
        firstName: 'François',
        specialty: 'Design',
        rating: 4.8,
        learners: 6000,
    },
    {
        id: '2',
        avatar: '/images/mentors/sarah.png',
        firstName: 'Sarah',
        specialty: 'Création',
        rating: 4.9,
        learners: 4000,
    },
    {
        id: '3',
        avatar: '/images/mentors/julien.png',
        firstName: 'Julien',
        specialty: 'Dev Web',
        rating: 4.7,
        learners: 10000,
    },
]

export const MentorSlider: React.FC = () => {
    const [current, setCurrent] = useState(0)
    const length = mentors.length

    const prev = () => setCurrent((current - 1 + length) % length)
    const next = () => setCurrent((current + 1) % length)
    const m = mentors[current]

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-4">
                <button onClick={prev} className="text-primary text-2xl focus:outline-none">
                    <FaChevronLeft />
                </button>
                <Card
                    imageUrl={m.avatar}
                    title={m.firstName}
                    subtitle={m.specialty}
                    rating={m.rating}
                    learners={m.learners}
                />
                <button onClick={next} className="text-primary text-2xl focus:outline-none">
                    <FaChevronRight />
                </button>
            </div>
        </div>
    )
}