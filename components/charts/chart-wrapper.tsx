"use client"

import { useEffect, useState, type ReactNode } from "react"

interface ChartWrapperProps {
  children: ReactNode
}

export function ChartWrapper({ children }: ChartWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return <>{children}</>
}
