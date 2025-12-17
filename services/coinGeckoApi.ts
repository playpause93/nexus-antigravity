// CoinGecko API Service

// IDs de criptomonedas en CoinGecko
export const CRYPTO_IDS = [
    'bitcoin',
    'ethereum',
    'binancecoin',
    'solana',
    'cardano',
    'ripple',
    'polkadot',
    'avalanche-2',
]

export interface CoinGeckoMarketData {
    id: string
    symbol: string
    name: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    total_volume: number
    high_24h: number
    low_24h: number
    price_change_percentage_24h: number
    image: string
}

// Obtener datos de mercado para las criptos (usando nuestra API route)
export async function fetchCryptoMarketData(): Promise<CoinGeckoMarketData[]> {
    try {
        // Llamar a nuestra API route en lugar de CoinGecko directamente
        const response = await fetch('/api/crypto', {
            headers: {
                'Accept': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching crypto market data:', error)
        throw error
    }
}

// Colores por cripto (mantener consistencia visual)
export const CRYPTO_COLORS: { [key: string]: [string, string] } = {
    'bitcoin': ['#f7931a', '#ff9500'],
    'ethereum': ['#627eea', '#8b9aff'],
    'binancecoin': ['#f3ba2f', '#fcd435'],
    'solana': ['#14f195', '#9945ff'],
    'cardano': ['#0033ad', '#0066ff'],
    'ripple': ['#23292f', '#346aa9'],
    'polkadot': ['#e6007a', '#ff0080'],
    'avalanche-2': ['#e84142', '#ff6b6b'],
}
