import React from 'react'
import { FaStar } from 'react-icons/fa'

type CardProps = {
    imageUrl: string
    title: string
    subtitle?: string
    rating?: number
    learners?: number
}

export const Card: React.FC<CardProps> = ({ imageUrl, title, subtitle, rating, learners }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="text-mobile-h2 md:text-desktop-h3 text-primary">{title}</h3>
            {subtitle && <p className="text-mobile-body md:text-desktop-body text-black">{subtitle}</p>}
            {(rating !== undefined || learners !== undefined) && (
                <div className="mt-2 flex items-center text-mobile-body md:text-desktop-body text-black">
                    {rating !== undefined && (
                        <div className="flex items-center">
                            <FaStar className="text-secondary mr-1" />
                            <span>{rating.toFixed(1)}</span>
                        </div>
                    )}
                    {learners !== undefined && <span className="ml-4">{learners} leeners</span>}
                </div>
            )}
        </div>
    </div>
)