'use client'

import { useEffect, useState } from 'react'

const themes = {
    default: {
        name: 'Default',
        primary: '#0ea5e9',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
    },
    purple: {
        name: 'Purple Dream',
        primary: '#8b5cf6',
        secondary: '#a855f7',
        accent: '#c084fc',
    },
    green: {
        name: 'Matrix',
        primary: '#10b981',
        secondary: '#14b8a6',
        accent: '#22c55e',
    },
    red: {
        name: 'Fire',
        primary: '#ef4444',
        secondary: '#f59e0b',
        accent: '#f97316',
    },
}

type ThemeName = keyof typeof themes

export default function ThemeSelector() {
    const [currentTheme, setCurrentTheme] = useState<ThemeName>('default')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Cargar tema desde localStorage
        const saved = localStorage.getItem('nexus-theme') as ThemeName
        if (saved && themes[saved]) {
            setCurrentTheme(saved)
            applyTheme(saved)
        }
    }, [])

    const applyTheme = (themeName: ThemeName) => {
        const theme = themes[themeName]
        document.documentElement.style.setProperty('--color-primary', theme.primary)
        document.documentElement.style.setProperty('--color-secondary', theme.secondary)
        document.documentElement.style.setProperty('--color-accent', theme.accent)
    }

    const handleThemeChange = (themeName: ThemeName) => {
        setCurrentTheme(themeName)
        applyTheme(themeName)
        localStorage.setItem('nexus-theme', themeName)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg hover:border-primary-500 transition-colors flex items-center gap-2"
                title="Cambiar tema"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                </svg>
                <span className="hidden md:inline text-sm font-medium">{themes[currentTheme].name}</span>
            </button>

            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 top-12 z-50 glass rounded-lg p-2 min-w-[200px] shadow-glow border border-dark-border">
                        {Object.entries(themes).map(([key, theme]) => (
                            <button
                                key={key}
                                onClick={() => handleThemeChange(key as ThemeName)}
                                className={`w-full px-4 py-3 rounded-lg flex items-center justify-between hover:bg-dark-hover transition-colors ${currentTheme === key ? 'bg-dark-hover' : ''
                                    }`}
                            >
                                <span className="text-sm font-medium">{theme.name}</span>
                                <div className="flex gap-1">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: theme.primary }}
                                    />
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: theme.secondary }}
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
