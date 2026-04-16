import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Linkedin, Youtube, Menu, X } from 'lucide-react';

/** Custom X (formerly Twitter) logo icon */
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { label: 'Home', href: '/', isRoute: true },
  { label: 'About', href: '/#about', isRoute: false },
  { label: 'Our Core', href: '/#core', isRoute: false },
  { label: 'Our Solution', href: '/#solution', isRoute: false },
];

export default function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/60 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center relative z-[60]">
            <img
              src="/assets/images/Origin-BI-logo.webp"
              alt="OriginBI Logo"
              className="h-8"
            />
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {NAV_LINKS.map((link) =>
              link.isRoute ? (
                <Link key={link.label} to={link.href} className="text-gray-900 hover:text-primary font-medium transition-colors">{link.label}</Link>
              ) : (
                <a key={link.label} href={link.href} className="text-gray-900 hover:text-primary font-medium transition-colors">{link.label}</a>
              )
            )}
            <a 
              href="https://calendly.com/originbi-mindworks/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-accent transition-all duration-300"
            >
              Lets Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="relative w-6 h-6">
              {/* Hamburger → X morphing */}
              <span
                className={`absolute left-0 w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'top-[11px] rotate-45' : 'top-[4px] rotate-0'
                }`}
              />
              <span
                className={`absolute left-0 top-[11px] w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-200 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`absolute left-0 w-6 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'top-[11px] -rotate-45' : 'top-[18px] rotate-0'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay + Panel */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Slide-down Panel */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl md:hidden transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ maxHeight: '100dvh', overflowY: 'auto' }}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to="/" onClick={closeMenu} className="flex items-center">
            <img
              src="/assets/images/Origin-BI-logo.webp"
              alt="OriginBI Logo"
              className="h-8"
            />
          </Link>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Links */}
        <div className="px-5 py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link, idx) => {
            const className = `flex items-center px-4 py-3.5 rounded-xl text-gray-800 font-medium text-lg hover:bg-primary/5 hover:text-primary active:bg-primary/10 transition-all duration-200`;
            const style = {
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
              transition: `opacity 300ms ${80 + idx * 50}ms ease-out, transform 300ms ${80 + idx * 50}ms ease-out`
            };

            return link.isRoute ? (
              <Link key={link.label} to={link.href} onClick={closeMenu} className={className} style={style}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} onClick={closeMenu} className={className} style={style}>
                {link.label}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="px-5 pb-6">
          <a 
            href="https://calendly.com/originbi-mindworks/30min" 
            onClick={closeMenu}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-white py-4 rounded-2xl font-semibold hover:bg-accent active:scale-[0.98] transition-all duration-300 text-center block w-full text-lg shadow-lg shadow-primary/20"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
              transition: `opacity 300ms 320ms ease-out, transform 300ms 320ms ease-out`
            }}
          >
            Lets Talk
          </a>
        </div>

        {/* Social Links */}
        <div 
          className="px-5 pb-8 flex items-center justify-center gap-5"
          style={{
            opacity: isMobileMenuOpen ? 1 : 0,
            transition: `opacity 400ms 380ms ease-out`
          }}
        >
          <a href="https://x.com/originbimindwrk" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary/10 flex items-center justify-center transition-colors">
            <XIcon className="w-4 h-4 text-gray-600" />
          </a>
          <a href="https://www.instagram.com/originbimindworks/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#ce2cd6]/10 flex items-center justify-center transition-colors">
            <Instagram className="w-4 h-4 text-gray-600" />
          </a>
          <a href="https://www.linkedin.com/company/originbimindworks/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#2495ff]/10 flex items-center justify-center transition-colors">
            <Linkedin className="w-4 h-4 text-gray-600" />
          </a>
          <a href="https://www.youtube.com/@OriginBIMindworks" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-50 flex items-center justify-center transition-colors">
            <Youtube className="w-4 h-4 text-gray-600" />
          </a>
        </div>
      </div>

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
                <XIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/originbimindworks/" target="_blank" rel="noopener noreferrer" className="text-[#ce2cd6ff] hover:opacity-80 transition-opacity">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/originbimindworks/" target="_blank" rel="noopener noreferrer" className="text-[#2495ffff] hover:opacity-80 transition-opacity">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@OriginBIMindworks" target="_blank" rel="noopener noreferrer" className="text-[#ff0000ff] hover:opacity-80 transition-opacity">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

