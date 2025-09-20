import { Bot, FileText, Zap, Shield, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sommaire
              </h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Transform any PDF into intelligent, structured summaries with the power of AI. 
              Perfect for students, professionals, and researchers who need to quickly understand 
              complex documents.
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-300">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-gray-300">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Any PDF Format</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">AI-Powered Analysis</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Smart Summarization</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Key Points Extraction</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Multi-Language Support</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Export Options</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Documentation</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">API Reference</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Tutorials</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Best Practices</li>
              <li className="hover:text-blue-400 transition-colors cursor-pointer">Support Center</li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-1">10K+</div>
              <div className="text-gray-300 text-sm">PDFs Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-1">5K+</div>
              <div className="text-gray-300 text-sm">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-1">99.9%</div>
              <div className="text-gray-300 text-sm">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-1"> 30s</div>
              <div className="text-gray-300 text-sm">Average Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 Sommaire. All rights reserved. Powered by advanced AI technology.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
}