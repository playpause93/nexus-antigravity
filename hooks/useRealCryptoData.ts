import { useState, useEffect, useRef } from 'react'
import { CryptoData, getSimulatedWinRate, updateSimulatedWinRate } from '@/utils/mockData'
import { fetchCryptoMarketData, CRYPTO_COLORS } from '@/services/coinGeckoApi'

interface UseRealDataOptions {
    interval?: number
    enabled?: boolean
}

export function useRealCryptoData(options: UseRealDataOptions = {}) {
    const { interval = 60000, enabled = true } = options

    const [data, setData] = useState<CryptoData[]>([])
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
    const [changedIds, setChangedIds] = useState<Set<string>>(new Set())
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const previousPricesRef = useRef<Map<string, number>>(new Map())

    const loadCryptoData = async () => {
        try {
            setError(null)

            const marketData = await fetchCryptoMarketData()

            const newData: CryptoData[] = marketData.map((coin, index) => {
                const previousPrice = previousPricesRef.current.get(coin.id)

                let winRate = getSimulatedWinRate(coin.id)
                const existingCrypto = data.find(d => d.id === coin.id)
                if (existingCrypto) {
                    winRate = updateSimulatedWinRate(existingCrypto.winRate)
                }

                const priceHistory = (coin as any).sparkline_in_7d?.price || [coin.current_price]

                return {
                    id: coin.id,
                    name: coin.name,
                    symbol: coin.symbol.toUpperCase(),
                    price: coin.current_price,
                    winRate: winRate,
                    change: coin.price_change_percentage_24h || 0,
                    rank: coin.market_cap_rank || index + 1,
                    colors: CRYPTO_COLORS[coin.id] || ['#6366f1', '#8b5cf6'],
                    marketCap: coin.market_cap || 0,
                    volume24h: coin.total_volume || 0,
                    high24h: coin.high_24h || coin.current_price,
                    low24h: coin.low_24h || coin.current_price,
                    priceHistory: priceHistory,
                }
            })

            const changed = new Set<string>()
            newData.forEach(crypto => {
                const prevPrice = previousPricesRef.current.get(crypto.id)
                if (prevPrice !== undefined && prevPrice !== crypto.price) {
                    changed.add(crypto.id)
                }
                previousPricesRef.current.set(crypto.id, crypto.price)
            })

            setChangedIds(changed)
            setData(newData)
            setLastUpdate(new Date())
            setIsLoading(false)

            setTimeout(() => {
                setChangedIds(new Set())
            }, 1000)

        } catch (err) {
            console.error('Error loading crypto data:', err)
            setError(err instanceof Error ? err.message : 'Error loading data')
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadCryptoData()
    }, [])

    useEffect(() => {
        if (!enabled) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            return
        }

        intervalRef.current = setInterval(() => {
            loadCryptoData()
        }, interval)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [interval, enabled])

    return {
        data,
        lastUpdate,
        changedIds,
        isLoading,
        error,
        reload: loadCryptoData,
    }
}
