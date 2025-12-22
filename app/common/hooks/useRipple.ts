import { useState } from 'react'

export interface RippleData {
  id: number
  x: number
  y: number
  size: number
}

export function useRipple() {
  const [ripples, setRipples] = useState<RippleData[]>([])

  return {
    onCreateRipple: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const container = event.currentTarget.getBoundingClientRect()
      const size = Math.max(container.width, container.height)
      const x = event.clientX - container.left - size / 2
      const y = event.clientY - container.top - size / 2

      setRipples((prevRipples) => [
        ...prevRipples,
        {
          id: Date.now(),
          x,
          y,
          size
        }
      ])
    },
    onClearRipple: (id: number) => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    },
    ripples
  }
}
