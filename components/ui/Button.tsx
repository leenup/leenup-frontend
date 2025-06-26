import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'tertiary'
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  className = '',
                                                  type = 'button',   // valeur par défaut
                                                  ...rest
                                              }) => {
    const base = 'px-4 py-2 rounded-full font-semibold inline-block transition'
    const variants = {
        primary: 'bg-primary text-white hover:opacity-90',
        secondary: 'bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white',
        tertiary: 'bg-secondary/10 text-primary hover:bg-secondary/20'
    }

    return (
        <button
            type={type}
            className={`${base} ${variants[variant]} ${className}`}
            {...rest}
        >
            {children}
        </button>
    )
}