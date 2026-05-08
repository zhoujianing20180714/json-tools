'use client'

import { useState } from 'react'
import Link from 'next/link'
import JsonEditor from '@/components/JsonEditor'
import FAQSchema from '@/components/FAQSchema'
import yaml from 'js-yaml'

export default function JsonToYamlPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const faqs = [
    {
      question: 'What is YAML?',
      answer: 'YAML is a human-readable data serialization language designed to be easily read and written by humans. It uses indentation and minimal punctuation, making it cleaner than JSON for configuration files.',
    },
    {
      question: 'Is my JSON data secure?',
      answer: 'Yes! All conversion happens entirely in your browser using JavaScript. Your JSON data is never sent to any server. It\'s 100% private and secure.',
    },
    {
      question: 'Can I convert complex nested JSON?',
      answer: 'Yes! Our converter handles complex nested JSON structures, arrays, and objects. The resulting YAML will maintain the same structure with proper indentation.',
    },
  ]

  const convertToYaml = () => {
    try {
      setError('')
      if (!input.trim()) {
        setOutput('')
        return
      }
      const parsed = JSON.parse(input)
      const yamlStr = yaml.dump(parsed, {
        indent: 2,
        lineWidth: -1,
        noRefs: true,
      })
      setOutput(yamlStr)
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

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const loadSample = () => {
    const sample = {
      server: {
        host: "localhost",
        port: 3000,
        environment: "development"
      },
      database: {
        type: "postgresql",
        host: "db.example.com",
        port: 5432,
        name: "mydb"
      },
      features: ["auth", "logging", "caching"]
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">JSON to YAML Converter</h1>
          <p className="text-slate-600">Convert JSON to YAML format instantly</p>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-3 items-center">
          <button
            onClick={convertToYaml}
            className="px-4 py-1.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition text-sm"
          >
            Convert to YAML
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!output}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Copy YAML
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

          {/* Output */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-700">YAML Output</h3>
            </div>
            <div className="h-[500px]">
              <JsonEditor
                value={output}
                onChange={() => {}}
                language="yaml"
                readOnly={true}
              />
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">JSON to YAML Converter - Transform JSON to YAML Online</h2>
          <p className="text-slate-600">
            Our free JSON to YAML converter transforms JSON data into clean, human-readable YAML format instantly. 
            Perfect for developers working with configuration files, DevOps engineers managing Kubernetes manifests, 
            or anyone who needs to convert JSON to YAML for better readability.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Key Features:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><strong>Instant Conversion</strong> - Convert JSON to YAML with one click</li>
            <li><strong>Proper Formatting</strong> - Clean YAML output with proper indentation</li>
            <li><strong>Copy to Clipboard</strong> - One-click copy of converted YAML</li>
            <li><strong>Sample Data</strong> - Load sample JSON to test the converter</li>
            <li><strong>100% Private</strong> - All conversion happens in your browser</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">How to Use JSON to YAML Converter:</h3>
          <ol className="list-decimal list-inside text-slate-600 space-y-2">
            <li>Paste your JSON data into the input editor</li>
            <li>Click "Convert to YAML" button</li>
            <li>Copy the YAML output or use it in your configuration files</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Use Cases:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Convert API responses to YAML configuration files</li>
            <li>Transform JSON config to YAML for Kubernetes, Docker Compose, Ansible</li>
            <li>Create human-readable configuration from JSON data</li>
            <li>Convert JSON to YAML for CI/CD pipeline configurations</li>
            <li>Migrate JSON-based configs to YAML format</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Why Convert JSON to YAML?</h3>
          <p className="text-slate-600">
            YAML (YAML Ain't Markup Language) is a human-friendly data serialization format that's easier to read 
            and write than JSON. It's widely used for configuration files in modern development tools like Kubernetes, 
            Docker Compose, Ansible, and CI/CD pipelines. Converting JSON to YAML makes configuration files more 
            maintainable and easier for humans to understand.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Frequently Asked Questions:</h3>
          
          <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">What is YAML?</h4>
          <p className="text-slate-600">
            YAML is a human-readable data serialization language designed to be easily read and written by humans. 
            It uses indentation and minimal punctuation, making it cleaner than JSON for configuration files.
          </p>
          
          <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Is my JSON data secure?</h4>
          <p className="text-slate-600">
            Yes! All conversion happens entirely in your browser using JavaScript. Your JSON data is never sent 
            to any server. It's 100% private and secure.
          </p>
          
          <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Can I convert complex nested JSON?</h4>
          <p className="text-slate-600">
            Yes! Our converter handles complex nested JSON structures, arrays, and objects. The resulting YAML 
            will maintain the same structure with proper indentation.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Related Tools:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><Link href="/formatter" className="text-primary-600 hover:text-primary-700">JSON Formatter</Link> - Format and beautify JSON</li>
            <li><Link href="/validator" className="text-primary-600 hover:text-primary-700">JSON Validator</Link> - Validate JSON syntax</li>
            <li><Link href="/json-to-csv" className="text-primary-600 hover:text-primary-700">JSON to CSV</Link> - Convert JSON to CSV format</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
