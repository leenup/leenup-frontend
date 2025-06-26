import React from 'react'
import { FaStar } from 'react-icons/fa'

type CardProps = {
    imageUrl: string
    title: string
    subtitle?: string
    rating?: number
    learners?: number
}

const formatLearners = (num: number) => {
    if (num >= 1000) {
        const k = +(num / 1000).toFixed(1)
        return `${k}K`
    }
    return `${num}`
}

export const Card: React.FC<CardProps> = ({
                                              imageUrl,
                                              title,
                                              subtitle,
                                              rating,
                                              learners,
                                          }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 flex items-start justify-between">
            {/* Colonne gauche */}
            <div>
                <h3 className="text-primary font-bold text-mobile-h3 md:text-desktop-h3 mb-2">
                    {title}
                </h3>
                {subtitle && (
                    <span className="inline-block bg-primary text-white text-mobile-small md:text-desktop-small px-2 py-1 rounded">
            {subtitle}
          </span>
                )}
            </div>
            {/* Colonne droite */}
            <div className="flex flex-col text-end text-mobile-body text-black">
                {rating !== undefined && (
                    <div className="flex items-center justify-end">
                        <span className="mr-2">{rating.toFixed(1)}</span>
                        <FaStar className="text-secondary mr-1" />
                    </div>
                )}
                {learners !== undefined && (
                    <span>{formatLearners(learners)} leeners</span>
                )}
            </div>
        </div>
    </div>
)