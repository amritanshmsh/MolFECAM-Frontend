'use client'

import { useState, useEffect } from 'react'

interface ForgettingMetrics {
  [key: string]: number | string
}

export default function ForgettingMetrics() {
  const [metrics, setMetrics] = useState<ForgettingMetrics | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchMetrics() {
      try {
        const res = await fetch('http://localhost:8000/metrics/forgetting')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: ForgettingMetrics = await res.json()
        if (isMounted) {
          setMetrics(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) setError((err as Error).message)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 5000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  if (error) {
    return <div className="mt-6 text-red-500">Error loading metrics: {error}</div>
  }
  if (!metrics) {
    return <div className="mt-6 text-gray-600">Loading forgetting metrics…</div>
  }

  return (
    <div className="mt-6 p-4 bg-white shadow rounded text-left">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Forgetting Metrics</h2>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {Object.entries(metrics).map(([key, value]) => (
          <li key={key}>
            <span className="font-medium">{key}:</span> {value}
          </li>
        ))}
      </ul>
    </div>
  )
}