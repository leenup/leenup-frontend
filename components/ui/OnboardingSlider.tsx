// components/ui/OnboardingSlider.tsx
'use client'

import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaCircle } from 'react-icons/fa'
import { Button } from './Button'

type Slide = {
    id: number
    icon: string
    image: string
    title: string
    description: string
}

const slides: Slide[] = [
    {
        id: 1,
        icon: '/images/elements/iconTech.svg',
        image: '/images/elements/slider/parcoursGamifie.png',
        title: 'Parcours gamifié',
        description:
            'Système de niveaux et progression, Défis et missions, monnaie virtuelle et classement de réputation !',
    },
    {
        id: 2,
        icon: '/images/elements/iconJoie.svg',
        image: '/images/elements/slider/gratuit.png',
        title: 'Apprentissage gratuit',
        description: 'Profites de 7 jours gratuits pour découvrir nos leeneurs !',
    },
    {
        id: 3,
        icon: '/images/elements/iconCoucou.svg',
        image: '/images/elements/slider/pairApair.png',
        title: 'Recevoir & donner',
        description:
            "Développer de nouvelles compétences : c'est à la portée de tout le monde !",
    },
]

export const OnboardingSlider: React.FC = () => {
    const [current, setCurrent] = useState(0)
    const length = slides.length

    const prev = () => setCurrent((current - 1 + length) % length)
    const next = () => setCurrent((current + 1) % length)

    const { icon, image, title, description } = slides[current]
    const progress = ((current + 1) / length) * 100

    const handleDiscover = () => {
        window.location.href = '/discover'
    }

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Icône */}
            <img src={icon} alt={title} className="w-12 h-12 mx-auto mb-4" />

            {/* Barre de progression */}
            <div className="w-full h-2 bg-secondary/20 rounded-full mb-6">
                <div
                    className="h-full bg-secondary rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Carte */}
            <div className="bg-primary rounded-2xl overflow-hidden shadow-lg">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                <div className="p-6">
                    <h3 className="text-mobile-h2 md:text-desktop-h2 font-bold text-white mb-2">
                        {title}
                    </h3>
                    <p className="text-mobile-body md:text-desktop-body text-white">
                        {description}
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4 mt-6 mb-4">
                <button onClick={prev} className="text-secondary text-2xl focus:outline-none">
                    <FaChevronLeft />
                </button>
                <div className="flex space-x-2">
                    {slides.map((_, idx) => (
                        <FaCircle
                            key={idx}
                            className={
                                idx === current
                                    ? 'text-secondary text-xs'
                                    : 'text-secondary/40 text-xs'
                            }
                        />
                    ))}
                </div>
                <button onClick={next} className="text-secondary text-2xl focus:outline-none">
                    <FaChevronRight />
                </button>
            </div>

            {/* Bouton final uniquement sur la 3ème slide */}
            {current === slides.length - 1 && (
                <Button variant="primary" className="w-full" onClick={handleDiscover}>
                    C&apos;est parti !
                </Button>
            )}
        </div>
    )
}