#!/bin/bash

echo "==================================="
echo "JSON Tools - Quick Start"
echo "==================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Ask user what to do
echo "What would you like to do?"
echo "1) Start development server"
echo "2) Build for production"
echo "3) Exit"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting development server..."
        echo "Visit http://localhost:3000"
        npm run dev
        ;;
    2)
        echo ""
        echo "🔨 Building for production..."
        npm run build
        echo ""
        echo "✅ Build complete!"
        echo "📁 Static files are in the 'out' directory"
        echo ""
        echo "Next steps:"
        echo "1. Upload 'out' directory contents to Hostinger public_html"
        echo "2. Visit your domain to see the site"
        ;;
    3)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
