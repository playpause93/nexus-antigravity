import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'NEXUS - Real-Time Trading Statistics',
    description: 'Track cryptocurrency rankings and win rates in real-time. Advanced trading analytics platform.',
    keywords: ['trading', 'cryptocurrency', 'bitcoin', 'ethereum', 'crypto stats', 'win rate', 'trading analytics'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>{children}</body>
        </html>
    )
}
