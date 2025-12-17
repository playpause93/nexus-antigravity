'use client'

interface SearchBarProps {
    onSearch: (query: string) => void
    onFilterChange: (filter: string) => void
    currentFilter: string
}

export default function SearchBar({ onSearch, onFilterChange, currentFilter }: SearchBarProps) {
    return (
        <div className="glass rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder="Buscar por nombre o símbolo..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                />
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {/* Filtros */}
            <div className="flex gap-2">
                <button
                    onClick={() => onFilterChange('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${currentFilter === 'all'
                            ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-glow'
                            : 'bg-dark-bg text-gray-400 hover:text-white'
                        }`}
                >
                    Todos
                </button>
                <button
                    onClick={() => onFilterChange('gainers')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${currentFilter === 'gainers'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-glow'
                            : 'bg-dark-bg text-gray-400 hover:text-white'
                        }`}
                >
                    🚀 Subiendo
                </button>
                <button
                    onClick={() => onFilterChange('losers')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${currentFilter === 'losers'
                            ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-glow'
                            : 'bg-dark-bg text-gray-400 hover:text-white'
                        }`}
                >
                    📉 Bajando
                </button>
                <button
                    onClick={() => onFilterChange('high-win')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${currentFilter === 'high-win'
                            ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-glow'
                            : 'bg-dark-bg text-gray-400 hover:text-white'
                        }`}
                >
                    ⭐ Alto Win Rate
                </button>
            </div>
        </div>
    )
}
