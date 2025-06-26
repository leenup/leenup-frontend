'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-white px-4 py-10 text-black md:px-8 md:py-16">
            <div className="mx-auto max-w-xl space-y-8">
                <h1 className="text-mobile-h1 md:text-desktop-h1 text-primary font-extrabold">
                    Créer un compte
                </h1>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-mobile-subtitle md:text-desktop-subtitle block">
                            Nom complet
                        </label>
                        <Input id="name" placeholder="Jean Dupont" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-mobile-subtitle md:text-desktop-subtitle block">
                            Adresse email
                        </label>
                        <Input id="email" type="email" placeholder="exemple@mail.com" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-mobile-subtitle md:text-desktop-subtitle block">
                            Mot de passe
                        </label>
                        <Input id="password" type="password" placeholder="••••••••" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="bio" className="text-mobile-subtitle md:text-desktop-subtitle block">
                            À propos de vous
                        </label>
                        <Textarea id="bio" placeholder="Présente-toi en quelques lignes..." />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="niveau" className="text-mobile-subtitle md:text-desktop-subtitle block">
                            Niveau XP
                        </label>
                        <Select id="niveau" defaultValue="">
                            <option disabled value="">
                                Sélectionner un niveau
                            </option>
                            <option value="junior">Débutant</option>
                            <option value="intermediaire">Intermédiaire</option>
                            <option value="avance">Confirmé</option>
                        </Select>
                    </div>

                    <div className="flex items-center gap-3">
                        <Checkbox id="cgu" />
                        <label htmlFor="cgu" className="text-mobile-small md:text-desktop-small">
                            J&apos;accepte les conditions générales d&apos;utilisation                        </label>
                    </div>

                    <Button className="w-full text-mobile-button md:text-desktop-button">
                        S’inscrire
                    </Button>
                </form>
            </div>
        </main>
    )
}