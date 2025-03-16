// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  scrollToSection: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hostname, setHostname] = useState<string>('');
  const location = useLocation();
  
  useEffect(() => {
    // Get the current hostname
    setHostname(window.location.hostname);
  }, []);
  
  // Check if we're on the professional portfolio page
  const isProfessionalPage = location.pathname === '/professional' || 
                           (location.pathname === '/' && hostname.includes('portfolio'));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 shadow-md ${isProfessionalPage ? 'bg-gray-800' : 'bg-purple-700'}`}>
      <div className="w-full py-4">
        <div className="flex justify-between items-center px-6">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-white font-pixel text-xl focus:outline-none"
          >
            Lewis.dev
          </button>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <button 
                  onClick={() => handleNavClick('home')}
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('projects')}
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('resume')}
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  Resume
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  Contact
                </button>
              </li>
              <li>
                {/* Replace direct URL with Link component */}
                <Link 
                  to="/"
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  {hostname.includes('portfolio') ? 'Passion Portfolio' : 'Simple Resume'}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/lewiscmeyers/', '_blank')}
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  LinkedIn
                </button>
              </li>
            </ul>
          </nav>

          <button 
            onClick={toggleMenu}
            className="text-white focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <span className="text-2xl font-bold">×</span>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="mt-3 py-3 px-6 md:hidden">
            <ul className="flex flex-col space-y-4">
              <li>
                <button 
                  onClick={() => handleNavClick('home')}
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('projects')}
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('resume')}
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  Resume
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  Contact
                </button>
              </li>
              <li>
                {/* Replace direct URL with Link component in mobile menu too */}
                <Link 
                  to="/"
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  {hostname.includes('portfolio') ? 'Passion Portfolio' : 'Simple Resume'}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/lewiscmeyers/', '_blank')}
                  className="text-white font-pixel hover:opacity-80 focus:outline-none"
                >
                  LinkedIn
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;