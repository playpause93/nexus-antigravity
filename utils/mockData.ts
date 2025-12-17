// Tipos de datos
export interface CryptoData {
    id: string // CoinGecko ID
    name: string
    symbol: string
    price: number
    winRate: number // Simulado (bot privado)
    change: number
    rank: number
    colors: [string, string]
    marketCap: number
    volume24h: number
    high24h: number
    low24h: number
    priceHistory: number[]
}

// Win Rates simulados para el bot privado (mantener valores originales)
const BOT_WIN_RATES: { [key: string]: number } = {
    'bitcoin': 68.5,
    'ethereum': 72.3,
    'binancecoin': 65.8,
    'solana': 78.9,
    'cardano': 55.2,
    'ripple': 62.1,
    'polkadot': 59.4,
    'avalanche-2': 71.5,
}

// Formatear precio según la magnitud
export function formatPrice(price: number): string {
    if (price >= 1000) {
        return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    } else if (price >= 1) {
        return `$${price.toFixed(2)}`
    } else {
        return `$${price.toFixed(4)}`
    }
}

// Formatear números grandes (market cap, volume)
export function formatLargeNumber(num: number): string {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toLocaleString()}`
}

// Formatear porcentaje de cambio
export function formatChange(change: number): string {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}%`
}

// Obtener Win Rate simulado
export function getSimulatedWinRate(coinId: string): number {
    return BOT_WIN_RATES[coinId] || 60.0
}

// Agregar variación aleatoria al Win Rate (simular cambios del bot)
export function updateSimulatedWinRate(currentWinRate: number): number {
    // Variación pequeña: ±0.5%
    const variation = (Math.random() - 0.5) * 1
    const newWinRate = currentWinRate + variation

    // Limitar entre 40% y 90%
    return Math.max(40, Math.min(90, newWinRate))
}
