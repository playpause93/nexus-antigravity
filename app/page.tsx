'use client'

import { useState, useMemo } from 'react'
import { formatPrice, formatChange, CryptoData } from '@/utils/mockData'
import { useRealCryptoData } from '@/hooks/useRealCryptoData'
import SearchBar from '@/components/SearchBar'
import MiniChart from '@/components/MiniChart'
import ExpandedRow from '@/components/ExpandedRow'
import ThemeSelector from '@/components/ThemeSelector'
import LiveTerminal from '@/components/LiveTerminal'

type SortField = 'rank' | 'price' | 'change' | 'winRate'
type SortDirection = 'asc' | 'desc'

export default function Home() {
    // Usar datos reales de CoinGecko (actualización cada 60 segundos)
    const { data, lastUpdate, changedIds, isLoading, error } = useRealCryptoData({ interval: 60000 })

    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState<string>('all')
    const [sortField, setSortField] = useState<SortField>('rank')
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

    // Filtrado y búsqueda
    const filteredData = useMemo(() => {
        let result = data

        // Búsqueda
        if (searchQuery) {
            result = result.filter(
                crypto =>
                    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Filtros
        if (filter === 'gainers') {
            result = result.filter(crypto => crypto.change > 0)
        } else if (filter === 'losers') {
            result = result.filter(crypto => crypto.change < 0)
        } else if (filter === 'hig-win') {
            result = result.filter(crypto => crypto.winRate >= 70)
        }

        return result
    }, [data, searchQuery, filter])

    // Ordenamiento
    const sortedData = useMemo(() => {
        const sorted = [...filteredData]
        sorted.sort((a, b) => {
            let aVal = a[sortField]
            let bVal = b[sortField]

            if (sortDirection === 'asc') {
                return aVal > bVal ? 1 : -1
            } else {
                return aVal < bVal ? 1 : -1
            }
        })
        return sorted
    }, [filteredData, sortField, sortDirection])

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) {
            return (
                <span className="sort-indicator">
                    <svg className="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 10l5-5 5 5H5z" />
                    </svg>
                </span>
            )
        }
        return (
            <span className="sort-indicator active">
                {sortDirection === 'asc' ? (
                    <svg className="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 10l5-5 5 5H5z" />
                    </svg>
                ) : (
                    <svg className="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15 10l-5 5-5-5h10z" />
                    </svg>
                )}
            </span>
        )
    }

    const getPriceChangeClass = (cryptoId: string, currentChange: number) => {
        if (!changedIds.has(cryptoId)) return ''
        return currentChange >= 0 ? 'row-glow-green' : 'row-glow-red'
    }

    // Mostrar loading state
    if (isLoading && data.length === 0) {
        return (
            <main className="min-h-screen bg-dark-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-xl text-gray-400">Cargando datos del mercado en vivo...</p>
                    <p className="text-sm text-gray-500 mt-2">Conectando con CoinGecko API</p>
                </div>
            </main>
        )
    }

    // Mostrar error state
    if (error) {
        return (
            <main className="min-h-screen bg-dark-bg flex items-center justify-center">
                <div className="glass rounded-2xl p-8 max-w-md text-center">
                    <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-white mb-2">Error al cargar datos</h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg font-semibold hover:shadow-glow transition-all"
                    >
                        Reintentar
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-dark-bg">
            {/* Header/Navbar */}
            <header className="border-b border-dark-border bg-dark-card sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center shadow-glow">
                                <span className="text-white font-bold text-xl">N</span>
                            </div>
                            <h1 className="text-3xl font-bold gradient-text">NEXUS</h1>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Rankings</a>
                            <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Markets</a>
                            <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Analytics</a>
                            <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Portfolio</a>
                        </nav>
                        <div className="flex items-center gap-3">
                            <ThemeSelector />
                            <button className="px-6 py-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 hover:scale-105">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content with Ads */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Ad Space - Binance Affiliate */}
                    <aside className="hidden xl:block col-span-2">
                        <div className="sticky top-24">
                            <a
                                href="https://accounts.binance.com/register?ref=1196272731"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                            >
                                <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 bg-gradient-to-br from-black via-gray-900 to-black p-8 hover:shadow-2xl hover:shadow-yellow-500/20">
                                    {/* VIP Badge */}
                                    <div className="absolute top-4 right-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                                                CUENTA<br />PROFESIONAL
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Opera con 0% riesgo y bonos exclusivos.
                                            </p>
                                        </div>

                                        {/* Separator */}
                                        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

                                        {/* Features */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-gray-300 text-xs">
                                                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>Acceso VIP Trading</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300 text-xs">
                                                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>Soporte 24/7</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300 text-xs">
                                                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>Sin Comisiones</span>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <button className="w-full py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/80 transition-all duration-300 hover:scale-105 group-hover:animate-pulse">
                                            ACTIVAR BONUS
                                        </button>
                                    </div>

                                    {/* Ambient Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </a>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <section className="col-span-12 xl:col-span-8">
                        {/* Hero Section */}
                        <div className="glass rounded-2xl p-8 mb-6 animate-fade-in">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2 gradient-text">Ranking de Criptomonedas</h2>
                                    <p className="text-gray-400 text-lg flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        Datos reales de CoinGecko • Actualizado {lastUpdate.toLocaleTimeString()}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 flex gap-2">
                                    <button
                                        onClick={() => setViewMode('table')}
                                        className={`px-4 py-2 rounded-lg transition-all ${viewMode === 'table'
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-dark-bg text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('cards')}
                                        className={`px-4 py-2 rounded-lg transition-all ${viewMode === 'cards'
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-dark-bg text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <div className="glass px-4 py-2 rounded-lg">
                                    <span className="text-gray-400 text-sm">Mercado Total:</span>
                                    <span className="ml-2 text-primary-400 font-bold">$1.8T</span>
                                </div>
                                <div className="glass px-4 py-2 rounded-lg">
                                    <span className="text-gray-400 text-sm">Vol. 24h:</span>
                                    <span className="ml-2 text-primary-400 font-bold">$95.2B</span>
                                </div>
                                <div className="glass px-4 py-2 rounded-lg">
                                    <span className="text-gray-400 text-sm">BTC Dom:</span>
                                    <span className="ml-2 text-primary-400 font-bold">48.3%</span>
                                </div>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <SearchBar
                            onSearch={setSearchQuery}
                            onFilterChange={setFilter}
                            currentFilter={filter}
                        />

                        {/* Crypto Table/Cards */}
                        {viewMode === 'table' ? (
                            <div className="glass rounded-2xl overflow-hidden animate-slide-up">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-dark-border">
                                                <th
                                                    className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                                                    onClick={() => handleSort('rank')}
                                                >
                                                    Rank <SortIcon field="rank" />
                                                </th>
                                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                    Activo
                                                </th>
                                                <th
                                                    className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                                                    onClick={() => handleSort('price')}
                                                >
                                                    Precio <SortIcon field="price" />
                                                </th>
                                                <th
                                                    className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                                                    onClick={() => handleSort('change')}
                                                >
                                                    24h <SortIcon field="change" />
                                                </th>
                                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-20">
                                                    Gráfico
                                                </th>
                                                <th
                                                    className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                                                    onClick={() => handleSort('winRate')}
                                                >
                                                    Win Rate <SortIcon field="winRate" />
                                                </th>
                                                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                                    Acción
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedData.map((crypto) => (
                                                <>
                                                    <tr
                                                        key={crypto.id}
                                                        onClick={() => setExpandedId(expandedId === crypto.id ? null : crypto.id)}
                                                        className={`border-b border-dark-border transition-all duration-200 cursor-pointer hover:bg-dark-hover ${getPriceChangeClass(crypto.id, crypto.change)
                                                            }`}
                                                    >
                                                        <td className="px-6 py-5">
                                                            <span className="text-gray-400 font-semibold">{crypto.rank}</span>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center space-x-3">
                                                                <div
                                                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${changedIds.has(crypto.id) ? 'shadow-glow' : ''
                                                                        }`}
                                                                    style={{
                                                                        background: `linear-gradient(135deg, ${crypto.colors[0]}, ${crypto.colors[1]})`,
                                                                    }}
                                                                >
                                                                    {crypto.symbol.substring(0, 2)}
                                                                </div>
                                                                <div>
                                                                    <div className="font-semibold text-white">{crypto.name}</div>
                                                                    <div className="text-sm text-gray-500">{crypto.symbol}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-5">
                                                            <span className={`text-white font-semibold ${changedIds.has(crypto.id) ? 'value-updated' : ''}`}>
                                                                {formatPrice(crypto.price)}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-5">
                                                            <span
                                                                className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${crypto.change >= 0
                                                                    ? 'bg-green-500/20 text-green-400'
                                                                    : 'bg-red-500/20 text-red-400'
                                                                    }`}
                                                            >
                                                                {formatChange(crypto.change)}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-5">
                                                            <MiniChart
                                                                data={crypto.priceHistory}
                                                                width={60}
                                                                height={30}
                                                                isPositive={crypto.change >= 0}
                                                            />
                                                        </td>
                                                        <td className="px-4 py-5">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="flex-1 bg-dark-bg rounded-full h-2 overflow-hidden">
                                                                    <div
                                                                        className={`h-full rounded-full transition-all duration-500 ${crypto.winRate >= 70
                                                                            ? 'bg-green-500'
                                                                            : crypto.winRate >= 60
                                                                                ? 'bg-yellow-500'
                                                                                : 'bg-red-500'
                                                                            }`}
                                                                        style={{ width: `${crypto.winRate}%` }}
                                                                    />
                                                                </div>
                                                                <span
                                                                    className={`font-semibold min-w-[3rem] ${crypto.winRate >= 70
                                                                        ? 'text-green-400'
                                                                        : crypto.winRate >= 60
                                                                            ? 'text-yellow-400'
                                                                            : 'text-red-400'
                                                                        }`}
                                                                >
                                                                    {crypto.winRate}%
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-5">
                                                            <a
                                                                href="https://accounts.binance.com/register?ref=1196272731"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <button className="px-3 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg font-medium text-xs hover:shadow-glow transition-all duration-300 hover:scale-105 flex items-center gap-1 whitespace-nowrap">
                                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                                                    </svg>
                                                                    COPIAR
                                                                </button>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    {expandedId === crypto.id && (
                                                        <tr key={`${crypto.id}-expanded`}>
                                                            <ExpandedRow crypto={crypto} />
                                                        </tr>
                                                    )}
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            /* Card View for Mobile */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {sortedData.map((crypto) => (
                                    <div
                                        key={crypto.id}
                                        className={`glass rounded-xl p-6 cursor-pointer transition-all hover:scale-105 ${getPriceChangeClass(crypto.id, crypto.change)
                                            }`}
                                        onClick={() => setExpandedId(expandedId === crypto.id ? null : crypto.id)}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${crypto.colors[0]}, ${crypto.colors[1]})`,
                                                    }}
                                                >
                                                    {crypto.symbol.substring(0, 2)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{crypto.name}</div>
                                                    <div className="text-sm text-gray-500">{crypto.symbol}</div>
                                                </div>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${crypto.change >= 0
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-red-500/20 text-red-400'
                                                    }`}
                                            >
                                                {formatChange(crypto.change)}
                                            </span>
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-3">{formatPrice(crypto.price)}</div>
                                        <MiniChart
                                            data={crypto.priceHistory}
                                            width={300}
                                            height={60}
                                            isPositive={crypto.change >= 0}
                                        />
                                        <div className="mt-4 pt-4 border-t border-dark-border">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-400">Win Rate</span>
                                                <span
                                                    className={`font-semibold ${crypto.winRate >= 70
                                                        ? 'text-green-400'
                                                        : crypto.winRate >= 60
                                                            ? 'text-yellow-400'
                                                            : 'text-red-400'
                                                        }`}
                                                >
                                                    {crypto.winRate}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Live AI Terminal - The Brain */}
                        <div className="mt-8">
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    El Cerebro
                                    <span className="text-sm font-normal text-gray-400 ml-2">(Actividad en Tiempo Real)</span>
                                </h2>
                            </div>
                            <LiveTerminal />
                        </div>
                    </section>

                    {/* Right Ad Space - Binance Affiliate */}
                    <aside className="hidden xl:block col-span-2">
                        <div className="sticky top-24">
                            <a
                                href="https://accounts.binance.com/register?ref=1196272731"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                            >
                                <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 bg-gradient-to-br from-black via-gray-900 to-black p-8 hover:shadow-2xl hover:shadow-yellow-500/20">
                                    {/* VIP Badge */}
                                    <div className="absolute top-4 right-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                                                CUENTA<br />PROFESIONAL
                                            </h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Opera con 0% riesgo y bonos exclusivos.
                                            </p>
                                        </div>

                                        {/* Separator */}
                                        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

                                        {/* Features */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-gray-300 text-xs">
                                                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>Acceso VIP Trading</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300 text-xs">
                                                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>Soporte 24/7</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-300 text-xs">
                                                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <span>Sin Comisiones</span>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <button className="w-full py-4 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold rounded-xl shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/80 transition-all duration-300 hover:scale-105 group-hover:animate-pulse">
                                            ACTIVAR BONUS
                                        </button>
                                    </div>

                                    {/* Ambient Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </a>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-dark-border bg-dark-card mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center text-gray-500 text-sm">
                        © 2024 NEXUS Trading Statistics. Todos los derechos reservados.
                    </div>
                </div>
            </footer>
        </main>
    )
}
