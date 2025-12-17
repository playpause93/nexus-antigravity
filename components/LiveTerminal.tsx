'use client'

import { useEffect, useRef, useState } from 'react'

const MESSAGES = [
    '[SYSTEM] Inicializando conexión con blockchain...',
    '[AI] Escaneando red Ethereum...',
    '[BOT] Analizando volumen de mercado...',
    '[SYSTEM] Detectado patrón alcista en BTC',
    '[AI] Calculando niveles de soporte...',
    '[BOT] Soporte identificado en $42,000',
    '[SYSTEM] Monitoreando órdenes de ballenas...',
    '[AI] Ajustando Stop Loss dinámico...',
    '[BOT] Ejecutando estrategia de cobertura...',
    '[SYSTEM] Actualizando indicadores técnicos...',
    '[AI] RSI sobreventa detectado en ETH',
    '[BOT] Preparando señal de entrada...',
    '[SYSTEM] Verificando liquidez del mercado...',
    '[AI] Divergencia alcista confirmada',
    '[BOT] Optimizando ratio riesgo/beneficio...',
    '[SYSTEM] Sincronizando con API de exchanges...',
    '[AI] Analizando sentimiento de mercado...',
    '[BOT] Take Profit configurado en $48,500',
]

export default function LiveTerminal() {
    const [messages, setMessages] = useState<string[]>([])
    const terminalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let index = 0
        const interval = setInterval(() => {
            if (index < MESSAGES.length) {
                setMessages(prev => [...prev, MESSAGES[index]])
                index++
            } else {
                // Restart from beginning
                index = 0
                setMessages([])
            }
        }, 2000) // New message every 2 seconds

        return () => clearInterval(interval)
    }, [])

    // Auto-scroll to bottom
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [messages])

    return (
        <div className="glass rounded-2xl overflow-hidden border border-green-500/20 animate-slide-up">
            {/* Terminal Header */}
            <div className="bg-black border-b border-green-500/30 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-green-400 font-mono text-xs ml-2">
                    antigravity@nexus:~$
                </span>
            </div>

            {/* Terminal Content */}
            <div
                ref={terminalRef}
                className="bg-black h-[150px] overflow-y-auto p-4 font-mono text-xs leading-relaxed scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent"
            >
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className="text-green-400 mb-1 animate-fade-in"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                        <span className="text-green-500 mr-2">›</span>
                        {msg}
                    </div>
                ))}
                {messages.length > 0 && (
                    <div className="text-green-400 animate-pulse">
                        <span className="text-green-500 mr-2">›</span>
                        <span className="inline-block w-2 h-3 bg-green-400 ml-1"></span>
                    </div>
                )}
            </div>
        </div>
    )
}
