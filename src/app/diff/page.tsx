'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import JsonEditor from '@/components/JsonEditor'
import FAQSchema from '@/components/FAQSchema'
import * as Diff from 'diff'

interface DiffLine {
  value: string
  type: 'added' | 'removed' | 'unchanged'
  lineNumber?: { left?: number; right?: number }
}

export default function DiffPage() {
  const [leftInput, setLeftInput] = useState('')
  const [rightInput, setRightInput] = useState('')
  const [diffLines, setDiffLines] = useState<DiffLine[]>([])
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ added: 0, removed: 0, unchanged: 0 })
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('split')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef2 = useRef<HTMLInputElement>(null)

  const faqs = [
    {
      question: 'What is JSON diff?',
      answer: 'JSON diff is the process of comparing two JSON files to identify differences. It shows what was added, removed, or changed between two versions of JSON data.',
    },
    {
      question: 'What\'s the difference between Split and Unified view?',
      answer: 'Split view shows original and modified JSON side-by-side, making it easy to compare. Unified view shows all changes in a single column with + and - markers, similar to git diff.',
    },
    {
      question: 'Is my JSON data secure?',
      answer: 'Yes! All comparison happens entirely in your browser. Your JSON data is never sent to any server. It\'s 100% private and secure.',
    },
  ]

  const compareJson = () => {
    try {
      setError('')
      
      if (!leftInput.trim() || !rightInput.trim()) {
        setError('Please provide both JSON inputs')
        setDiffLines([])
        return
      }

      const leftParsed = JSON.parse(leftInput)
      const rightParsed = JSON.parse(rightInput)

      const leftFormatted = JSON.stringify(leftParsed, null, 2)
      const rightFormatted = JSON.stringify(rightParsed, null, 2)

      const diffResult = Diff.diffLines(leftFormatted, rightFormatted)
      
      const lines: DiffLine[] = []
      let leftLineNum = 1
      let rightLineNum = 1
      let added = 0, removed = 0, unchanged = 0

      diffResult.forEach((part) => {
        const partLines = part.value.split('\n')
        // Remove last empty line if exists
        if (partLines[partLines.length - 1] === '') {
          partLines.pop()
        }

        partLines.forEach((line) => {
          if (part.added) {
            lines.push({
              value: line,
              type: 'added',
              lineNumber: { right: rightLineNum++ }
            })
            added++
          } else if (part.removed) {
            lines.push({
              value: line,
              type: 'removed',
              lineNumber: { left: leftLineNum++ }
            })
            removed++
          } else {
            lines.push({
              value: line,
              type: 'unchanged',
              lineNumber: { left: leftLineNum++, right: rightLineNum++ }
            })
            unchanged++
          }
        })
      })

      setDiffLines(lines)
      setStats({ added, removed, unchanged })
    } catch (err) {
      setError('Error: ' + (err as Error).message)
      setDiffLines([])
      setStats({ added: 0, removed: 0, unchanged: 0 })
    }
  }

  const clearAll = () => {
    setLeftInput('')
    setRightInput('')
    setDiffLines([])
    setError('')
    setStats({ added: 0, removed: 0, unchanged: 0 })
  }

  const loadSamples = () => {
    const leftSample = {
      name: "JSON Tools",
      version: "1.0.0",
      features: ["formatter", "validator"],
      active: true
    }
    const rightSample = {
      name: "JSON Tools",
      version: "2.0.0",
      features: ["formatter", "validator", "converter", "diff"],
      active: true,
      author: "Developer"
    }
    setLeftInput(JSON.stringify(leftSample, null, 2))
    setRightInput(JSON.stringify(rightSample, null, 2))
    setError('')
    setDiffLines([])
  }

  const handleFileUpload = (side: 'left' | 'right') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (side === 'left') {
        setLeftInput(content)
      } else {
        setRightInput(content)
      }
    }
    reader.readAsText(file)
  }

  const swapInputs = () => {
    const temp = leftInput
    setLeftInput(rightInput)
    setRightInput(temp)
    setDiffLines([])
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <FAQSchema faqs={faqs} />
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-slate-900">JSON Tools</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/formatter" className="text-slate-600 hover:text-slate-900 transition">
                Formatter
              </Link>
              <Link href="/validator" className="text-slate-600 hover:text-slate-900 transition">
                Validator
              </Link>
              <Link href="/diff" className="text-primary-600 font-medium">
                Diff
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">JSON Diff & Compare</h1>
          <p className="text-slate-600">Compare two JSON files and visualize differences side-by-side</p>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-3 items-center">
          <button
            onClick={compareJson}
            className="px-4 py-1.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition text-sm"
          >
            Compare
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
          >
            Clear
          </button>
          <button
            onClick={loadSamples}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
          >
            Load Samples
          </button>
          <button
            onClick={swapInputs}
            className="px-4 py-1.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition text-sm"
          >
            Swap
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-slate-600">View:</span>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'split'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-300'
              }`}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode('unified')}
              className={`px-3 py-1 rounded text-sm ${
                viewMode === 'unified'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-300'
              }`}
            >
              Unified
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-mono">{error}</p>
          </div>
        )}

        {/* Stats */}
        {diffLines.length > 0 && (
          <div className="mb-4 flex gap-4 text-sm">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded">
              +{stats.added} added
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded">
              -{stats.removed} removed
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded">
              {stats.unchanged} unchanged
            </span>
          </div>
        )}

        {/* Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Left Input */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-semibold text-slate-700">Original JSON</h3>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload('left')}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Upload File
              </button>
            </div>
            <div className="h-[400px]">
              <JsonEditor
                value={leftInput}
                onChange={setLeftInput}
                language="json"
              />
            </div>
          </div>

          {/* Right Input */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-semibold text-slate-700">Modified JSON</h3>
              <input
                ref={fileInputRef2}
                type="file"
                accept=".json"
                onChange={handleFileUpload('right')}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef2.current?.click()}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Upload File
              </button>
            </div>
            <div className="h-[400px]">
              <JsonEditor
                value={rightInput}
                onChange={setRightInput}
                language="json"
              />
            </div>
          </div>
        </div>

        {/* Diff Output */}
        {diffLines.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200">
              <h3 className="font-semibold text-slate-700">Differences</h3>
            </div>
            
            {viewMode === 'split' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600 w-12">L</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">Original</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600 w-12">R</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600">Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diffLines.map((line, idx) => (
                      <tr key={idx} className={`
                        ${line.type === 'added' ? 'bg-green-50' : ''}
                        ${line.type === 'removed' ? 'bg-red-50' : ''}
                        ${line.type === 'unchanged' ? 'bg-white' : ''}
                        border-b border-slate-100
                      `}>
                        <td className="px-3 py-1 text-xs text-slate-400 font-mono border-r border-slate-200">
                          {line.lineNumber?.left || ''}
                        </td>
                        <td className={`
                          px-3 py-1 font-mono text-sm whitespace-pre
                          ${line.type === 'removed' ? 'text-red-700 bg-red-100' : 'text-slate-700'}
                        `}>
                          {line.type === 'removed' && (
                            <span className="text-red-600 mr-2">-</span>
                          )}
                          {line.type !== 'added' ? line.value : ''}
                        </td>
                        <td className="px-3 py-1 text-xs text-slate-400 font-mono border-r border-slate-200">
                          {line.lineNumber?.right || ''}
                        </td>
                        <td className={`
                          px-3 py-1 font-mono text-sm whitespace-pre
                          ${line.type === 'added' ? 'text-green-700 bg-green-100' : 'text-slate-700'}
                        `}>
                          {line.type === 'added' && (
                            <span className="text-green-600 mr-2">+</span>
                          )}
                          {line.type !== 'removed' ? line.value : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  {diffLines.map((line, idx) => (
                    <div key={idx} className={`
                      flex items-start
                      ${line.type === 'added' ? 'bg-green-50' : ''}
                      ${line.type === 'removed' ? 'bg-red-50' : ''}
                    `}>
                      <span className="w-12 text-right pr-3 text-xs text-slate-400 select-none">
                        {line.lineNumber?.left || line.lineNumber?.right || ''}
                      </span>
                      <span className={`
                        w-6 text-center select-none
                        ${line.type === 'added' ? 'text-green-600' : ''}
                        ${line.type === 'removed' ? 'text-red-600' : ''}
                        ${line.type === 'unchanged' ? 'text-slate-400' : ''}
                      `}>
                        {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                      </span>
                      <span className={`
                        flex-1
                        ${line.type === 'added' ? 'text-green-700' : ''}
                        ${line.type === 'removed' ? 'text-red-700' : ''}
                        ${line.type === 'unchanged' ? 'text-slate-700' : ''}
                      `}>
                        {line.value}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">JSON Diff - Compare JSON Files Side-by-Side</h2>
          <p className="text-slate-600">
            Our free JSON Diff tool helps you compare two JSON files and visualize differences instantly. 
            Perfect for debugging API changes, comparing configuration files, tracking version differences, 
            or reviewing JSON data modifications.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Key Features:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><strong>Split View</strong> - Side-by-side comparison for easy visualization</li>
            <li><strong>Unified View</strong> - Traditional diff format option</li>
            <li><strong>Color-Coded</strong> - Green for additions, red for removals</li>
            <li><strong>Line Numbers</strong> - Precise line-by-line comparison</li>
            <li><strong>File Upload</strong> - Upload JSON files directly</li>
            <li><strong>Swap Inputs</strong> - One-click to swap original and modified</li>
            <li><strong>100% Private</strong> - All processing happens in your browser</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">How to Use JSON Diff:</h3>
          <ol className="list-decimal list-inside text-slate-600 space-y-2">
            <li>Paste original JSON in the left editor or upload a file</li>
            <li>Paste modified JSON in the right editor or upload a file</li>
            <li>Click "Compare" to see the differences</li>
            <li>Toggle between Split and Unified view modes</li>
          </ol>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Use Cases:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li>Compare API responses before and after changes</li>
            <li>Review configuration file modifications</li>
            <li>Track changes in JSON data files</li>
            <li>Debug JSON structure differences</li>
            <li>Version control for JSON documents</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Frequently Asked Questions:</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-slate-800">What is JSON diff?</h4>
              <p className="text-slate-600">
                JSON diff is the process of comparing two JSON files to identify differences. 
                It shows what was added, removed, or changed between two versions of JSON data.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-800">What's the difference between Split and Unified view?</h4>
              <p className="text-slate-600">
                Split view shows original and modified JSON side-by-side, making it easy to compare. 
                Unified view shows all changes in a single column with + and - markers, similar to git diff.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-slate-800">Is my JSON data secure?</h4>
              <p className="text-slate-600">
                Yes! All comparison happens entirely in your browser. Your JSON data is never sent 
                to any server. It's 100% private and secure.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Related Tools:</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-2">
            <li><Link href="/formatter" className="text-primary-600 hover:text-primary-700">JSON Formatter</Link> - Format and beautify JSON</li>
            <li><Link href="/validator" className="text-primary-600 hover:text-primary-700">JSON Validator</Link> - Validate JSON syntax</li>
            <li><Link href="/minifier" className="text-primary-600 hover:text-primary-700">JSON Minifier</Link> - Compress JSON files</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
