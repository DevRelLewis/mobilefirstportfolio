import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./PassionLink.css";
import ChatWidget from "../components/ChatWidget";

const ProfessionalPortfolio: React.FC = () => {
  const resumeContentRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const getApiEndpoint = () => {
    if (typeof window === "undefined") return ""; // SSR safety

    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    return isLocal
      ? "http://localhost:8000"
      : "https://chatbot-api-jet.vercel.app/api/chat";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-lato text-gray-800">
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800">Lewis Meyers</div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <button
                    onClick={() => scrollToSection("resume")}
                    className="text-gray-700 hover:text-gray-900 font-lato">
                    Resume
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="text-gray-700 hover:text-gray-900 font-lato">
                    Projects
                  </button>
                </li>
                <li>
                  <Link
                    to="/welcome"
                    className="text-purple-600 hover:text-purple-500 font-bold transition-all duration-300 passion-link">
                    Passion Portfolio
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-16 px-4 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-40 h-40 md:w-48 md:h-48 bg-gray-200 rounded-full flex items-center justify-center border-4 border-gray-100 shadow-lg">
            <img
              src="./lewis_prof.png"
              alt="Lewis Meyers"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg mx-auto"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Lewis Meyers
            </h1>
            <p className="text-xl text-gray-600 mb-4">Full Stack Engineer</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href="mailto:meyerslewis193@gmail.com"
                className="text-blue-600 hover:text-blue-800 transition-colors">
                meyerslewis193@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/lewiscmeyers/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors">
                LinkedIn
              </a>
              <a
                href="/01LewisMeyers.pdf"
                download="01LewisMeyers.pdf"
                className="text-blue-600 hover:text-blue-800 transition-colors">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="resume" className="py-12 px-4" ref={resumeContentRef}>
        <div className="container mx-auto max-w-4xl bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
            Summary
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Army Veteran and Full Stack Engineer with experience building
            AI-driven applications and customer-first platforms. Skilled in
            React, Next.js, TypeScript, Python, and PostgreSQL, with hands-on
            exposure to prompt engineering, RAG workflows, and integrating AI
            APIs into production systems. Adept at developing scalable backends
            on AWS, optimizing front-end performance, and collaborating
            cross-functionally to deliver end-to-end features.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
            Technical Skills
          </h2>
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-700">
                Languages
              </h3>
              <p className="text-gray-700 text-sm">
                Python, Ruby (familiarity), JavaScript (React, TypeScript,
                Next), HTML, SQL, Bootstrap, CSS, TailwindCSS, Mantine,
                WordPress
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-700">AI/ML</h3>
              <p className="text-gray-700 text-sm">
                Prompt engineering, exposure to RAG workflows
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-700">Tools</h3>
              <p className="text-gray-700 text-sm">
                Visual Studio, Azure DevOps, Git, GitHub, MS SQL Server, IDLE,
                Air Table, Jira, GCP, SEO, AWS
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-700">Product</h3>
              <p className="text-gray-700 text-sm">
                User Stories, Wireframing, UI/UX Feedback, Documentation,
                Backlog
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-700">
                Databases
              </h3>
              <p className="text-gray-700 text-sm">MySQL, PostgreSQL</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-700">Other</h3>
              <p className="text-gray-700 text-sm">
                Test-Driven Development (TDD), Automated Testing
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">
            Professional Experience
          </h2>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-xl font-bold text-gray-700">
                Web Developer & SEO Strategist
              </h3>
              <span className="text-gray-600 text-sm mt-1 md:mt-0">
                June 2024 – Sept 2025
              </span>
            </div>
            <p className="text-gray-600 italic mb-3">TopShelfIntelligence</p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>
                Designed and deployed a Next.js + TypeScript client portal with
                Supabase backend, integrating Microsoft SharePoint for secure
                document management, authentication, and dashboards.
              </li>
              <li>
                Implemented role-based access control and admin dashboards to
                support scalability, compliance, and security.
              </li>
              <li>
                Optimized site performance, responsive design, and
                accessibility, reducing user drop-off by 20% and boosting
                engagement across devices.
              </li>
              <li>
                Configured cloud hosting, DNS, and deployment pipelines,
                ensuring reliability and readiness for scaling client usage.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-xl font-bold text-gray-700">
                Software Engineer & Tier 3 Engineer
              </h3>
              <span className="text-gray-600 text-sm mt-1 md:mt-0">
                June 2023 – July 2025
              </span>
            </div>
            <p className="text-gray-600 italic mb-3">Teachstone</p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>
                Built and optimized TypeScript components and Next.js APIs,
                improving platform performance by 30% and reducing wait times
                for end users.
              </li>
              <li>
                Automated backend workflows with Java and SQL, cutting
                turnaround time by 30% and enabling smoother data flow into
                AI-driven reporting tools.
              </li>
              <li>
                Designed React UIs and feedback loops with product/UX teams,
                driving 40% adoption increases across reporting tools and
                growing user retention by 15%.
              </li>
              <li>
                Triaged and resolved Salesforce tickets while collaborating
                cross-functionally, translating client issues into scalable
                product requirements.
              </li>
              <li>
                Partnered with engineering on AI-enabled features, testing
                integrations and providing structured feedback to refine
                AI-driven workflows.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-xl font-bold text-gray-700">
                AI Platform Engineer
              </h3>
              <span className="text-gray-600 text-sm mt-1 md:mt-0">
                Jan 2024 – May 2024
              </span>
            </div>
            <p className="text-gray-600 italic mb-3">Hyperlink</p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>
                Delivered the MVP of an AI-powered speech generator, integrating
                model APIs and prompt workflows that contributed to a $3.2M
                raise at SXSW 2024.
              </li>
              <li>
                Developed performant React/Next.js/TypeScript frontend features
                and optimized backend query handling, reducing load times by 30%
                for 100+ daily queries.
              </li>
              <li>
                Collaborated with product and engineering leads to define
                technical requirements, document APIs, and support a scalable
                launch.
              </li>
              <li>
                Gained hands-on exposure to LLM integration and AI product
                development, ensuring system reliability and alignment with
                user-facing use cases.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-xl font-bold text-gray-700">
                Junior Front End Developer
              </h3>
              <span className="text-gray-600 text-sm mt-1 md:mt-0">
                Feb 2023 – Feb 2024
              </span>
            </div>
            <p className="text-gray-600 italic mb-3">
              Dank Coders (Part Time Contract)
            </p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>
                Designed a 3D ecommerce site using Three.js, improving mobile UX
                and increasing daily orders by 40%.
              </li>
              <li>
                Integrated Node.js for optimized navigation and email APIs,
                cutting response times by 50% and growing orders 100%.
              </li>
              <li>
                Collaborated with the client to refine order features,
                increasing customer satisfaction by 25% and repeat orders.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-xl font-bold text-gray-700">
                Software Engineer & Developer Advocate
              </h3>
              <span className="text-gray-600 text-sm mt-1 md:mt-0">
                Sept 2021 – Feb 2023
              </span>
            </div>
            <p className="text-gray-600 italic mb-3">Career Karma</p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>
                Hosted 150+ live sessions to gather user insights, influencing
                product direction and generating 200K+ impressions across
                platforms.
              </li>
              <li>
                Developed workshops and documentation to guide users through
                workflows, directing matching 100+ students with technical
                bootcamps.
              </li>
              <li>
                Facilitated team huddles and retrospectives, strengthening
                collaboration and retention within a growing product/coach team.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <h3 className="text-xl font-bold text-gray-700">Infantryman</h3>
              <span className="text-gray-600 text-sm mt-1 md:mt-0">
                Dec 2015 – Dec 2021
              </span>
            </div>
            <p className="text-gray-600 italic mb-3">
              US Army National Guard (Deployment: Qatar, US Virgin Islands,
              Kuwait)
            </p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>
                Secured premises and personnel by patrolling entry points and
                monitoring surveillance equipment worth $45M+.
              </li>
              <li>
                Ensured the security, safety, and well-being of all personnel
                (30+) and visitors (100+ daily) on premises.
              </li>
              <li>
                Managed group of 10+ staff in creation of care packages for 700+
                residents during Hurricane Irma Humanitarian Relief.
              </li>
              <li>
                Partnered with staff from US Virgin Islands, Red Cross, and
                United Nations Leaders/Government Officials.
              </li>
              <li>
                Coordinated movements with teams of 40+ during tanks
                movements/drills and operated main gun/firing controls with team
                of 4, leading high target detection and identification of
                M1Abrams Tanks.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2 mt-12">
            Projects
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-700">
              Spring Boot Pokedex (Personal Project)
            </h3>
            <ul className="list-disc ml-5 text-gray-700 space-y-2 mt-3">
              <li>
                Built a full-stack Java + Spring Boot application using Lombok,
                Postgres, Kafka and REST APIs to manage Pokémon data.
              </li>
              <li>
                Implemented CRUD operations, authentication flows, and schema
                design, demonstrating enterprise-level Java backend development.
              </li>
              <li>
                Deployed project in a Linux environment with GitHub integration
                for CI/CD.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-700">
              Dream Net AI Dream Interpreter
            </h3>
            <ul className="list-disc ml-5 text-gray-700 space-y-2 mt-3">
              <li>
                Built an AI dream interpreter using Next.js and ChatGPT (trained
                on specialized dream data), improving interpretation accuracy by
                25% during a 30-tester beta.
              </li>
              <li>
                Implemented Supabase for user authentication and backend
                services, ensuring real-time data management and secure access.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-700">
              Automated Options Trading Bot
            </h3>
            <ul className="list-disc ml-5 text-gray-700 space-y-2 mt-3">
              <li>
                Coded a Python bot with Alpaca API and OpenAI, delivering 15%
                ROI in $100,000 paper money tests.
              </li>
              <li>
                Designed a Streamlit dashboard with advanced strategies for
                real-time trade monitoring and execution.
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2 mt-12">
            Education
          </h2>
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-700">
              Northern Community College
            </h3>
            <p className="text-gray-700">General Studies Major</p>
          </div>
        </div>
      </section>

      <section id="projects" className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200">
                <img
                  src="/dream-net.png"
                  alt="Dream Net AI Screenshot"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/800x400?text=Dream+Net+AI";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Dream Net AI
                </h3>
                <p className="text-gray-600 mb-4">
                  AI dream interpreter using Next.js and ChatGPT, trained on
                  specialized dream data with 25% improved accuracy.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Next.js
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    ChatGPT
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Supabase
                  </span>
                </div>
                <a
                  href="https://dreamy-xi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors">
                  View Project
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200">
                <img
                  src="/sokeswig.png"
                  alt="Soke2x Smoothie Shop Screenshot"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/800x400?text=Soke2x+Smoothie+Shop";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Soke2x Smoothie Shop
                </h3>
                <p className="text-gray-600 mb-4">
                  Interactive Next.js website for a smoothie brand featuring 3D
                  models, animations, and custom audio visualizers.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Next.js
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Three.js
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Howler.js
                  </span>
                </div>
                <a
                  href="https://soke2x.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors">
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 px-4 text-center">
        <p className="mb-4">
          © {new Date().getFullYear()} Lewis Meyers. All rights reserved.
        </p>
        <div className="flex justify-center items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/lewiscmeyers/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors py-1">
            LinkedIn
          </a>
          <a
            href="mailto:meyerslewis193@gmail.com"
            className="text-gray-300 hover:text-white transition-colors py-1">
            Email
          </a>
          <Link
            to="/welcome"
            className="text-purple-500 hover:text-purple-400 font-bold transition-all duration-300 passion-link-footer py-1">
            Passion Portfolio
          </Link>
        </div>
      </footer>
      <ChatWidget
        fontMode="lato"
        apiEndpoint={getApiEndpoint()}
        useRAG={true}
      />
    </div>
  );
};

export default ProfessionalPortfolio;
