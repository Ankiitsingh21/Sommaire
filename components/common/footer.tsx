import { Bot, FileText, Zap, Shield, Github, Twitter, Mail, Sparkle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-white to-rose-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative p-[1px] overflow-hidden rounded-xl bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800">
                <div className="relative p-2 bg-white rounded-xl">
                  <Bot className="h-8 w-8 text-rose-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Sommaire
                </h3>
                <div className="flex items-center gap-1 text-sm">
                  <Sparkle className="h-3 w-3 text-rose-500" />
                  <span className="text-rose-600 font-medium">Powered By AI</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md">
              Transform lengthy PDFs into clear, accurate summaries in seconds. 
              Save hours of reading time with our advanced AI technology.
            </p>
            
            {/* CTA Button */}
            <Button
              className="text-white text-base rounded-full px-8 py-6 font-bold 
                       shadow-lg transition-all duration-300 hover:shadow-xl
                       bg-gradient-to-r from-rose-500 to-rose-900 
                       hover:from-rose-600 hover:to-rose-800"
            >
              <Link href="/upload" className="flex gap-2 items-center">
                <Button className="bg-transparent hover:bg-transparent" >Get Started Free</Button>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-gray-600 hover:text-rose-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-rose-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-gray-600 hover:text-rose-600 transition-colors">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-600 hover:text-rose-600 transition-colors">
                  API Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-rose-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-600 hover:text-rose-600 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-rose-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-rose-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-rose-50 to-white border border-rose-100">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Zap className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Lightning Fast</div>
                <div className="text-sm text-gray-600"> 30 seconds</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Secure & Private</div>
                <div className="text-sm text-gray-600">100% Protected</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-white border border-green-100">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Any PDF</div>
                <div className="text-sm text-gray-600">All formats</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Bot className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">AI-Powered</div>
                <div className="text-sm text-gray-600">Smart analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <div className="text-gray-600 text-sm">
              © 2025 Sommaire. All rights reserved. 
              <span className="hidden sm:inline ml-1">
                Transform PDFs into concise summaries with AI.
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 mr-2">Follow us:</span>
              <Link 
                href="#" 
                className="p-2 text-gray-400 hover:text-rose-600 transition-all duration-200 rounded-lg hover:bg-rose-50"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                className="p-2 text-gray-400 hover:text-rose-600 transition-all duration-200 rounded-lg hover:bg-rose-50"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                className="p-2 text-gray-400 hover:text-rose-600 transition-all duration-200 rounded-lg hover:bg-rose-50"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-rose-600 to-rose-900"></div>
    </footer>
  );
}