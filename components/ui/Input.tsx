import React from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type InputProps = {
    label: string
    type?: string
    register: UseFormRegisterReturn
    error?: FieldError
}

export const Input: React.FC<InputProps> = ({ label, type = 'text', register, error }) => (
    <div className="mb-4">
        <label className="block text-mobile-body md:text-desktop-body font-medium mb-1 text-primary">{label}</label>
        <input type={type} {...register} className="w-full px-3 py-2 border border-black rounded focus:outline-none focus:ring focus:border-azur text-mobile-body md:text-desktop-body" />
        {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
    </div>
)