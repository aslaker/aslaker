import { useState, useEffect, useMemo, useRef } from 'react'

interface Cell {
  id: number
  value: '0' | '1'
  variant: number // 0-5 for different animation styles
  delay: number
  duration: number
}

interface MatrixBackgroundProps {
  /** Base opacity for the background (0-1) */
  opacity?: number
  /** Density of the grid - higher = more sparse */
  cellSize?: number
}

export function MatrixBackground({
  opacity = 0.05,
  cellSize = 48,
}: MatrixBackgroundProps) {
  // Use the theme color from CSS variables
  const color = 'var(--theme-primary, #84cc16)'
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [cells, setCells] = useState<Cell[]>([])
  const frameRef = useRef<number>(0)
  const lastFlipRef = useRef<number>(0)

  // Calculate grid dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Generate initial cells when dimensions change
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const cols = Math.ceil(dimensions.width / cellSize) + 1
    const rows = Math.ceil(dimensions.height / cellSize) + 1
    const totalCells = cols * rows

    const newCells = Array.from({ length: totalCells }, (_, i) => ({
      id: i,
      value: (Math.random() > 0.5 ? '1' : '0') as '0' | '1',
      variant: Math.floor(Math.random() * 6),
      delay: Math.random() * 8,
      duration: 3 + Math.random() * 5,
    }))

    setCells(newCells)
  }, [dimensions, cellSize])

  // Randomly flip cells using requestAnimationFrame
  useEffect(() => {
    if (cells.length === 0) return

    const animate = (time: number) => {
      // Only flip cells every ~500ms for better performance
      if (time - lastFlipRef.current > 500) {
        lastFlipRef.current = time

        setCells((prevCells) => {
          // Pick 3-8% of cells to potentially flip (reduced for performance)
          const numToFlip = Math.floor(prevCells.length * (0.03 + Math.random() * 0.05))
          const indicesToFlip = new Set<number>()

          while (indicesToFlip.size < numToFlip) {
            indicesToFlip.add(Math.floor(Math.random() * prevCells.length))
          }

          return prevCells.map((cell, index) => {
            if (indicesToFlip.has(index)) {
              return {
                ...cell,
                value: cell.value === '0' ? '1' : '0',
              }
            }
            return cell
          })
        })
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [cells.length])

  const cols = useMemo(
    () => Math.ceil(dimensions.width / cellSize) + 1,
    [dimensions.width, cellSize]
  )

  if (cells.length === 0) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          perspective: '1000px',
        }}
      >
        {cells.map((cell) => (
          <div
            key={cell.id}
            className="matrix-cell flex items-center justify-center font-mono text-sm select-none"
            data-variant={cell.variant}
            style={{
              width: cellSize,
              height: cellSize,
              color,
              animationDelay: `${cell.delay}s`,
              animationDuration: `${cell.duration}s`,
              transformStyle: 'preserve-3d',
            }}
          >
            <span className="matrix-digit">{cell.value}</span>
          </div>
        ))}
      </div>

      <style>{`
        .matrix-cell {
          animation: matrixBase 4s ease-in-out infinite;
          will-change: transform, opacity;
        }

        .matrix-cell .matrix-digit {
          display: inline-block;
        }

        /* Variant 0: Gentle pulse with slight scale */
        .matrix-cell[data-variant="0"] {
          animation-name: matrixPulseScale;
        }

        /* Variant 1: Y-axis flip */
        .matrix-cell[data-variant="1"] {
          animation-name: matrixFlipY;
        }

        /* Variant 2: X-axis flip */
        .matrix-cell[data-variant="2"] {
          animation-name: matrixFlipX;
        }

        /* Variant 3: Grow and shrink dramatically */
        .matrix-cell[data-variant="3"] {
          animation-name: matrixGrowShrink;
        }

        /* Variant 4: Rotate and scale combo */
        .matrix-cell[data-variant="4"] {
          animation-name: matrixRotateScale;
        }

        /* Variant 5: Z-axis spin */
        .matrix-cell[data-variant="5"] {
          animation-name: matrixSpin;
        }

        @keyframes matrixPulseScale {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes matrixFlipY {
          0%, 100% {
            opacity: 0.3;
            transform: rotateY(0deg) scale(1);
          }
          25% {
            opacity: 1;
            transform: rotateY(90deg) scale(0.8);
          }
          50% {
            opacity: 0.5;
            transform: rotateY(180deg) scale(1.1);
          }
          75% {
            opacity: 1;
            transform: rotateY(270deg) scale(0.9);
          }
        }

        @keyframes matrixFlipX {
          0%, 100% {
            opacity: 0.3;
            transform: rotateX(0deg) scale(1);
          }
          25% {
            opacity: 0.8;
            transform: rotateX(90deg) scale(1.2);
          }
          50% {
            opacity: 0.4;
            transform: rotateX(180deg) scale(0.8);
          }
          75% {
            opacity: 1;
            transform: rotateX(270deg) scale(1);
          }
        }

        @keyframes matrixGrowShrink {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.5);
          }
          30% {
            opacity: 1;
            transform: scale(1.5);
          }
          60% {
            opacity: 0.6;
            transform: scale(0.7);
          }
          80% {
            opacity: 0.9;
            transform: scale(1.3);
          }
        }

        @keyframes matrixRotateScale {
          0%, 100% {
            opacity: 0.3;
            transform: rotate(0deg) scale(1);
          }
          25% {
            opacity: 1;
            transform: rotate(90deg) scale(1.4);
          }
          50% {
            opacity: 0.5;
            transform: rotate(180deg) scale(0.6);
          }
          75% {
            opacity: 0.8;
            transform: rotate(270deg) scale(1.2);
          }
        }

        @keyframes matrixSpin {
          0% {
            opacity: 0.3;
            transform: rotateZ(0deg) scale(1);
          }
          25% {
            opacity: 1;
            transform: rotateZ(90deg) scale(1.3);
          }
          50% {
            opacity: 0.4;
            transform: rotateZ(180deg) scale(0.7);
          }
          75% {
            opacity: 0.9;
            transform: rotateZ(270deg) scale(1.1);
          }
          100% {
            opacity: 0.3;
            transform: rotateZ(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
