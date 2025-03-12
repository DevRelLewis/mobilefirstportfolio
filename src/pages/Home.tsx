import React, { useState, useEffect, useRef } from 'react';
// Remove this import if not using it
// import { Typewriter } from 'react-simple-typewriter';
import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const resumeContentRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  interface FloatingIcon {
    top: string;
    left: string;
    size: string;
    color: string;
    animationDuration: string;
    animationDelay: string;
  }

  // Tech stack icons for the floating effect
  const techIcons = [
    '/docker.png',
    '/git.png',
    '/github.png',
    '/jira.png',
    '/vscode.png',
    '/js.png',
    '/nextjs-64.png',
    '/bootstrap.png',
    '/tailwindcss.png',
    '/html.png',
    '/css.png',
    '/mantine.png',
    '/typescript.png',
    '/postgres.png',
    '/sql.png'
  ];
  
  useEffect(() => {
  // Define positions relative to the center (profile picture)
  // Each icon will have a base position and then float around that position
  const createRelativePositions = (isMobile: boolean): FloatingIcon[] => {
    // Same positions for both mobile and desktop, just adjust spacing
    const basePositions = [
      // Top row
      { top: '35%', left: '38%' },
      { top: '35%', left: '62%' },
      
      // Middle sides
      { top: '50%', left: '30%' },
      { top: '50%', left: '70%' },
      
      // Bottom row
      { top: '65%', left: '38%' },
      { top: '65%', left: '62%' },
      
      // Extra positions
      { top: '42%', left: '32%' },
      { top: '42%', left: '68%' },
      { top: '58%', left: '32%' },
      { top: '58%', left: '68%' },
    ];
    
    return basePositions.map((pos, index) => ({
      ...pos,
      // Increase desktop icon sizes significantly
      size: isMobile ? '34px' : `${55 + (index % 4) * 5}px`,
      color: [
        'rgba(186, 85, 211, 0.8)',
        'rgba(138, 43, 226, 0.8)',
        'rgba(75, 0, 130, 0.8)'
      ][index % 3],
      // Vary animation timing for more natural movement
      animationDuration: `${6 + (index % 6)}s`,
      animationDelay: `${index * 0.7}s`
    }));
  };
  
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setFloatingIcons(createRelativePositions(true));
    } else {
      setFloatingIcons(createRelativePositions(false));
    }
  };
  
  // Set initial icons
  handleResize();
  
  // Add event listener for window resize
  window.addEventListener('resize', handleResize);
  
  // Clean up event listener
  return () => window.removeEventListener('resize', handleResize);
}, []);

  useEffect(() => {
    // Simple loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If you're not using handleOnType, you can remove this function
  const handleOnType = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <div className={`min-h-screen bg-gradient-to-b from-primary-300 via-primary-200 to-primary-100 font-pixel text-white transition-opacity duration-1000 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}>
      {/* Navbar */}
      <Navbar scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section id="home" className="pt-20 px-4 min-h-screen flex flex-col items-center justify-center relative">
        {/* Floating Icons - positioned absolutely */}
        <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon, index) => {
  const iconSrc = techIcons[index % techIcons.length];
  return (
    <div 
      key={index} 
      className="absolute rounded-full shadow-lg flex items-center justify-center overflow-hidden"
      style={{ 
        top: icon.top, 
        left: icon.left,
        width: icon.size,
        height: icon.size,
        backgroundColor: icon.color,
        animation: `float ${icon.animationDuration} infinite alternate ease-in-out`,
        animationDelay: icon.animationDelay
      }}
    >
      <img
        src={iconSrc}
        alt="Tech Icon"
        className="w-4/5 h-4/5 object-contain filter brightness-150 drop-shadow-lg"
      />
    </div>
  );
})}
        </div>

        {/* Profile Content */}
        <div className="z-10 text-center">
          <img 
            src="./lewis_8bit.png" 
            alt="Lewis Meyers" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg mx-auto"
          />
          <h1 className="mt-6 text-xl md:text-2xl font-bold text-shadow">Lewis Meyers</h1>
          <p className="mt-4 text-base md:text-lg max-w-md mx-auto">
            Frontend Developer
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">My Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Project Card 1 - Dream Net */}
          <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg border-2 border-white border-opacity-20 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <div className="h-40 bg-primary-500 flex items-center justify-center">
              <span className="text-4xl">🌙</span>
            </div>
            <div className="p-5">
              <h3 className="text-lg md:text-xl mb-2">Dream Net AI</h3>
              <p className="text-white text-opacity-80 text-sm mb-4">
                AI dream interpreter using Next.js and ChatGPT, trained on specialized dream data with 25% improved accuracy.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">Next.js</span>
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">ChatGPT</span>
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">Supabase</span>
              </div>
              <button className="pixel-btn">View Project</button>
            </div>
          </div>
          
          {/* Project Card 2 - Trading Bot */}
          <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg border-2 border-white border-opacity-20 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <div className="h-40 bg-primary-500 flex items-center justify-center">
              <span className="text-4xl">📈</span>
            </div>
            <div className="p-5">
              <h3 className="text-lg md:text-xl mb-2">Options Trading Bot</h3>
              <p className="text-white text-opacity-80 text-sm mb-4">
                Python trading bot using Alpaca API and OpenAI, delivering 15% ROI in $100,000 paper money tests.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">Python</span>
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">Alpaca API</span>
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">Streamlit</span>
              </div>
              <button className="pixel-btn">View Project</button>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
        <section id="resume" className="py-28 px-4" ref={resumeContentRef}>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Resume</h2>
        
        <div className="max-w-3xl mx-auto bg-white bg-opacity-90 p-5 md:p-8 rounded-lg shadow-lg text-black">
            {/* Resume Header */}
           {/* Resume Header with updated contact info and download button */}
           <div className="flex justify-between items-start mb-6">
            <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Lewis Meyers</h2>
                <p className="text-xs mb-4">
                <a href="mailto:meyerslewis193@gmail.com" className="text-blue-700 hover:underline">
                    meyerslewis193@gmail.com
                </a>
                </p>
                <p className="text-xs mb-4">
                 571-294-9222 |{" "}

                <a
                    href="https://www.linkedin.com/in/lewiscmeyers/"
                    className="text-blue-700 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn
                </a>{" "}
                | {" "}
                <a 
                    href="https://lewismeyers.dev" 
                    className="text-blue-700 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    lewismeyers.dev
                </a>
                </p>
            </div>
            
            <a
                href="/resume.pdf"
                download="LewisMeters_Resume.pdf"
                className="px-3 py-2 bg-primary-600 text-white text-xs rounded hover:bg-primary-700 transition-colors font-pixel flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
            </a>
            </div>

            {/* Resume Content - All sections visible */}
            <div className="text-left">
            <h3 className="text-lg md:text-xl font-bold mt-6 mb-2 border-b-2 border-gray-300 pb-1">
                EXPERIENCE
            </h3>
            
            {/* AI Frontend/Tier 3 Engineer */}
            <div className="mb-4">
                <div className="font-bold text-sm md:text-base">AI Frontend/Tier 3 Engineer</div>
                <div className="text-xs mb-2">Teachstone, Virginia, June 2023 – Present</div>
                <ul className="list-disc ml-5 mb-3 text-xs md:text-sm">
                <li className="mb-2">
                    Designed and refined Figma and React/TypeScript UIs, improving reporting tool accessibility and UX, boosting company-wide adoption by 40%.
                </li>
                <li className="mb-2">
                    Resolved 10-15 monthly Salesforce tickets and automated Java/SQL workflows, cutting turnaround time by 30% and enhancing AI tool efficiency by 25%.
                </li>
                <li className="mb-2">
                    Upgraded reporting dashboards with real-time analytics, increasing user engagement by 20% and supporting data-driven decisions.
                </li>
                </ul>
            </div>

            {/* AI Platform Engineer */}
            <div className="mb-4">
                <div className="font-bold text-sm md:text-base">AI Platform Engineer</div>
                <div className="text-xs mb-2">Hyperlink, SF Bay Area, Jan 2024 – May 2024</div>
                <ul className="list-disc ml-5 mb-3 text-xs md:text-sm">
                <li className="mb-2">
                    Raised $3.2M at SXSW 2024 through an SVP pitch, delivering the AI speech generator MVP on time with 50+ users engaging over 5 minutes each.
                </li>
                <li className="mb-2">
                    Built TypeScript components and optimized Next.js APIs, boosting platform stability by 30% and speeding up 100+ daily queries.
                </li>
                <li className="mb-2">
                    Partnered with product teams to refine UX, growing user retention by 15% and solidifying Hyperlink's SXSW impact.
                </li>
                </ul>
            </div>

            {/* Intern Full Stack Developer */}
            <div className="mb-4">
                <div className="font-bold text-sm md:text-base">Intern Full Stack Developer</div>
                <div className="text-xs mb-2">Dank Coders, SF Bay Area, Feb 2023 – Feb 2024</div>
                <ul className="list-disc ml-5 mb-3 text-xs md:text-sm">
                <li className="mb-2">
                    Designed a 3D ecommerce site with Three.js and Figma UI/UX, growing smoothie shop orders from 5-10 daily (Feb 2024) to 15-20 (Feb 2025).
                </li>
                <li className="mb-2">
                    Integrated Node.js for optimized navigation and email APIs, cutting response times by 50% and doubling order volume in 12 months.
                </li>
                <li className="mb-2">
                    Collaborated with the client to refine features, increasing customer satisfaction by 25% and securing repeat orders.
                </li>
                </ul>
            </div>

            {/* Infantryman/Tanker */}
            <div className="mb-4">
                <div className="font-bold text-sm md:text-base">Infantryman/Tanker</div>
                <div className="text-xs mb-2">Army National Guard, Leesburg, VA, Dec 2015 – Dec 2021</div>
                <ul className="list-disc ml-5 mb-3 text-xs md:text-sm">
                <li className="mb-2">
                    Patrolled entry points and monitored $45M+ in surveillance equipment, weaponry and 200+ vehicles daily to secure 30+ personnel and 200+ visitors across a 12+ hour shift.
                </li>
                <li className="mb-2">
                    Key personnel in M1 Abrams Tank operations in Kuwait, managing target detection, gun control, and maintenance with a 4 person team while conducting 40+ member drills and maneuvers.
                </li>
                <li className="mb-2">
                    Led logistics training for 10+ troops, reducing equipment downtime by 15% and ensuring mission readiness during deployments.
                </li>
                </ul>
            </div>

            <h3 className="text-lg md:text-xl font-bold mt-6 mb-2 border-b-2 border-gray-300 pb-1">
                PROJECTS
            </h3>
            
            {/* Dream Net AI Dream Interpreter */}
            <div className="mb-4">
                <div className="font-bold text-sm md:text-base">Dream Net AI Dream Interpreter</div>
                <ul className="list-disc ml-5 mb-3 text-xs md:text-sm">
                <li className="mb-2">
                    Built an AI dream interpreter using Next.js and ChatGPT (trained on specialized dream data), improving interpretation accuracy by 25% during a 30-tester beta.
                </li>
                <li className="mb-2">
                    Implemented Supabase for user authentication and backend services, ensuring real-time data management and secure access.
                </li>
                </ul>
            </div>

            {/* Automated Options Trading Bot */}
            <div className="mb-4">
                <div className="font-bold text-sm md:text-base">Automated Options Trading Bot</div>
                <ul className="list-disc ml-5 mb-3 text-xs md:text-sm">
                <li className="mb-2">
                    Coded a Python bot with Alpaca API and OpenAI, delivering 15% ROI in $100,000 paper money tests.
                </li>
                <li className="mb-2">
                    Designed a Streamlit dashboard with advanced strategies for real-time trade monitoring and execution.
                </li>
                </ul>
            </div>
            </div>
        </div>
        </section>
        <ContactForm />
    </div>
  );
};

export default Home;