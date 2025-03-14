import React, { useState, useEffect, useRef } from 'react';
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
        <div className="z-10 text-center">
          <img 
            src="./lewis_8bit.png" 
            alt="Lewis Meyers" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg mx-auto"
          />
          <h1 className="mt-3 text-xl md:text-2xl font-bold text-black">Lewis Meyers</h1>
          <p className="mt-2 text-base md:text-lg max-w-md mx-auto text-black">
            Frontend Developer
          </p>
          <p className="mt-2 text-base md:text-lg max-w-md mx-auto text-black">
            meyerslewis193@gmail.com
          </p>
        </div>
      </section>

      <section id="projects" className="py-32 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-black">My Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg border-2 border-white border-opacity-20 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
        <div className="h-40 bg-primary-500 flex items-center justify-center">
        <img 
            src="/dream-net.png" 
            alt="Dream Net AI Screenshot" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg md:text-xl mb-2">Dream Net AI</h3>
          <p className="text-white text-opacity-80 text-sm mb-4">
            AI dream interpreter using Next.js and ChatGPT, trained on specialized dream data with 25% improved accuracy.
          </p>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">Next.js</span>
            <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">ChatGPT</span>
            <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">Supabase</span>
          </div>
          <button 
            onClick={() => window.open('https://dreamy-xi.vercel.app/', '_blank')} 
            className="pixel-btn border-black text-black"
          >
            View Project
          </button>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg border-2 border-white border-opacity-20 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
        <div className="h-40 bg-primary-500 flex items-center justify-center">
        <img 
            src="/sokeswig.png" 
            alt="Soke2x Smoothie Shop Screenshot" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg md:text-xl mb-2">Soke2x Smoothie Shop</h3>
          <p className="text-white text-opacity-80 text-sm mb-4">
            Interactive Next.js website for a smoothie brand featuring 3D models, animations, and custom audio visualizers for an immersive user experience.
          </p>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">Next.js</span>
            <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">Three.js</span>
            <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">Howler.js</span>
          </div>
          <a href="https://soke2x.vercel.app/" target="_blank" rel="noopener noreferrer">
            <button className="pixel-btn border-black text-black">View Project</button>
          </a>
        </div>
      </div>
    </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-28 px-4 font-lato" ref={resumeContentRef}>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-black">Resume</h2>
        
        <div className="max-w-3xl mx-auto bg-white bg-opacity-95 p-5 md:p-8 rounded-lg shadow-lg text-black">
            {/* Resume Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-2">Lewis Meyers</h2>
                    <p className="text-sm mb-2 leading-relaxed">
                    <a href="mailto:meyerslewis193@gmail.com" className="text-blue-700 hover:underline">
                        meyerslewis193@gmail.com
                    </a>
                    </p>
                    <p className="text-sm mb-2 leading-relaxed">
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
                    href="/01LewisMeyers.pdf"
                    download="01LewisMeyers.pdf"
                    className="px-3 py-2 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors font-lato flex items-center whitespace-nowrap"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                </a>
                </div>
            <div className="text-left">

            <h3 className="text-lg md:text-xl font-bold mt-6 mb-3 border-b-2 border-gray-300 pb-2 text-primary-700">
            TOOLS
            </h3>
            <div className="mb-4">
            <ul className="list-disc ml-5 mb-3 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                Git, Github, Docker, Jira, Visual Studio Code
                </li>
                <li className="mb-3">
                JavaScript-TypeScript, Next.js, Bootstrap, HTML5/CSS3, TailwindCSS, MantineCSS
                </li>
            </ul>
            </div>

            <h3 className="text-lg md:text-xl font-bold mt-6 mb-3 border-b-2 border-gray-300 pb-2 text-primary-700">
                EXPERIENCE
            </h3>
            
            <div className="mb-4">
                <div className="font-bold text-base md:text-lg mb-1 text-primary-600">AI Frontend/Tier 3 Engineer</div>
                <div className="text-sm mb-2">Teachstone, Virginia, June 2023 – Present</div>
                <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                    Designed and refined Figma and React/TypeScript UIs, improving reporting tool accessibility and UX, boosting company-wide adoption by 40%.
                </li>
                <li className="mb-3">
                    Resolved 10-15 monthly Salesforce tickets and automated Java/SQL workflows, cutting turnaround time by 30% and enhancing AI tool efficiency by 25%.
                </li>
                <li className="mb-3">
                    Upgraded reporting dashboards with real-time analytics, increasing user engagement by 20% and supporting data-driven decisions.
                </li>
                </ul>
            </div>
            <div className="mb-4">
                <div className="font-bold text-base md:text-lg mb-1 text-primary-600">AI Platform Engineer</div>
                <div className="text-sm mb-2">Hyperlink, SF Bay Area, Jan 2024 – May 2024</div>
                <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                    Raised $3.2M at SXSW 2024 through an SVP pitch, delivering the AI speech generator MVP on time with 50+ users engaging over 5 minutes each.
                </li>
                <li className="mb-3">
                    Built TypeScript components and optimized Next.js APIs, boosting platform stability by 30% and speeding up 100+ daily queries.
                </li>
                <li className="mb-3">
                    Partnered with product teams to refine UX, growing user retention by 15% and solidifying Hyperlink's SXSW impact.
                </li>
                </ul>
            </div>
            <div className="mb-4">
                <div className="font-bold text-base md:text-lg mb-1 text-primary-600">Intern Full Stack Developer</div>
                <div className="text-sm mb-2">Dank Coders, SF Bay Area, Feb 2023 – Feb 2024</div>
                <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                    Designed a 3D ecommerce site with Three.js and Figma UI/UX, growing smoothie shop orders from 5-10 daily (Feb 2024) to 15-20 (Feb 2025).
                </li>
                <li className="mb-3">
                    Integrated Node.js for optimized navigation and email APIs, cutting response times by 50% and doubling order volume in 12 months.
                </li>
                <li className="mb-3">
                    Collaborated with the client to refine features, increasing customer satisfaction by 25% and securing repeat orders.
                </li>
                </ul>
            </div>
            <div className="mb-4">
                <div className="font-bold text-base md:text-lg mb-1 text-primary-600">Infantryman/Tanker</div>
                <div className="text-sm mb-2">Army National Guard, Leesburg, VA, Dec 2015 – Dec 2021</div>
                <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                    Patrolled entry points and monitored $45M+ in surveillance equipment, weaponry and 200+ vehicles daily to secure 30+ personnel and 200+ visitors across a 12+ hour shift.
                </li>
                <li className="mb-3">
                    Key personnel in M1 Abrams Tank operations in Kuwait, managing target detection, gun control, and maintenance with a 4 person team while conducting 40+ member drills and maneuvers.
                </li>
                <li className="mb-3">
                    Led logistics training for 10+ troops, reducing equipment downtime by 15% and ensuring mission readiness during deployments.
                </li>
                </ul>
            </div>

            <h3 className="text-lg md:text-xl font-bold mt-6 mb-3 border-b-2 border-gray-300 pb-2 text-primary-700">
                PROJECTS
            </h3>
            <div className="mb-4">
                <div className="font-bold text-base md:text-lg mb-1 text-primary-600">Dream Net AI Dream Interpreter</div>
                <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                    Built an AI dream interpreter using Next.js and ChatGPT (trained on specialized dream data), improving interpretation accuracy by 25% during a 30-tester beta.
                </li>
                <li className="mb-3">
                    Implemented Supabase for user authentication and backend services, ensuring real-time data management and secure access.
                </li>
                </ul>
            </div>
            <div className="mb-4">
                <div className="font-bold text-base md:text-lg mb-1 text-primary-600">Automated Options Trading Bot</div>
                <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                    Coded a Python bot with Alpaca API and OpenAI, delivering 15% ROI in $100,000 paper money tests.
                </li>
                <li className="mb-3">
                    Designed a Streamlit dashboard with advanced strategies for real-time trade monitoring and execution.
                </li>
                </ul>
            </div>
            </div>
        </div>
      </section>
      <style>
        {`
          .custom-bullets li::marker {
            color: #9333ea;
          }
        `}
      </style>
        <ContactForm />
    </div>
  );
};

export default Home;