import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'JSON Tools - Free JSON Formatter, Validator & Converter Online',
    template: '%s | JSON Tools'
  },
  description: 'Free online JSON tools: formatter, validator, converter to YAML/CSV, diff checker, and more. Fast, modern, and developer-friendly. No signup required.',
  keywords: [
    'json formatter',
    'json validator', 
    'json converter',
    'json to yaml',
    'json to csv',
    'json diff',
    'online json tools',
    'json beautifier',
    'json minifier',
    'json parser',
    'format json online',
    'validate json online'
  ],
  authors: [{ name: 'Free JSON Tools', url: 'https://www.freejsontools.com' }],
  creator: 'Free JSON Tools',
  publisher: 'Free JSON Tools',
  metadataBase: new URL('https://www.freejsontools.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free JSON Tools - JSON Formatter, Validator & Converter Online',
    description: 'Free online JSON tools for developers. Format, validate, and convert JSON instantly. No signup required.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.freejsontools.com',
    siteName: 'Free JSON Tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JSON Tools - Free Online JSON Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Tools - JSON Formatter & Validator',
    description: 'Free online JSON tools for developers. Format, validate, and convert JSON instantly.',
    images: ['/og-image.png'],
    creator: '@freejsontools',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free JSON Tools',
  description: 'Free online JSON tools for developers. Format, validate, and convert JSON instantly.',
  url: 'https://freejsontools.com',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'JSON Formatter',
    'JSON Validator',
    'JSON to YAML Converter',
    'JSON to CSV Converter',
    'JSON Diff Checker',
    'JSON Minifier',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
