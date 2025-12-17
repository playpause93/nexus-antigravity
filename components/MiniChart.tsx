'use client'

import { useEffect, useRef } from 'react'

interface MiniChartProps {
    data: number[]
    width?: number
    height?: number
    color?: string
    isPositive?: boolean
}

export default function MiniChart({
    data,
    width = 100,
    height = 30,
    color,
    isPositive = true
}: MiniChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Limpiar canvas
        ctx.clearRect(0, 0, width, height)

        if (data.length < 2) return

        // Calcular min y max para escalar
        const min = Math.min(...data)
        const max = Math.max(...data)
        const range = max - min || 1

        // Calcular puntos del gráfico
        const points = data.map((value, index) => ({
            x: (index / (data.length - 1)) * width,
            y: height - ((value - min) / range) * height,
        }))

        // Crear gradiente
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        const baseColor = color || (isPositive ? '#10b981' : '#ef4444')
        gradient.addColorStop(0, baseColor + '80')
        gradient.addColorStop(1, baseColor + '10')

        // Dibujar área bajo la curva
        ctx.beginPath()
        ctx.moveTo(points[0].x, height)
        ctx.lineTo(points[0].x, points[0].y)

        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y)
        }

        ctx.lineTo(points[points.length - 1].x, height)
        ctx.closePath()
        ctx.fillStyle = gradient
        ctx.fill()

        // Dibujar línea
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)

        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y)
        }

        ctx.strokeStyle = baseColor
        ctx.lineWidth = 2
        ctx.stroke()

    }, [data, width, height, color, isPositive])

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="rounded"
        />
    )
}
