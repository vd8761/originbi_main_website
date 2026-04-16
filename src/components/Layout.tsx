import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/assets/images/Origin-BI-logo.webp"
              alt="OriginBI Logo"
              className="h-8"
            />
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-900 hover:text-primary font-medium transition-colors">Home</Link>
            <a href="#about" className="text-gray-900 hover:text-primary font-medium transition-colors">About</a>
            <a href="#core" className="text-gray-900 hover:text-primary font-medium transition-colors">Our Core</a>
            <a href="#solution" className="text-gray-900 hover:text-primary font-medium transition-colors">Our Solution</a>
            <a 
              href="https://calendly.com/originbi-mindworks/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-accent transition-all duration-300"
            >
              Lets Talk
            </a>
          </div>

          {/* Mobile Menu Button (simplified for now) */}
          <button className="md:hidden text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <Link to="/">
                <img
                  src="/assets/images/Origin-BI-logo.webp"
                  alt="OriginBI Logo"
                  className="h-10 mb-4"
                />
              </Link>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-600">
                <span>© {currentYear} OriginBI</span>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">Terms and Conditions</Link>
              </div>
            </div>

            <div className="flex gap-6">
              <a href="https://x.com/originbimindwrk" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/originbimindworks/" target="_blank" rel="noopener noreferrer" className="text-[#ce2cd6ff] hover:opacity-80 transition-opacity">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/originbimindworks/" target="_blank" rel="noopener noreferrer" className="text-[#2495ffff] hover:opacity-80 transition-opacity">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

