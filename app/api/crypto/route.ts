import { NextResponse } from 'next/server'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

const CRYPTO_IDS = [
    'bitcoin',
    'ethereum',
    'binancecoin',
    'solana',
    'cardano',
    'ripple',
    'polkadot',
    'avalanche-2',
]

export async function GET() {
    try {
        const ids = CRYPTO_IDS.join(',')
        const url = `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            },
            next: { revalidate: 60 }, // Cache por 60 segundos
        })

        if (!response.ok) {
            throw new Error(`CoinGecko API error: ${response.status}`)
        }

        const data = await response.json()

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching crypto data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch cryptocurrency data' },
            { status: 500 }
        )
    }
}
