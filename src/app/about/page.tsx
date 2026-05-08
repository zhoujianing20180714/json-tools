import Link from 'next/link'
import Script from 'next/script'

export const metadata = {
  title: 'About JSON Tools - Free Online JSON Tools for Developers',
  description: 'Learn about JSON Tools - a free, privacy-focused suite of online JSON tools for developers. Format, validate, convert, and compare JSON instantly.',
}

export default function AboutPage() {
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">About JSON Tools</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-8">
            JSON Tools is a free, privacy-focused suite of online tools for developers working with JSON data.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-slate-600">
            We believe that essential developer tools should be free, fast, and private. 
            JSON Tools was created to provide a simple, no-nonsense way to work with JSON data 
            without the hassle of sign-ups, subscriptions, or privacy concerns.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Why JSON Tools?</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-3">
            <li><strong>100% Client-Side</strong> - All processing happens in your browser. Your data never leaves your device.</li>
            <li><strong>No Sign-Up Required</strong> - Start using the tools immediately. No accounts, no emails, no passwords.</li>
            <li><strong>Fast & Modern</strong> - Built with Next.js and Monaco Editor for a smooth, responsive experience.</li>
            <li><strong>Completely Free</strong> - No premium tiers, no hidden costs, no usage limits.</li>
            <li><strong>Privacy First</strong> - We don't track, collect, or store any of your data.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Available Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">📝 JSON Formatter</h3>
              <p className="text-slate-600 text-sm">Beautify JSON with proper indentation and formatting.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">✅ JSON Validator</h3>
              <p className="text-slate-600 text-sm">Validate JSON and find syntax errors with line numbers.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">📄 JSON to YAML</h3>
              <p className="text-slate-600 text-sm">Convert JSON to human-readable YAML format.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">📊 JSON to CSV</h3>
              <p className="text-slate-600 text-sm">Convert JSON arrays to CSV spreadsheet format.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">🔍 JSON Diff</h3>
              <p className="text-slate-600 text-sm">Compare two JSON files with visual diff highlighting.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">📦 JSON Minifier</h3>
              <p className="text-slate-600 text-sm">Compress JSON by removing whitespace.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Technology Stack</h2>
          <p className="text-slate-600">
            JSON Tools is built with modern web technologies:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 mt-4">
            <li><strong>Next.js 14</strong> - React framework for fast, optimized web applications</li>
            <li><strong>TypeScript</strong> - Type-safe JavaScript for reliability</li>
            <li><strong>Tailwind CSS</strong> - Utility-first CSS for rapid UI development</li>
            <li><strong>Monaco Editor</strong> - The same editor that powers VS Code</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Open Source</h2>
          <p className="text-slate-600">
            JSON Tools is developed as an independent project. We believe in transparency and 
            welcome feedback from the developer community.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Contact</h2>
          <p className="text-slate-600">
            Have suggestions, found a bug, or want to say hi? We'd love to hear from you!
          </p>
          <p className="text-slate-600 mt-4">
            Email: <a href="mailto:contact@jsontools.io" className="text-blue-600 hover:text-blue-700">contact@jsontools.io</a>
          </p>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Fun Fact</h3>
            <p className="text-blue-800">
              The entire site is static HTML, CSS, and JavaScript. There's no backend server, 
              no database, and no API calls. Everything runs in your browser, which means 
              it's fast, secure, and can work offline once loaded!
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 text-sm">© 2026 JSON Tools. Free tools for developers.</p>
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
