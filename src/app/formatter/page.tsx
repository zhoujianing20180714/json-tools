'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import JsonEditor from '@/components/JsonEditor'
import FAQSchema from '@/components/FAQSchema'

export default function FormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indentSize, setIndentSize] = useState(2)
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const faqs = [
    {
      question: 'What is JSON formatting?',
      answer: 'JSON formatting (or beautification) is the process of adding indentation, line breaks, and proper spacing to JSON data to make it more readable for humans.',
    },
    {
      question: 'Is my JSON data secure?',
      answer: 'Yes! All processing happens entirely in your browser using JavaScript. Your JSON data is never sent to any server. It\'s 100% private and secure.',
    },
    {
      question: 'What\'s the difference between formatting and minifying?',
      answer: 'Formatting adds whitespace for readability, while minifying removes all unnecessary whitespace to reduce file size. Use formatting for development and debugging, and minification for production to reduce bandwidth.',
    },
    {
      question: 'Can I format large JSON files?',
      answer: 'Yes! Our tool can handle JSON files of any size. Since processing happens in your browser, it depends on your device\'s memory. For very large files (10MB+), we recommend using a desktop JSON editor.',
    },
  ]

  const formatJson = () => {
    try {
      setError('')
      if (!input.trim()) {
        setOutput('')
        return
      }
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message)
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      setError('')
      if (!input.trim()) {
        setOutput('')
        return
      }
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message)
      setOutput('')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setInput(content)
      setError('')
    }
    reader.readAsText(file)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const loadSample = () => {
    const sample = {
      name: "JSON Tools",
      version: "1.0.0",
      features: ["formatter", "validator", "converter"],
      author: {
        name: "Developer",
        email: "dev@example.com"
      },
      active: true,
      count: 42
    }
    setInput(JSON.stringify(sample, null, 2))
    setError('')
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
              <Link href="/formatter" className="text-primary-600 font-medium">
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">JSON Formatter</h1>
          <p className="text-slate-600">Format and beautify your JSON with proper indentation</p>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="indent" className="text-sm text-slate-600">Indent:</label>
            <select
              id="indent"
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>Tab</option>
            </select>
          </div>
          <button
            onClick={formatJson}
            className="px-4 py-1.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition text-sm"
          >
            Format
          </button>
          <button
            onClick={minifyJson}
            className="px-4 py-1.5 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition text-sm"
          >
            Minify
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!output}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? '✓ Copied!' : 'Copy Output'}
          </button>
          <button
            onClick={downloadOutput}
            disabled={!output}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download
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
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
          >
            Upload File
          </button>
        </div>

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
              <h3 className="font-semibold text-slate-700">Formatted Output</h3>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-4">JSON Formatter - Beautify & Format JSON Online</h2>
          <p className="text-slate-600">
            Our free JSON Formatter tool helps you beautify and format JSON data with proper indentation. 
            Whether you need to make minified JSON readable or format JSON for better code readability, 
            this tool makes it easy. Perfect for developers, data analysts, and anyone working with JSON data.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Key Features:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><strong>Instant Formatting</strong> - Format JSON with customizable indentation (2 spaces, 4 spaces, or tabs)</li>
            <li><strong>JSON Minification</strong> - Reduce JSON file size by removing unnecessary whitespace</li>
            <li><strong>Copy & Download</strong> - One-click copy to clipboard or download as JSON file</li>
            <li><strong>File Upload</strong> - Upload JSON files directly from your computer</li>
            <li><strong>Real-time Validation</strong> - Instant error detection with detailed error messages</li>
            <li><strong>100% Private</strong> - All processing happens in your browser, data never leaves your device</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">How to Use JSON Formatter:</h3>
          <ol className="list-decimal list-inside text-slate-600 space-y-2">
            <li>Paste your JSON data into the input editor, or click "Upload File" to load a JSON file</li>
            <li>Select your preferred indentation (2 spaces, 4 spaces, or tab)</li>
            <li>Click "Format" to beautify your JSON or "Minify" to compress it</li>
            <li>Copy the result to clipboard or download it as a file</li>
          </ol>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Why Format JSON?</h3>
          <p className="text-slate-600">
            JSON formatting is essential for code readability and debugging. Minified JSON from APIs 
            can be hard to read and understand. Our formatter adds proper indentation and line breaks, 
            making it easy to identify structure, nested objects, and arrays. This is especially useful 
            when working with configuration files, API responses, or data exchange formats.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Frequently Asked Questions:</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-slate-800">What is JSON formatting?</h4>
              <p className="text-slate-600">
                JSON formatting (or beautification) is the process of adding indentation, line breaks, 
                and proper spacing to JSON data to make it more readable for humans.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-800">Is my JSON data secure?</h4>
              <p className="text-slate-600">
                Yes! All processing happens entirely in your browser using JavaScript. Your JSON data 
                is never sent to any server. It's 100% private and secure.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-800">What's the difference between formatting and minifying?</h4>
              <p className="text-slate-600">
                Formatting adds whitespace for readability, while minifying removes all unnecessary 
                whitespace to reduce file size. Use formatting for development and debugging, 
                and minification for production to reduce bandwidth.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-800">Can I format large JSON files?</h4>
              <p className="text-slate-600">
                Yes! Our tool can handle JSON files of any size. Since processing happens in your browser, 
                it depends on your device's memory. For very large files (10MB+), we recommend using a 
                desktop JSON editor.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Related Tools:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><Link href="/validator" className="text-primary-600 hover:text-primary-700">JSON Validator</Link> - Validate your JSON and find errors</li>
            <li><Link href="/minifier" className="text-primary-600 hover:text-primary-700">JSON Minifier</Link> - Compress JSON to reduce file size</li>
            <li><Link href="/json-to-yaml" className="text-primary-600 hover:text-primary-700">JSON to YAML</Link> - Convert JSON to YAML format</li>
            <li><Link href="/json-to-csv" className="text-primary-600 hover:text-primary-700">JSON to CSV</Link> - Convert JSON arrays to CSV</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
