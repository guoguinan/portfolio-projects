#!/bin/bash
# Deploy all portfolio projects to Vercel

set -e

echo "🚀 Deploying portfolio projects..."

# 1. Portfolio Website (Next.js)
echo "📦 Deploying portfolio-website..."
cd portfolio-website
if [ ! -d ".vercel" ]; then
  vercel --yes
fi
vercel --prod
cd ..

# 2. E-commerce Admin (Next.js)
echo "📦 Deploying ecommerce-admin..."
cd ecommerce-admin
if [ ! -d ".vercel" ]; then
  vercel --yes
fi
vercel --prod
cd ..

# 3. Collaborative Whiteboard (Vite)
echo "📦 Deploying collaborative-whiteboard..."
cd collaborative-whiteboard
if [ ! -d ".vercel" ]; then
  vercel --yes
fi
vercel --prod
cd ..

# 4. Social Analytics (Vite)
echo "📦 Deploying social-analytics..."
cd social-analytics
if [ ! -d ".vercel" ]; then
  vercel --yes
fi
vercel --prod
cd ..

# 5. Task Management (Vite)
echo "📦 Deploying task-management..."
cd task-management
if [ ! -d ".vercel" ]; then
  vercel --yes
fi
vercel --prod
cd ..

echo "✅ All projects deployed!"
