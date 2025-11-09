import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import { Link } from "react-router-dom";
import ChatWidget from "../components/ChatWidget";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const resumeContentRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
  const [fontMode, setFontMode] = useState<"pixel" | "lato">("pixel");

  interface FloatingIcon {
    top: string;
    left: string;
    size: string;
    color: string;
    animationDuration: string;
    animationDelay: string;
  }

  const techIcons = [
    "/docker.png",
    "/git.png",
    "/github.png",
    "/jira.png",
    "/vscode.png",
    "/js.png",
    "/nextjs-64.png",
    "/bootstrap.png",
    "/tailwindcss.png",
    "/html.png",
    "/css.png",
    "/mantine.png",
    "/typescript.png",
    "/postgres.png",
    "/sql.png",
  ];

  useEffect(() => {
    const createRelativePositions = (isMobile: boolean): FloatingIcon[] => {
      const basePositions = [
        { top: "35%", left: "38%" },
        { top: "35%", left: "62%" },
        { top: "50%", left: "30%" },
        { top: "50%", left: "70%" },
        { top: "65%", left: "38%" },
        { top: "65%", left: "62%" },
        { top: "42%", left: "32%" },
        { top: "42%", left: "68%" },
        { top: "58%", left: "32%" },
        { top: "58%", left: "68%" },
      ];

      return basePositions.map((pos, index) => ({
        ...pos,
        size: isMobile ? "34px" : `${55 + (index % 4) * 5}px`,
        color: [
          "rgba(186, 85, 211, 0.8)",
          "rgba(138, 43, 226, 0.8)",
          "rgba(75, 0, 130, 0.8)",
        ][index % 3],
        animationDuration: `${6 + (index % 6)}s`,
        animationDelay: `${index * 0.7}s`,
      }));
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setFloatingIcons(createRelativePositions(true));
      } else {
        setFloatingIcons(createRelativePositions(false));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const savedFontMode = localStorage.getItem("fontMode");
    if (savedFontMode === "lato") {
      setFontMode("lato");
    }
  }, []);

  const toggleFontMode = () => {
    const newMode = fontMode === "pixel" ? "lato" : "pixel";
    setFontMode(newMode);
    localStorage.setItem("fontMode", newMode);
  };

  // const handleOnType = () => {
  //   if (bottomRef.current) {
  //     bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // const fontClass = fontMode === 'pixel' ? 'font-pixel' : 'font-lato';

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-primary-300 via-primary-200 to-primary-100 ${
        fontMode === "pixel" ? "font-pixel" : "font-lato"
      } text-white transition-opacity duration-1000 ${
        !isLoading ? "opacity-100" : "opacity-0"
      }`}>
      <Navbar
        scrollToSection={scrollToSection}
        fontMode={fontMode}
        toggleFontMode={toggleFontMode}
      />

      <section
        id="home"
        className="pt-20 px-4 min-h-screen flex flex-col items-center justify-center relative">
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
                  animationDelay: icon.animationDelay,
                }}>
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
            src={
              fontMode === "pixel" ? "./lewis_8bit.png" : "./lewis_ghibli.png"
            }
            alt="Lewis Meyers"
            className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-white object-cover object-center shadow-lg mx-auto transition-opacity duration-300"
            style={{ objectPosition: "center 34.5%" }}
            key={fontMode}
          />
          <h1 className="mt-3 text-xl md:text-2xl font-bold text-black">
            Lewis Meyers
          </h1>
          <p className="mt-2 text-base md:text-lg max-w-md mx-auto text-black">
            Full Stack Engineer
          </p>
          <p className="mt-2 text-base md:text-lg max-w-md mx-auto text-black">
            meyerslewis193@gmail.com
          </p>
        </div>
      </section>

      <section id="projects" className="py-32 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-black">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto [&>*:nth-child(3)]:md:col-span-2 [&>*:nth-child(3)]:md:justify-self-center [&>*:nth-child(3)]:md:max-w-xl">
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
                AI dream interpreter using Next.js and ChatGPT, trained on
                specialized dream data with 25% improved accuracy.
              </p>
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">
                  Next.js
                </span>
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">
                  ChatGPT
                </span>
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">
                  Supabase
                </span>
              </div>
              <button
                onClick={() =>
                  window.open("https://dreamy-xi.vercel.app/", "_blank")
                }
                className={`px-4 py-2 border-2 border-black rounded transition-all duration-300 
                  hover:bg-white hover:bg-opacity-20 ${
                    fontMode === "pixel" ? "font-pixel" : "font-lato"
                  } text-black`}>
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
                Interactive Next.js website for a smoothie brand featuring 3D
                models, animations, and custom audio visualizers for an
                immersive user experience.
              </p>
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">
                  Next.js
                </span>
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">
                  Three.js
                </span>
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">
                  Howler.js
                </span>
              </div>
              <a
                href="https://soke2x.vercel.app/"
                target="_blank"
                rel="noopener noreferrer">
                <button
                  className={`px-4 py-2 border-2 border-black rounded transition-all duration-300 
                  hover:bg-white hover:bg-opacity-20 ${
                    fontMode === "pixel" ? "font-pixel" : "font-lato"
                  } text-black`}>
                  View Project
                </button>
              </a>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg border-2 border-white border-opacity-20 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
            <div className="h-40 bg-primary-500 flex items-center justify-center">
              <img
                src="/topshelfintel.png"
                alt="Top Shelf Intelligence Screenshot"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg md:text-xl mb-2">
                Top Shelf Intelligence
              </h3>
              <p className="text-white text-opacity-80 text-sm mb-4">
                Professional intelligence and risk management firm website built
                with Next.js, featuring secure client portals, file management,
                and comprehensive protection services showcase.
              </p>
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">
                  Next.js
                </span>
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">
                  TypeScript
                </span>
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">
                  Tailwind CSS
                </span>
                <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">
                  Supabase
                </span>
              </div>
              <a
                href="https://topshelfintel.vercel.app/"
                target="_blank"
                rel="noopener noreferrer">
                <button
                  className={`px-4 py-2 border-2 border-black rounded transition-all duration-300 
                  hover:bg-white hover:bg-opacity-20 ${
                    fontMode === "pixel" ? "font-pixel" : "font-lato"
                  } text-black`}>
                  View Project
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="resume"
        className="py-28 px-4 font-lato"
        ref={resumeContentRef}>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-black">
          Resume
        </h2>

        <div className="max-w-3xl mx-auto bg-white bg-opacity-95 p-5 md:p-8 rounded-lg shadow-lg text-black">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                Lewis Meyers
              </h2>
              <p className="text-sm mb-2 leading-relaxed">
                <a
                  href="mailto:meyerslewis193@gmail.com"
                  className="text-blue-700 hover:underline">
                  meyerslewis193@gmail.com
                </a>
              </p>
              <p className="text-sm mb-2 leading-relaxed">
                571-294-9222 |{" "}
                <a
                  href="https://www.linkedin.com/in/lewiscmeyers/"
                  className="text-blue-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer">
                  LinkedIn
                </a>{" "}
                |{" "}
                <a
                  href="https://lewismeyers.dev"
                  className="text-blue-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer">
                  lewismeyers.dev
                </a>
              </p>
            </div>

            <a
              href="/01LewisMeyers.pdf"
              download="01LewisMeyers.pdf"
              className="px-3 py-2 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors font-lato flex items-center whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PDF
            </a>
          </div>

          <div className="text-left">
            <h3 className="text-lg md:text-xl font-bold mt-6 mb-3 border-b-2 border-gray-300 pb-2 text-primary-700">
              SUMMARY
            </h3>
            <p className="text-sm mb-4 leading-relaxed">
              Army Veteran and Full Stack Engineer with experience building
              AI-driven applications and customer-first platforms. Skilled in
              React, Next.js, TypeScript, Python, and PostgreSQL, with hands-on
              exposure to prompt engineering, RAG workflows, and integrating AI
              APIs into production systems. Adept at developing scalable
              backends on AWS, optimizing front-end performance, and
              collaborating cross-functionally to deliver end-to-end features.
            </p>

            <h3 className="text-lg md:text-xl font-bold mt-6 mb-3 border-b-2 border-gray-300 pb-2 text-primary-700">
              TECHNICAL SKILLS
            </h3>
            <div className="mb-4">
              <ul className="list-disc ml-5 mb-3 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                  <strong>Languages:</strong> Python, Ruby (familiarity),
                  JavaScript (React, TypeScript, Next), HTML, SQL, Bootstrap,
                  CSS, TailwindCSS, Mantine, WordPress
                </li>
                <li className="mb-3">
                  <strong>AI/ML:</strong> Prompt engineering, exposure to RAG
                  workflows
                </li>
                <li className="mb-3">
                  <strong>Tools:</strong> Visual Studio, Azure DevOps, Git,
                  GitHub, MS SQL Server, IDLE, Air Table, Jira, GCP, SEO, AWS
                </li>
                <li className="mb-3">
                  <strong>Product:</strong> User Stories, Wireframing, UI/UX
                  Feedback, Documentation, Backlog
                </li>
                <li className="mb-3">
                  <strong>Databases:</strong> MySQL, PostgreSQL
                </li>
                <li className="mb-3">
                  <strong>Other:</strong> Test-Driven Development (TDD),
                  Automated Testing
                </li>
              </ul>
            </div>

            <h3 className="text-lg md:text-xl font-bold mt-6 mb-3 border-b-2 border-gray-300 pb-2 text-primary-700">
              EXPERIENCE
            </h3>

            <div className="mb-4">
              <div className="font-bold text-base md:text-lg mb-1 text-primary-600">
                Web Developer & SEO Strategist
              </div>
              <div className="text-sm mb-2">
                TopShelfIntelligence, June 2024 – Sept 2025
              </div>
              <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                  Designed and deployed a Next.js + TypeScript client portal
                  with Supabase backend, integrating Microsoft SharePoint for
                  secure document management, authentication, and dashboards.
                </li>
                <li className="mb-3">
                  Implemented role-based access control and admin dashboards to
                  support scalability, compliance, and security.
                </li>
                <li className="mb-3">
                  Optimized site performance, responsive design, and
                  accessibility, reducing user drop-off by 20% and boosting
                  engagement across devices.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="font-bold text-base md:text-lg mb-1 text-primary-600">
                Software Engineer & Tier 3 Engineer
              </div>
              <div className="text-sm mb-2">
                Teachstone, June 2023 – July 2025
              </div>
              <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                  Built and optimized TypeScript components and Next.js APIs,
                  improving platform performance by 30% and reducing wait times
                  for end users.
                </li>
                <li className="mb-3">
                  Automated backend workflows with Java and SQL, cutting
                  turnaround time by 30% and enabling smoother data flow into
                  AI-driven reporting tools.
                </li>
                <li className="mb-3">
                  Designed React UIs and feedback loops with product/UX teams,
                  driving 40% adoption increases across reporting tools and
                  growing user retention by 15%.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="font-bold text-base md:text-lg mb-1 text-primary-600">
                AI Platform Engineer
              </div>
              <div className="text-sm mb-2">Hyperlink, Jan 2024 – May 2024</div>
              <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                  Delivered the MVP of an AI-powered speech generator,
                  integrating model APIs and prompt workflows that contributed
                  to a $3.2M raise at SXSW 2024.
                </li>
                <li className="mb-3">
                  Developed performant React/Next.js/TypeScript frontend
                  features and optimized backend query handling, reducing load
                  times by 30% for 100+ daily queries.
                </li>
                <li className="mb-3">
                  Collaborated with product and engineering leads to define
                  technical requirements, document APIs, and support a scalable
                  launch.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="font-bold text-base md:text-lg mb-1 text-primary-600">
                Junior Front End Developer
              </div>
              <div className="text-sm mb-2">
                Dank Coders (Part Time Contract), Feb 2023 – Feb 2024
              </div>
              <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                  Designed a 3D ecommerce site using Three.js, improving mobile
                  UX and increasing daily orders by 40%.
                </li>
                <li className="mb-3">
                  Integrated Node.js for optimized navigation and email APIs,
                  cutting response times by 50% and growing orders 100%.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="font-bold text-base md:text-lg mb-1 text-primary-600">
                Software Engineer & Developer Advocate
              </div>
              <div className="text-sm mb-2">
                Career Karma, Sept 2021 – Feb 2023
              </div>
              <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                  Hosted 150+ live sessions to gather user insights, influencing
                  product direction and generating 200K+ impressions across
                  platforms.
                </li>
                <li className="mb-3">
                  Developed workshops and documentation to guide users through
                  workflows, directing matching 100+ students with technical
                  bootcamps.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="font-bold text-base md:text-lg mb-1 text-primary-600">
                Infantryman
              </div>
              <div className="text-sm mb-2">
                US Army National Guard, Dec 2015 – Dec 2021
              </div>
              <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                  Secured premises and personnel by patrolling entry points and
                  monitoring surveillance equipment worth $45M+.
                </li>
                <li className="mb-3">
                  Managed group of 10+ staff in creation of care packages for
                  700+ residents during Hurricane Irma Humanitarian Relief.
                </li>
                <li className="mb-3">
                  Coordinated movements with teams of 40+ during tanks
                  movements/drills and operated main gun/firing controls with
                  team of 4.
                </li>
              </ul>
            </div>

            <h3 className="text-lg md:text-xl font-bold mt-6 mb-3 border-b-2 border-gray-300 pb-2 text-primary-700">
              PROJECTS
            </h3>

            <div className="mb-4">
              <div className="font-bold text-base md:text-lg mb-1 text-primary-600">
                Spring Boot Pokedex (Personal Project)
              </div>
              <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                  Built a full-stack Java + Spring Boot application using
                  Lombok, Postgres, Kafka and REST APIs to manage Pokémon data.
                </li>
                <li className="mb-3">
                  Implemented CRUD operations, authentication flows, and schema
                  design, demonstrating enterprise-level Java backend
                  development.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="font-bold text-base md:text-lg mb-1 text-primary-600">
                Dream Net AI Dream Interpreter
              </div>
              <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                  Built an AI dream interpreter using Next.js and ChatGPT
                  (trained on specialized dream data), improving interpretation
                  accuracy by 25% during a 30-tester beta.
                </li>
                <li className="mb-3">
                  Implemented Supabase for user authentication and backend
                  services, ensuring real-time data management and secure
                  access.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="font-bold text-base md:text-lg mb-1 text-primary-600">
                Automated Options Trading Bot
              </div>
              <ul className="list-disc ml-5 mb-4 text-sm leading-relaxed custom-bullets">
                <li className="mb-3">
                  Coded a Python bot with Alpaca API and OpenAI, delivering 15%
                  ROI in $100,000 paper money tests.
                </li>
                <li className="mb-3">
                  Designed a Streamlit dashboard with advanced strategies for
                  real-time trade monitoring and execution.
                </li>
              </ul>
            </div>

            <h3 className="text-lg md:text-xl font-bold mt-6 mb-3 border-b-2 border-gray-300 pb-2 text-primary-700">
              EDUCATION
            </h3>
            <div className="mb-4">
              <div className="font-bold text-base md:text-lg mb-1 text-primary-600">
                Northern Community College
              </div>
              <div className="text-sm">General Studies Major</div>
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
      <ContactForm fontMode={fontMode} />
      <footer
        className={`bg-gray-800 text-white py-8 px-4 text-center ${
          fontMode === "pixel" ? "font-pixel" : "font-lato"
        }`}>
        <p className="mb-4">
          © {new Date().getFullYear()} Lewis Meyers. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://www.linkedin.com/in/lewiscmeyers/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors">
            LinkedIn
          </a>
          <a
            href="mailto:meyerslewis193@gmail.com"
            className="text-gray-300 hover:text-white transition-colors">
            Email
          </a>
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition-colors">
            Simple Resume
          </Link>
        </div>
      </footer>
      <ChatWidget
        fontMode="lato"
        apiEndpoint="https://chatbot-api-jet.vercel.app/api/chat"
      />
    </div>
  );
};

export default Home;
