import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#b9e6fe',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                dark: {
                    bg: '#0a0e1a',
                    card: '#141823',
                    border: '#1e2433',
                    hover: '#1a1f2e',
                }
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
            },
            boxShadow: {
                'glow': '0 0 20px rgba(14, 165, 233, 0.3)',
                'glow-lg': '0 0 40px rgba(14, 165, 233, 0.4)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.6)' },
                },
            },
        },
    },
    plugins: [],
}
export default config
