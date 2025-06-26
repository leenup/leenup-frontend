'use client'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

type FormData = {
    firstName: string
    email: string
    password: string
    confirmPassword: string
    news?: boolean         // <— ajouté ici
}

export default function SignupPage() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>()
    const onSubmit = (data: FormData) => console.log(data)

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-mobile-h2 md:text-desktop-h2 font-bold mb-4 text-primary">
                    Inscription
                </h2>

                <Input
                    label="Prénom + Nom"
                    register={register('firstName', { required: 'Obligatoire' })}
                    error={errors.firstName}
                />
                <Input
                    label="Email"
                    type="email"
                    register={register('email', {
                        required: 'Obligatoire',
                        pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
                    })}
                    error={errors.email}
                />
                <Input
                    label="Mot de passe"
                    type="password"
                    register={register('password', {
                        required: 'Obligatoire',
                        minLength: { value: 6, message: 'Au moins 6 caractères' }
                    })}
                    error={errors.password}
                />

                <div className="flex items-center mb-4">
                    <input
                        id="newsletter"
                        type="checkbox"
                        className="mr-2"
                        {...register('news')}
                    />
                    <label
                        htmlFor="newsletter"
                        className="text-mobile-small md:text-desktop-small"
                    >
                        Je m&apos;inscris à la newsletter et je reçois des offres personnalisées.
                    </label>
                </div>

                <Button type="submit" className="w-full mt-4">
                    Je m&apos;inscris
                </Button>

                <p className="mt-4 text-center text-mobile-small md:text-desktop-small">
                    J&apos;ai déjà un compte.{' '}
                    <Link href="/auth/login" className="underline text-primary">
                        Connexion
                    </Link>
                </p>
            </form>
        </div>
    )
}