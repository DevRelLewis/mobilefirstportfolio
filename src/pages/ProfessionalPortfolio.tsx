import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './PassionLink.css';
import ChatWidget from '../components/ChatWidget';

const ProfessionalPortfolio: React.FC = () => {
  const resumeContentRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset to account for the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato text-gray-800">
      {/* Simple Header/Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">Lewis Meyers</div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <button 
                    onClick={() => scrollToSection('resume')}
                    className="text-gray-700 hover:text-gray-900 font-lato"
                  >
                    Resume
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className="text-gray-700 hover:text-gray-900 font-lato"
                  >
                    Projects
                  </button>
                </li>
                <li>
                <Link 
                    to="/welcome"
                    className="text-purple-600 hover:text-purple-500 font-bold transition-all duration-300 passion-link"
                    >
                    Passion Portfolio
                </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <section className="pt-32 pb-16 px-4 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-40 h-40 md:w-48 md:h-48 bg-gray-200 rounded-full flex items-center justify-center border-4 border-gray-100 shadow-lg">
            <img 
            src="./lewis_prof.png" 
            alt="Lewis Meyers" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg mx-auto"         />
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Lewis Meyers</h1>
            <p className="text-xl text-gray-600 mb-4">Frontend Developer</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a 
                href="mailto:meyerslewis193@gmail.com"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                meyerslewis193@gmail.com
              </a>
              <a 
                href="https://www.linkedin.com/in/lewiscmeyers/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="/01LewisMeyers.pdf"
                download="01LewisMeyers.pdf"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-12 px-4" ref={resumeContentRef}>
        <div className="container mx-auto max-w-4xl bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">Professional Experience</h2>
          
          {/* Tools Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-700">Tools & Technologies</h3>
            <div className="mb-4">
              <ul className="list-disc ml-5 text-gray-700 space-y-2">
                <li>Git, Github, Docker, Jira, Visual Studio Code</li>
                <li>JavaScript-TypeScript, Next.js, Bootstrap, HTML5/CSS3, TailwindCSS, MantineCSS</li>
              </ul>
            </div>
          </div>
          
          {/* Experience 1 */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-xl font-bold text-gray-700">AI Frontend/Tier 3 Engineer</h3>
              <span className="text-gray-600 text-sm mt-1 md:mt-0">June 2023 – Present</span>
            </div>
            <p className="text-gray-600 italic mb-3">Teachstone, Virginia</p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Designed and refined Figma and React/TypeScript UIs, improving reporting tool accessibility and UX, boosting company-wide adoption by 40%.</li>
              <li>Resolved 10-15 monthly Salesforce tickets and automated Java/SQL workflows, cutting turnaround time by 30% and enhancing AI tool efficiency by 25%.</li>
              <li>Upgraded reporting dashboards with real-time analytics, increasing user engagement by 20% and supporting data-driven decisions.</li>
            </ul>
          </div>
          
          {/* Experience 2 */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-xl font-bold text-gray-700">AI Platform Engineer</h3>
              <span className="text-gray-600 text-sm mt-1 md:mt-0">Jan 2024 – May 2024</span>
            </div>
            <p className="text-gray-600 italic mb-3">Hyperlink, SF Bay Area</p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Raised $3.2M at SXSW 2024 through an SVP pitch, delivering the AI speech generator MVP on time with 50+ users engaging over 5 minutes each.</li>
              <li>Built TypeScript components and optimized Next.js APIs, boosting platform stability by 30% and speeding up 100+ daily queries.</li>
              <li>Partnered with product teams to refine UX, growing user retention by 15% and solidifying Hyperlink's SXSW impact.</li>
            </ul>
          </div>
          
          {/* Experience 3 */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-xl font-bold text-gray-700">Intern Full Stack Developer</h3>
              <span className="text-gray-600 text-sm mt-1 md:mt-0">Feb 2023 – Feb 2024</span>
            </div>
            <p className="text-gray-600 italic mb-3">Dank Coders, SF Bay Area</p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Designed a 3D ecommerce site with Three.js and Figma UI/UX, growing smoothie shop orders from 5-10 daily (Feb 2024) to 15-20 (Feb 2025).</li>
              <li>Integrated Node.js for optimized navigation and email APIs, cutting response times by 50% and doubling order volume in 12 months.</li>
              <li>Collaborated with the client to refine features, increasing customer satisfaction by 25% and securing repeat orders.</li>
            </ul>
          </div>
          
          {/* Experience 4 */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-xl font-bold text-gray-700">Infantryman/Tanker</h3>
              <span className="text-gray-600 text-sm mt-1 md:mt-0">Dec 2015 – Dec 2021</span>
            </div>
            <p className="text-gray-600 italic mb-3">Army National Guard, Leesburg, VA</p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Patrolled entry points and monitored $45M+ in surveillance equipment, weaponry and 200+ vehicles daily to secure 30+ personnel and 200+ visitors across a 12+ hour shift.</li>
              <li>Key personnel in M1 Abrams Tank operations in Kuwait, managing target detection, gun control, and maintenance with a 4 person team while conducting 40+ member drills and maneuvers.</li>
              <li>Led logistics training for 10+ troops, reducing equipment downtime by 15% and ensuring mission readiness during deployments.</li>
            </ul>
          </div>
          
          {/* Projects Section */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2 mt-12">Notable Projects</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-700">Dream Net AI Dream Interpreter</h3>
            <ul className="list-disc ml-5 text-gray-700 space-y-2 mt-3">
              <li>Built an AI dream interpreter using Next.js and ChatGPT (trained on specialized dream data), improving interpretation accuracy by 25% during a 30-tester beta.</li>
              <li>Implemented Supabase for user authentication and backend services, ensuring real-time data management and secure access.</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-700">Automated Options Trading Bot</h3>
            <ul className="list-disc ml-5 text-gray-700 space-y-2 mt-3">
              <li>Coded a Python bot with Alpaca API and OpenAI, delivering 15% ROI in $100,000 paper money tests.</li>
              <li>Designed a Streamlit dashboard with advanced strategies for real-time trade monitoring and execution.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200">
                <img 
                  src="/dream-net.png" 
                  alt="Dream Net AI Screenshot"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/800x400?text=Dream+Net+AI";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Dream Net AI</h3>
                <p className="text-gray-600 mb-4">
                  AI dream interpreter using Next.js and ChatGPT, trained on specialized dream data with 25% improved accuracy.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Next.js</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">ChatGPT</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Supabase</span>
                </div>
                <a 
                  href="https://dreamy-xi.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View Project
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200">
                <img 
                  src="/sokeswig.png" 
                  alt="Soke2x Smoothie Shop Screenshot" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/800x400?text=Soke2x+Smoothie+Shop";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Soke2x Smoothie Shop</h3>
                <p className="text-gray-600 mb-4">
                  Interactive Next.js website for a smoothie brand featuring 3D models, animations, and custom audio visualizers.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Next.js</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Three.js</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Howler.js</span>
                </div>
                <a 
                  href="https://soke2x.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 text-center">
        <p className="mb-4">© {new Date().getFullYear()} Lewis Meyers. All rights reserved.</p>
        <div className="flex justify-center items-center space-x-4">
          <a 
            href="https://www.linkedin.com/in/lewiscmeyers/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors py-1"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:meyerslewis193@gmail.com" 
            className="text-gray-300 hover:text-white transition-colors py-1"
          >
            Email
          </a>
          <Link 
            to="/welcome"
            className="text-purple-500 hover:text-purple-400 font-bold transition-all duration-300 passion-link-footer py-1"
          >
            Passion Portfolio
          </Link>
        </div>
        
      </footer>
      <ChatWidget fontMode="lato" />
    </div>
  );
};

export default ProfessionalPortfolio;