import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'; 

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('gsap').then(({ gsap, Power2 }) => {
      import('gsap/CSSRulePlugin').then(({ CSSRulePlugin }) => {
        gsap.registerPlugin(CSSRulePlugin);
      });
    });
  }, []);

  const transition = () => {
    setIsTransitioning(true);
    
    import('gsap').then(({ gsap }) => {
      import('gsap/CSSRulePlugin').then(({ CSSRulePlugin }) => {
        gsap.registerPlugin(CSSRulePlugin);
        const tl = gsap.timeline({
          onComplete: () => {
            setIsTransitioning(false);
            navigate('/home');
          }
        });

        tl.to('body:before', { duration: 0.3, cssRule: { top: '50%' }, ease: "power2.out" })
          .to('body:after', { duration: 0.3, cssRule: { bottom: '50%' }, ease: "power2.out" }, "<")
          .to(loaderRef.current, { duration: 0.3, opacity: 1 })
          .to(loaderRef.current, { duration: 1.5, opacity: 1 }) // Hold the loader visible
          .to('body:before', { duration: 0.3, cssRule: { top: '0%' }, ease: "power2.out" })
          .to('body:after', { duration: 0.3, cssRule: { bottom: '0%' }, ease: "power2.out" }, "<")
          .to(loaderRef.current, { duration: 0.3, opacity: 0 }, "<");
      });
    });
  };

  const handleEnter = () => {
    setIsAnimating(true);
    
    transition();
  };

  return (
    <>
      <div className="loader" ref={loaderRef}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
      </div>
      
      <div 
        className={`flex flex-col justify-center items-center h-screen bg-cover bg-center font-pixel text-white text-center welcome-background ${isAnimating ? 'fade-out' : ''}`}
        style={{ 
          backgroundImage: "url('/pixel_desert_night.jpg')",
        }}
      >
        <h1 className="text-2xl md:text-3xl mb-4 font-bold shadow-text">
          Welcome to Lewis.dev
        </h1>
        <p className="mb-8">Time to get shwifty</p>
        <div className="text-2xl animate-bounce mb-6">&#8595;</div>
        <button 
          onClick={handleEnter}
          className="font-pixel py-2 px-6 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors duration-300"
          disabled={isAnimating || isTransitioning}
        >
          Enter
        </button>
      </div>
    </>
  );
};

export default Welcome;