'use client'

import { useState } from 'react'
import Link from 'next/link'
import JsonEditor from '@/components/JsonEditor'
import FAQSchema from '@/components/FAQSchema'

export default function ValidatorPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errors, setErrors] = useState<{ line: number; message: string }[]>([])

  const faqs = [
    {
      question: 'What is JSON validation?',
      answer: 'JSON validation checks if your JSON data follows the correct syntax and structure. It identifies errors like missing commas, unquoted keys, or mismatched brackets.',
    },
    {
      question: 'Why validate JSON?',
      answer: 'Invalid JSON can cause application crashes, API failures, and data corruption. Validation helps you catch errors before they cause problems in production.',
    },
    {
      question: 'Is my JSON data secure?',
      answer: 'Yes! All validation happens entirely in your browser using JavaScript. Your JSON data is never sent to any server. It\'s 100% private and secure.',
    },
  ]

  const validateJson = () => {
    if (!input.trim()) {
      setErrors([])
      setIsValid(null)
      return
    }

    try {
      JSON.parse(input)
      setIsValid(true)
      setErrors([])
    } catch (err) {
      setIsValid(false)
      const error = err as Error
      const match = error.message.match(/position (\d+)/)
      
      if (match) {
        const position = parseInt(match[1])
        const lines = input.substring(0, position).split('\n')
        const line = lines.length
        const message = error.message
        setErrors([{ line, message }])
      } else {
        setErrors([{ line: 1, message: error.message }])
      }
    }
  }

  const clearAll = () => {
    setInput('')
    setErrors([])
    setIsValid(null)
  }

  const loadSample = () => {
    // This is intentionally invalid JSON for testing validation
    const invalidJson = `{
  "name": "JSON Validator",
  "version": "1.0.0",
  "invalid_field": "Missing closing quote,
  "active": true
}`
    setInput(invalidJson)
    setErrors([])
    setIsValid(null)
  }

  const loadValidSample = () => {
    const sample = {
      "name": "JSON Validator",
      "version": "1.0.0",
      "features": ["validate", "format", "check"],
      "active": true
    }
    setInput(JSON.stringify(sample, null, 2))
    setErrors([])
    setIsValid(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <FAQSchema faqs={faqs} />
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-3xl">{ }</span>
              <span className="text-2xl font-bold text-slate-900">JSON Tools</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/formatter" className="text-slate-600 hover:text-slate-900 transition">
                Formatter
              </Link>
              <Link href="/validator" className="text-primary-600 font-medium">
                Validator
              </Link>
              <Link href="/diff" className="text-slate-600 hover:text-slate-900 transition">
                Diff
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">JSON Validator</h1>
          <p className="text-slate-600">Validate your JSON and find errors instantly</p>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-3 items-center">
          <button
            onClick={validateJson}
            className="px-4 py-1.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition text-sm"
          >
            Validate
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
          >
            Clear
          </button>
          <button
            onClick={loadValidSample}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
          >
            Load Valid JSON
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
          >
            Load Invalid JSON
          </button>
        </div>

        {/* Validation Result */}
        {isValid !== null && (
          <div className={`mb-4 p-4 rounded-lg ${isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{isValid ? '✅' : '❌'}</span>
              <p className={`font-semibold ${isValid ? 'text-green-700' : 'text-red-700'}`}>
                {isValid ? 'Valid JSON!' : 'Invalid JSON'}
              </p>
            </div>
            {errors.length > 0 && (
              <div className="mt-2">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-700 text-sm font-mono">
                    Line {error.line}: {error.message}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Editor */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
            <h3 className="font-semibold text-slate-700">JSON Input</h3>
          </div>
          <div className="h-[500px]">
            <JsonEditor
              value={input}
              onChange={setInput}
              language="json"
            />
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">JSON Validator - Validate JSON Online Free</h2>
          <p className="text-slate-600">
            Our free JSON Validator tool helps you validate JSON data instantly. Check if your JSON is valid, 
            find syntax errors, and get detailed error messages with line numbers. Perfect for debugging API 
            responses, configuration files, and data exchange formats.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Key Features:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><strong>Instant Validation</strong> - Validate JSON in real-time as you type</li>
            <li><strong>Detailed Errors</strong> - Get specific error messages with line numbers</li>
            <li><strong>Sample Testing</strong> - Load valid or invalid JSON samples to test</li>
            <li><strong>100% Private</strong> - All validation happens in your browser</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">How to Use JSON Validator:</h3>
          <ol className="list-decimal list-inside text-slate-600 space-y-2">
            <li>Paste your JSON data into the editor</li>
            <li>Click "Validate" to check for errors</li>
            <li>Review any error messages with line numbers</li>
            <li>Fix the errors and validate again</li>
          </ol>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Common JSON Errors:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Missing commas between properties</li>
            <li>Unquoted property names</li>
            <li>Trailing commas in arrays or objects</li>
            <li>Mismatched brackets or braces</li>
            <li>Invalid escape sequences in strings</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Why Validate JSON?</h3>
          <p className="text-slate-600">
            JSON validation is crucial when working with APIs, configuration files, or data exchange. 
            Invalid JSON can cause application crashes, API failures, and data corruption. Our validator 
            helps you catch errors before they cause problems in production.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Related Tools:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><Link href="/formatter" className="text-primary-600 hover:text-primary-700">JSON Formatter</Link> - Format and beautify JSON</li>
            <li><Link href="/minifier" className="text-primary-600 hover:text-primary-700">JSON Minifier</Link> - Compress JSON files</li>
            <li><Link href="/diff" className="text-primary-600 hover:text-primary-700">JSON Diff</Link> - Compare two JSON files</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
