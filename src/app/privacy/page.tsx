import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - JSON Tools',
  description: 'JSON Tools privacy policy. We don\'t track, collect, or store your data. All processing happens in your browser.',
}

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-8">
            Last updated: January 2026
          </p>

          <div className="p-6 bg-green-50 rounded-lg border border-green-200 mb-8">
            <h2 className="text-lg font-semibold text-green-900 mb-2">🔒 TL;DR</h2>
            <p className="text-green-800">
              We don't track you. We don't collect your data. We don't use cookies. 
              All JSON processing happens entirely in your browser. Your data never leaves your device.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Data Collection</h2>
          <p className="text-slate-600">
            <strong>We do not collect, store, or transmit any of your JSON data.</strong> 
            All processing happens locally in your web browser using JavaScript. 
            Your JSON data never leaves your computer.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">How Our Tools Work</h2>
          <ul className="list-disc list-inside text-slate-600 space-y-3">
            <li>All JSON formatting, validation, conversion, and comparison happens in your browser</li>
            <li>No data is sent to any server for processing</li>
            <li>When you close the tab, your data is gone</li>
            <li>We have no backend, no database, and no way to access your data</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Analytics & Tracking</h2>
          <p className="text-slate-600">
            We may use basic analytics (like Google Analytics) to understand how people use our site, 
            such as which tools are most popular. These analytics:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 mt-4">
            <li>Only track page views and basic usage patterns</li>
            <li>Never track or capture your JSON data</li>
            <li>Never track personally identifiable information</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Cookies</h2>
          <p className="text-slate-600">
            We do not use cookies to track you. We may use essential cookies for:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 mt-4">
            <li>Remembering your preferences (like indentation settings)</li>
            <li>Basic site functionality</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Third-Party Services</h2>
          <p className="text-slate-600">
            We may use the following third-party services:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 mt-4">
            <li><strong>Google Analytics</strong> - For understanding site usage (optional)</li>
            <li><strong>Google AdSense</strong> - For displaying advertisements</li>
          </ul>
          <p className="text-slate-600 mt-4">
            These services have their own privacy policies and may collect data according to their terms.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Security</h2>
          <p className="text-slate-600">
            Since all processing happens in your browser, your data is as secure as your device. 
            We use HTTPS to ensure secure delivery of our website. We recommend:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-2 mt-4">
            <li>Using a modern, up-to-date browser</li>
            <li>Not sharing sensitive JSON data on shared or public computers</li>
            <li>Clearing your browser data if you're concerned about local storage</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Children's Privacy</h2>
          <p className="text-slate-600">
            Our service is not directed to children under 13. We do not knowingly collect any 
            information from children under 13.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Changes to This Policy</h2>
          <p className="text-slate-600">
            We may update this privacy policy from time to time. We will notify users of any 
            material changes by posting the new policy on this page with an updated "Last updated" date.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Your Rights</h2>
          <p className="text-slate-600">
            Since we don't collect or store your data, there's no data to access, delete, or transfer. 
            Your data stays on your device and under your control.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-slate-600">
            If you have questions about this privacy policy, please contact us:
          </p>
          <p className="text-slate-600 mt-4">
            Email: <a href="mailto:privacy@freejsontools.com" className="text-blue-600 hover:text-blue-700">privacy@freejsontools.com</a>
          </p>

          <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Our Commitment</h3>
            <p className="text-slate-600">
              We built JSON Tools because we believe developer tools should be free, fast, and private. 
              Your trust is important to us, and we're committed to maintaining your privacy.
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
