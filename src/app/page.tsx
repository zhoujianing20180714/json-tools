import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JSON Tools - Free JSON Formatter, Validator & Converter Online',
  description: 'Free online JSON tools: formatter, validator, converter to YAML/CSV, diff checker, and minifier. Fast, modern, and developer-friendly. No signup required. 100% client-side processing.',
  keywords: 'json formatter, json validator, json converter, json to yaml, json to csv, json diff, json minifier, online json tools, json beautifier, format json online',
  openGraph: {
    title: 'JSON Tools - Free JSON Formatter, Validator & Converter',
    description: 'Free online JSON tools for developers. Format, validate, and convert JSON instantly. No signup required.',
    url: 'https://jsontools.io',
  },
}

const tools = [
  {
    title: 'JSON Formatter',
    description: 'Format and beautify your JSON with proper indentation',
    href: '/formatter',
    icon: '📝',
  },
  {
    title: 'JSON Validator',
    description: 'Validate your JSON and find errors instantly',
    href: '/validator',
    icon: '✅',
  },
  {
    title: 'JSON to YAML',
    description: 'Convert JSON to YAML format',
    href: '/json-to-yaml',
    icon: '📄',
  },
  {
    title: 'JSON to CSV',
    description: 'Convert JSON to CSV spreadsheet format',
    href: '/json-to-csv',
    icon: '📊',
  },
  {
    title: 'JSON Diff',
    description: 'Compare two JSON files and find differences',
    href: '/diff',
    icon: '🔍',
  },
  {
    title: 'JSON Minifier',
    description: 'Minify JSON to reduce file size',
    href: '/minifier',
    icon: '📦',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Free JSON Tools for Developers
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Format, validate, convert, and compare JSON instantly. 
            Fast, modern, and completely free. No signup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/formatter"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-600/30"
            >
              Start Formatting
            </Link>
            <Link
              href="/validator"
              className="px-8 py-3 bg-white text-slate-900 border-2 border-slate-300 rounded-lg font-semibold hover:border-slate-400 transition"
            >
              Validate JSON
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          All Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-primary-500 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition">
                {tool.title}
              </h3>
              <p className="text-slate-600">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why Choose JSON Tools?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Lightning Fast</h3>
            <p className="text-slate-600">Process JSON instantly in your browser. No server uploads needed.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">100% Private</h3>
            <p className="text-slate-600">Your data never leaves your browser. Completely secure.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Always Free</h3>
            <p className="text-slate-600">No signup, no limits, no ads. Just free tools forever.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 text-sm">
              © 2026 JSON Tools. Free tools for developers.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/about" className="text-slate-600 hover:text-slate-900 text-sm">
                About
              </Link>
              <Link href="/privacy" className="text-slate-600 hover:text-slate-900 text-sm">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
