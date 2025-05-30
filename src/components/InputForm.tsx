'use client'

import { useState } from 'react'
import { PredictionResult } from '@/types/prediction'

interface InputFormProps {
  setResult: (data: PredictionResult[]) => void
}

export default function InputForm({ setResult }: InputFormProps) {
  const [smiles, setSmiles] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smiles: [smiles] }),
      })
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await res.json()
      setResult(data.results)
    } catch (err) {
      console.error('Prediction error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={smiles}
        onChange={(e) => setSmiles(e.target.value)}
        placeholder="Enter SMILES string"
        className="w-full text-black px-4 py-2 border rounded shadow-sm"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Predicting...' : 'Predict'}
      </button>
    </form>
  )
}
