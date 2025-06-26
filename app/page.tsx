import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/Button'

export default function Home() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-white px-4">
            <img
                src="/images/elements/flecheBleu.svg"
                alt="Retour"
                className="absolute"
                style={{ top: '5vh', left: '10vw' }}
            />
            <img
                src="/images/logos/LogoSlogan.png"
                alt="Leenup"
                className="w-48 mb-2"
            />
            <img
                src="/images/elements/iconsBonhommeHome.svg"
                alt="Mascotte"
                className="w-45 h-auto mb-10 mt-8"
            />

            <div className="w-full max-w-sm space-y-4">
                <Link href="/auth/signup">
                    <Button variant="primary" className="w-full">
                        Connexion E-mail
                    </Button>
                </Link>

                <Button variant="tertiary" className="w-full flex items-center justify-center">
                    <img
                        src="/images/icons/google.svg"
                        alt="Google"
                        className="w-5 h-5 mr-2"
                    />
                    Connexion Google
                </Button>

                <Link
                    href="/onboarding/step/1"
                    className="block text-center text-mobile-small md:text-desktop-small text-primary underline"
                >
                    Je découvre l&apos;application
                </Link>
            </div>
        </div>
    )
}