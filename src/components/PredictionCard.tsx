import React from 'react'
import { PredictionResult } from '@/types/prediction'

interface PredictionCardProps {
  result: PredictionResult
}

const PredictionCard: React.FC<PredictionCardProps> = ({ result }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">{result.property}</h3>
      <p className="text-2xl font-bold text-blue-600 mt-2">{result.value}</p>
      <p className="text-sm text-gray-500 mt-1">Confidence: {result.confidence}</p>
    </div>
  )
}

export default PredictionCard