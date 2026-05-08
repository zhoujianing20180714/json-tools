'use client'

import { useState } from 'react'
import Link from 'next/link'
import JsonEditor from '@/components/JsonEditor'
import FAQSchema from '@/components/FAQSchema'

export default function MinifierPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 })

  const faqs = [
    {
      question: 'What is JSON minification?',
      answer: 'JSON minification removes all unnecessary whitespace, line breaks, and indentation from JSON data while preserving its structure and content. The result is a single-line JSON string that\'s smaller in size but functionally identical.',
    },
    {
      question: 'How much size can I save?',
      answer: 'Typically 30-60% depending on the original formatting. JSON with lots of whitespace and indentation will see higher savings. Our tool shows you the exact bytes saved and percentage reduction.',
    },
    {
      question: 'Is minified JSON still valid?',
      answer: 'Yes! Minified JSON is 100% valid JSON. It contains the exact same data and structure, just without the whitespace. All JSON parsers can read minified JSON without any issues.',
    },
    {
      question: 'Is my JSON data secure?',
      answer: 'Yes! All minification happens entirely in your browser using JavaScript. Your JSON data is never sent to any server. It\'s 100% private and secure.',
    },
  ]

  const minifyJson = () => {
    try {
      setError('')
      if (!input.trim()) {
        setOutput('')
        setStats({ original: 0, minified: 0, saved: 0 })
        return
      }
      
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      
      const originalSize = new Blob([input]).size
      const minifiedSize = new Blob([minified]).size
      const saved = originalSize - minifiedSize
      
      setOutput(minified)
      setStats({
        original: originalSize,
        minified: minifiedSize,
        saved: saved
      })
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message)
      setOutput('')
      setStats({ original: 0, minified: 0, saved: 0 })
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      alert('Copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
    setStats({ original: 0, minified: 0, saved: 0 })
  }

  const loadSample = () => {
    const sample = {
      "name": "JSON Minifier",
      "description": "This is a sample JSON object with extra whitespace and formatting",
      "version": "1.0.0",
      "features": [
        "minify",
        "compress",
        "optimize"
      ],
      "author": {
        "name": "Developer",
        "email": "dev@example.com"
      },
      "active": true
    }
    setInput(JSON.stringify(sample, null, 2))
    setError('')
    setStats({ original: 0, minified: 0, saved: 0 })
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
              <Link href="/validator" className="text-slate-600 hover:text-slate-900 transition">
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">JSON Minifier</h1>
          <p className="text-slate-600">Minify JSON to reduce file size and improve performance</p>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-3 items-center">
          <button
            onClick={minifyJson}
            className="px-4 py-1.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition text-sm"
          >
            Minify
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!output}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Copy Minified
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
          >
            Clear
          </button>
          <button
            onClick={loadSample}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
          >
            Load Sample
          </button>
        </div>

        {/* Stats */}
        {stats.original > 0 && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-slate-600">Original Size</p>
                <p className="text-2xl font-bold text-slate-900">{stats.original} bytes</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Minified Size</p>
                <p className="text-2xl font-bold text-slate-900">{stats.minified} bytes</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Saved</p>
                <p className="text-2xl font-bold text-green-600">{stats.saved} bytes ({Math.round((stats.saved / stats.original) * 100)}%)</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-mono">{error}</p>
          </div>
        )}

        {/* Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-700">Input JSON</h3>
            </div>
            <div className="h-[500px]">
              <JsonEditor
                value={input}
                onChange={setInput}
                language="json"
              />
            </div>
          </div>

          {/* Output */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-700">Minified Output</h3>
            </div>
            <div className="h-[500px]">
              <JsonEditor
                value={output}
                onChange={() => {}}
                language="json"
                readOnly={true}
              />
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">JSON Minifier - Compress JSON & Reduce File Size</h2>
          <p className="text-slate-600">
            Our free JSON Minifier compresses JSON data by removing unnecessary whitespace, line breaks, 
            and indentation. Reduce file size by up to 50% for faster API responses, lower bandwidth costs, 
            and better production performance.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Key Features:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><strong>Instant Minification</strong> - Compress JSON with one click</li>
            <li><strong>Size Statistics</strong> - See original size, minified size, and bytes saved</li>
            <li><strong>Percentage Saved</strong> - Know exactly how much space you saved</li>
            <li><strong>Copy to Clipboard</strong> - One-click copy of minified JSON</li>
            <li><strong>Sample Data</strong> - Load sample JSON to test the minifier</li>
            <li><strong>100% Private</strong> - All processing happens in your browser</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">How to Use JSON Minifier:</h3>
          <ol className="list-decimal list-inside text-slate-600 space-y-2">
            <li>Paste your formatted JSON into the input editor</li>
            <li>Click "Minify" button to compress</li>
            <li>See the size reduction statistics</li>
            <li>Copy the minified JSON for production use</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Why Minify JSON?</h3>
          <p className="text-slate-600">
            JSON minification removes all unnecessary whitespace, line breaks, and indentation from your JSON data. 
            This reduces file size significantly (often 30-60%), which leads to faster API responses, lower bandwidth 
            costs, and better user experience. Minified JSON is essential for production environments where every 
            byte counts.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Use Cases:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Optimize API responses for production</li>
            <li>Reduce bandwidth costs for high-traffic applications</li>
            <li>Minify configuration files for deployment</li>
            <li>Compress JSON data for storage</li>
            <li>Prepare JSON for embedded systems with limited memory</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">When to Use Minified vs Formatted JSON:</h3>
          <p className="text-slate-600">
            Use <strong>minified JSON</strong> for production APIs, deployed applications, and any scenario where 
            file size matters. Use <strong>formatted JSON</strong> during development, debugging, and when you 
            need to read or edit the data manually.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Frequently Asked Questions:</h3>
          
          <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">What is JSON minification?</h4>
          <p className="text-slate-600">
            JSON minification removes all unnecessary whitespace, line breaks, and indentation from JSON data 
            while preserving its structure and content. The result is a single-line JSON string that's smaller 
            in size but functionally identical.
          </p>
          
          <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">How much size can I save?</h4>
          <p className="text-slate-600">
            Typically 30-60% depending on the original formatting. JSON with lots of whitespace and indentation 
            will see higher savings. Our tool shows you the exact bytes saved and percentage reduction.
          </p>
          
          <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Is minified JSON still valid?</h4>
          <p className="text-slate-600">
            Yes! Minified JSON is 100% valid JSON. It contains the exact same data and structure, just without 
            the whitespace. All JSON parsers can read minified JSON without any issues.
          </p>
          
          <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Is my JSON data secure?</h4>
          <p className="text-slate-600">
            Yes! All minification happens entirely in your browser using JavaScript. Your JSON data is never sent 
            to any server. It's 100% private and secure.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Related Tools:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><Link href="/formatter" className="text-primary-600 hover:text-primary-700">JSON Formatter</Link> - Format and beautify JSON</li>
            <li><Link href="/validator" className="text-primary-600 hover:text-primary-700">JSON Validator</Link> - Validate JSON syntax</li>
            <li><Link href="/diff" className="text-primary-600 hover:text-primary-700">JSON Diff</Link> - Compare two JSON files</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
