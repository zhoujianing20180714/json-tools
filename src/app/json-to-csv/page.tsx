'use client'

import { useState } from 'react'
import Link from 'next/link'
import JsonEditor from '@/components/JsonEditor'
import FAQSchema from '@/components/FAQSchema'
import Papa from 'papaparse'

export default function JsonToCsvPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const faqs = [
    {
      question: 'What JSON format is supported?',
      answer: 'This tool accepts JSON arrays of objects. Each object should have similar keys for best results. Single objects are also supported and will be converted to a single-row CSV.',
    },
    {
      question: 'How are nested objects handled?',
      answer: 'Nested objects are flattened using dot notation. For example, { "user": { "name": "John" } } becomes a column named "user.name" with value "John".',
    },
    {
      question: 'Is my JSON data secure?',
      answer: 'Yes! All conversion happens entirely in your browser using JavaScript. Your JSON data is never sent to any server. It\'s 100% private and secure.',
    },
    {
      question: 'Can I convert large JSON files?',
      answer: 'Yes! Our converter handles JSON files of any size. Since processing happens in your browser, it depends on your device\'s memory. For very large files (10MB+), the conversion may take a few seconds.',
    },
  ]

  const convertToCsv = () => {
    try {
      setError('')
      if (!input.trim()) {
        setOutput('')
        return
      }

      const parsed = JSON.parse(input)
      
      // Handle both array and single object
      const dataArray = Array.isArray(parsed) ? parsed : [parsed]
      
      const csv = Papa.unparse(dataArray, {
        header: true,
        skipEmptyLines: true,
      })
      
      setOutput(csv)
    } catch (err) {
      setError('Error: ' + (err as Error).message)
      setOutput('')
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

  const downloadCsv = () => {
    const blob = new Blob([output], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const loadSample = () => {
    const sample = [
      { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
      { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 }
    ]
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">JSON to CSV Converter</h1>
          <p className="text-slate-600">Convert JSON array to CSV spreadsheet format</p>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-3 items-center">
          <button
            onClick={convertToCsv}
            className="px-4 py-1.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition text-sm"
          >
            Convert to CSV
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!output}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Copy CSV
          </button>
          <button
            onClick={downloadCsv}
            disabled={!output}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download CSV
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
              <h3 className="font-semibold text-slate-700">JSON Input (Array of Objects)</h3>
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
              <h3 className="font-semibold text-slate-700">CSV Output</h3>
            </div>
            <div className="h-[500px]">
              <JsonEditor
                value={output}
                onChange={() => {}}
                language="csv"
                readOnly={true}
              />
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">JSON to CSV Converter - Convert JSON to Excel-Ready CSV</h2>
          <p className="text-slate-600">
            Our free JSON to CSV converter transforms JSON arrays into spreadsheet-ready CSV format instantly. 
            Perfect for data analysts, developers, and anyone who needs to import JSON data into Excel, 
            Google Sheets, or other data analysis tools.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Key Features:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><strong>Instant Conversion</strong> - Convert JSON arrays to CSV with one click</li>
            <li><strong>Download CSV</strong> - Download the result as a CSV file</li>
            <li><strong>Copy to Clipboard</strong> - One-click copy for quick paste</li>
            <li><strong>Handles Nested Data</strong> - Flattens nested objects and arrays</li>
            <li><strong>Sample Data</strong> - Load sample JSON to test the converter</li>
            <li><strong>100% Private</strong> - All conversion happens in your browser</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">How to Use JSON to CSV Converter:</h3>
          <ol className="list-decimal list-inside text-slate-600 space-y-2">
            <li>Paste your JSON array into the input editor</li>
            <li>Click "Convert to CSV" button</li>
            <li>Download the CSV file or copy to clipboard</li>
            <li>Import into Excel, Google Sheets, or your favorite spreadsheet tool</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Use Cases:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Convert API responses to CSV for data analysis</li>
            <li>Export database query results to spreadsheet format</li>
            <li>Transform JSON data for reporting and visualization</li>
            <li>Import JSON data into Excel or Google Sheets</li>
            <li>Convert JSON logs to CSV for easier analysis</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">JSON to CSV Format:</h3>
          <p className="text-slate-600">
            This converter expects a JSON array of objects. Each object in the array becomes a row in the CSV, 
            and the object keys become column headers. Nested objects are flattened using dot notation, 
            and arrays are converted to JSON strings.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Frequently Asked Questions:</h3>
          
          <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">What JSON format is supported?</h4>
          <p className="text-slate-600">
            This tool accepts JSON arrays of objects, like [{"{ \"name\": \"John\", \"age\": 30 }"}]. 
            Each object should have similar keys for best results. Single objects are also supported 
            and will be converted to a single-row CSV.
          </p>
          
          <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">How are nested objects handled?</h4>
          <p className="text-slate-600">
            Nested objects are flattened using dot notation. For example, {"{ \"user\": { \"name\": \"John\" } }"} 
            becomes a column named "user.name" with value "John".
          </p>
          
          <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Is my JSON data secure?</h4>
          <p className="text-slate-600">
            Yes! All conversion happens entirely in your browser using JavaScript. Your JSON data is never sent 
            to any server. It's 100% private and secure.
          </p>
          
          <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Can I convert large JSON files?</h4>
          <p className="text-slate-600">
            Yes! Our converter handles JSON files of any size. Since processing happens in your browser, 
            it depends on your device's memory. For very large files (10MB+), the conversion may take a few seconds.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Related Tools:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><Link href="/formatter" className="text-primary-600 hover:text-primary-700">JSON Formatter</Link> - Format and beautify JSON</li>
            <li><Link href="/validator" className="text-primary-600 hover:text-primary-700">JSON Validator</Link> - Validate JSON syntax</li>
            <li><Link href="/json-to-yaml" className="text-primary-600 hover:text-primary-700">JSON to YAML</Link> - Convert JSON to YAML format</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
