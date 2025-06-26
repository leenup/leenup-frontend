import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export type Slide = {
    id: number
    title: string
    description: string
    image: string
}

const slides: Slide[] = [
    { id: 1, title: 'Parcours gamifié', description: 'Système de niveaux et progression, Défis et missions, monnaie virtuelle et classement de réputation !', image: '/slides/slide1.jpg' },
    { id: 2, title: 'Apprentissage gratuit', description: 'Profites de 7 jours gratuits pour découvrir nos leeneurs !', image: '/slides/slide2.jpg' },
    { id: 3, title: 'Recevoir & donner', description: 'Développer de nouvelles compétences : c\'est à la portée de tout le monde !', image: '/slides/slide3.jpg' },
]

export const OnboardingSlider: React.FC = () => {
    const [current, setCurrent] = useState(0)
    const length = slides.length
    const prev = () => setCurrent((current - 1 + length) % length)
    const next = () => setCurrent((current + 1) % length)

    const { title, description, image } = slides[current]
    const progress = ((current + 1) / length) * 100

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Progress bar */}
            <div className="w-full h-2 bg-secondary/20 rounded-full mb-4">
                <div className="h-full bg-secondary rounded-full" style={{ width: `${progress}%` }} />
            </div>
            {/* Illustration */}
            <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
            {/* Card content */}
            <div className="bg-primary text-white p-6 rounded-lg mb-4">
                <h3 className="text-mobile-h2 md:text-desktop-h2 font-bold">{title}</h3>
                <p className="mt-2 text-mobile-body md:text-desktop-body">{description}</p>
            </div>
            {/* Dots */}
            <div className="flex justify-center space-x-2 mb-4">
                {slides.map((s, idx) => (
                    <span key={s.id} className={`block w-2 h-2 rounded-full ${idx === current ? 'bg-secondary' : 'bg-secondary/40'}`} />
                ))}
            </div>
            {/* Navigation */}
            <div className="flex justify-between">
                <button onClick={prev} className="text-secondary text-2xl"><FaChevronLeft /></button>
                <button onClick={next} className="text-secondary text-2xl"><FaChevronRight /></button>
            </div>
        </div>
    )
}