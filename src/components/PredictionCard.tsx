'use client'
import React from 'react'
import { PredictionResult } from '@/types/prediction'

interface PredictionCardProps {
  result: PredictionResult
}

const PredictionCard: React.FC<PredictionCardProps> = ({ result }) => {
  return (
    <div className="mt-4 p-4 bg-white shadow rounded text-left">
      {Object.entries(result).map(([key, val]) => (
        <div
          key={key}
          className="flex justify-between py-1 border-b last:border-0"
        >
          <span className="font-medium text-gray-800">{key}:</span>
          <span className="text-gray-600">{String(val)}</span>
        </div>
      ))}
    </div>
  )
}

export default PredictionCard