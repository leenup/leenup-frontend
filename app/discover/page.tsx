import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function DiscoverPage() {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-white px-4">
            {/* Teaser image or illustration */}
            <img src="/onboarding/illustration1.svg" alt="Teaser" className="w-3/4 max-w-sm mb-6" />
            {/* Progress bar placeholder */}
            <div className="w-full max-w-sm h-2 bg-secondary/20 rounded-full mb-8">
                <div className="w-1/4 h-full bg-secondary rounded-full" />
            </div>
            <h1 className="text-mobile-h1 md:text-desktop-h1 font-bold text-primary mb-8">Développe ton perso</h1>
            <div className="space-y-4 w-full max-w-sm">
                {/* Connexion Email --> page d'inscription */}
                <Link href="/auth/signup">
                    <Button variant="secondary" className="w-full">Connexion Email</Button>
                </Link>
                {/* Slider teaser des parcours onboarding --> page 1 */}
                <Link href="/onboarding/step/1">
                    <Button variant="primary" className="w-full">Je découvre l’application</Button>
                </Link>
            </div>
        </div>
    )
}