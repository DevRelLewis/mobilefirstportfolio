import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  scrollToSection: (id: string) => void;
  fontMode: string;
  toggleFontMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection, fontMode, toggleFontMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hostname, setHostname] = useState<string>('');
  const location = useLocation();
  
  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);
  
  const isProfessionalPage = location.pathname === '/professional' || 
                           (location.pathname === '/' && hostname.includes('portfolio'));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  // Get the font class based on current mode
  const fontClass = fontMode === 'pixel' ? 'font-pixel' : 'font-lato';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 shadow-md ${isProfessionalPage ? 'bg-gray-800' : 'bg-purple-700'}`}>
      <div className="w-full py-4">
        <div className="flex justify-between items-center px-6">
          <button 
            onClick={() => handleNavClick('home')}
            className={`text-white ${fontClass} text-xl focus:outline-none`}
          >
            Lewis.dev
          </button>
          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              <li>
                <button 
                  onClick={() => handleNavClick('home')}
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('projects')}
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('resume')}
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  Resume
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  Contact
                </button>
              </li>
              <li>
                <Link 
                  to="/"
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  {hostname.includes('portfolio') ? 'Passion Portfolio' : 'Simple Resume'}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/lewiscmeyers/', '_blank')}
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  LinkedIn
                </button>
              </li>
              {/* Font Toggle */}
              <li className="flex items-center">
                <button
                  onClick={toggleFontMode}
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none flex items-center`}
                >
                  <span className="mr-2">Font:</span>
                  <div className="relative inline-block w-10 h-5 transition duration-200 ease-in-out rounded-full bg-white bg-opacity-20">
                    <label
                      htmlFor="font-toggle"
                      className={`absolute left-0 w-5 h-5 transition duration-100 ease-in-out rounded-full ${
                        fontMode === 'pixel' ? 'transform translate-x-0 bg-white' : 'transform translate-x-5 bg-gray-200'
                      }`}
                    ></label>
                    <input
                      type="checkbox"
                      id="font-toggle"
                      name="font-toggle"
                      className="w-full h-full appearance-none focus:outline-none"
                      checked={fontMode === 'lato'}
                      onChange={toggleFontMode}
                    />
                  </div>
                  <span className="ml-2">{fontMode === 'pixel' ? 'Retro' : 'Modern'}</span>
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
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('projects')}
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('resume')}
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  Resume
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  Contact
                </button>
              </li>
              <li>
                <Link 
                  to="/"
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  {hostname.includes('portfolio') ? 'Passion Portfolio' : 'Simple Resume'}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => window.open('https://www.linkedin.com/in/lewiscmeyers/', '_blank')}
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none`}
                >
                  LinkedIn
                </button>
              </li>
              {/* Font Toggle for Mobile */}
              <li className="flex items-center">
                <button
                  onClick={toggleFontMode}
                  className={`text-white ${fontClass} hover:opacity-80 focus:outline-none flex items-center`}
                >
                  <span className="mr-2">Font:</span>
                  <div className="relative inline-block w-10 h-5 transition duration-200 ease-in-out rounded-full bg-white bg-opacity-20">
                    <label
                      htmlFor="font-toggle-mobile"
                      className={`absolute left-0 w-5 h-5 transition duration-100 ease-in-out rounded-full ${
                        fontMode === 'pixel' ? 'transform translate-x-0 bg-white' : 'transform translate-x-5 bg-gray-200'
                      }`}
                    ></label>
                    <input
                      type="checkbox"
                      id="font-toggle-mobile"
                      name="font-toggle-mobile"
                      className="w-full h-full appearance-none focus:outline-none"
                      checked={fontMode === 'lato'}
                      onChange={toggleFontMode}
                    />
                  </div>
                  <span className="ml-2">{fontMode === 'pixel' ? 'Retro' : 'Modern'}</span>
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