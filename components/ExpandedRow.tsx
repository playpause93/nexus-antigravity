'use client'

import { CryptoData, formatPrice, formatLargeNumber } from '@/utils/mockData'
import MiniChart from './MiniChart'

interface ExpandedRowProps {
    crypto: CryptoData
}

export default function ExpandedRow({ crypto }: ExpandedRowProps) {
    return (
        <td colSpan={7} className="px-6 py-6 bg-dark-hover border-b border-dark-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gráfico grande */}
                <div className="glass rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-4">Tendencia 24h</h4>
                    <div className="flex items-center justify-center">
                        <MiniChart
                            data={crypto.priceHistory}
                            width={300}
                            height={150}
                            isPositive={crypto.change >= 0}
                        />
                    </div>
                </div>

                {/* Estadísticas detalladas */}
                <div className="glass rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-4">Estadísticas Detalladas</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Market Cap</p>
                            <p className="text-lg font-bold text-white">{formatLargeNumber(crypto.marketCap)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Volumen 24h</p>
                            <p className="text-lg font-bold text-white">{formatLargeNumber(crypto.volume24h)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Máximo 24h</p>
                            <p className="text-lg font-bold text-green-400">{formatPrice(crypto.high24h)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Mínimo 24h</p>
                            <p className="text-lg font-bold text-red-400">{formatPrice(crypto.low24h)}</p>
                        </div>
                    </div>

                    {/* Indicadores adicionales */}
                    <div className="mt-4 pt-4 border-t border-dark-border">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Volatilidad 24h</span>
                            <span className="text-sm font-semibold text-yellow-400">
                                {(((crypto.high24h - crypto.low24h) / crypto.low24h) * 100).toFixed(2)}%
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Performance</span>
                            <span className={`text-sm font-semibold ${crypto.winRate >= 70 ? 'text-green-400' :
                                    crypto.winRate >= 60 ? 'text-yellow-400' : 'text-red-400'
                                }`}>
                                {crypto.winRate >= 70 ? '🔥 Excelente' :
                                    crypto.winRate >= 60 ? '👍 Bueno' : '⚠️ Moderado'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </td>
    )
}
