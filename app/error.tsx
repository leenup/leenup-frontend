'use client'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <html>
        <body>
        <h2>Une erreur est survenue 😢</h2>
        <button onClick={() => reset()}>Réessayer</button>
        </body>
        </html>
    )
}