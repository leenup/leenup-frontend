import React from 'react'
import { Card } from '../../components/ui/Card'
import { MentorSlider } from '../../components/ui/MentorSlider'
import Link from "next/link";
import {Button} from "@/components/ui/Button";

const popularCourses = [
    { id: 'photographie', title: 'Photo' },
    { id: 'couture', title: 'Bien-être' },
    { id: 'digital', title: 'Dév Web' },
    { id: 'digital2', title: 'Création' },
]

export default function DiscoverPage() {
    return (
        <div className="p-6 bg-white min-h-screen">
            <img
                src="/images/elements/flecheBleu.svg"
                alt="Retour"
                className="mb-6"
            />
            <div className="w-full flex justify-center">
                <img
                    src="/images/elements/iconMusicien.svg"
                    alt="Décoration"
                    className="flex justify-center mb-6 w-1/3 h-auto"
                />
            </div>
            <div className="w-full h-2 bg-secondary/20 rounded-full mb-6">
                <div
                    className="h-full bg-secondary rounded-full"
                    style={{ width: `75%` }}
                />
            </div>

            {/* Section Cours */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold text-primary">
                    Cours
                </h2>
                <p className="text-mobile-tag md:text-desktop-body text-right text-black ml-4">
                    Choisis parmi les nombreux thèmes
                </p>
            </div>
            <div className="bg-primary p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {popularCourses.map(course => (
                    <Card
                        key={course.id}
                        imageUrl={`/images/specialites/${course.id}.png`}
                        title={course.title}
                    />
                ))}
            </div>

            {/* Section Mentors */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold text-primary">
                    Mentors
                </h2>
                <p className="text-mobile-tag text-right md:text-desktop-body text-black ml-4">
                    Découvre des passionnés compétents
                </p>
            </div>
            <MentorSlider />
            <Link href="/testimonials">
                <Button variant="primary" className="w-full mt-6">
                    Suivant
                </Button>
            </Link>
        </div>
    )
}