import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import '../styles/globals.css'

const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
    title: "Leenup App",
    description: "Plateforme d'échange de compétences",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
        <body className={`${raleway.variable} antialiased font-sans`}>
        {children}
        </body>
        </html>
    );
}