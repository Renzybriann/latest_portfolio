import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../../utils/gsapConfig';
import { Button } from '../../shared/Button';
import { SkillList } from './SkillList';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';

export const AboutModal = ({ isVisible, onClose }) => {
  const overlayRef = useRef();
  const boxRef = useRef();
  const animationRef = useRef();
  const [isRendered, setIsRendered] = useState(false);

  // Initialize GSAP timeline
  useGSAP(() => {
    if (!overlayRef.current || !boxRef.current) return;

    // Create timeline
    animationRef.current = gsap.timeline({ paused: true });
    animationRef.current
      .fromTo(overlayRef.current, 
        { opacity: 0, pointerEvents: 'none' },
        { opacity: 1, duration: 0.3, ease: 'power1.inOut', pointerEvents: 'auto' }
      )
      .fromTo(boxRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        "-=0.2"
      )
      .fromTo(boxRef.current.querySelectorAll(".animate-item"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out' },
        "-=0.2"
      );
  }, { dependencies: [isRendered], scope: overlayRef });

  // Handle visibility changes
  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Prevent layout shift
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      
      // Wait for render then animate
      setTimeout(() => {
        if (animationRef.current) {
          animationRef.current.play();
        }
      }, 50);
    } else if (animationRef.current && isRendered) {
      // Reverse animation
      animationRef.current.reverse().then(() => {
        // Restore scrollbar
        document.body.style.overflow = '';
        document.documentElement.style.paddingRight = '';
        // Unmount component
        setIsRendered(false);
      });
    }
    
    return () => {
      // Cleanup
      document.body.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    };
  }, [isVisible, isRendered]);

  const skills = {
    frontend: ['React & Next.js', 'JavaScript (ES6+) & TypeScript', 'HTML5 & CSS3', 'Tailwind CSS', 'Laravel', 'Python'],
    tools: ['GSAP (Animation)', 'Git & GitHub', 'Vite & Webpack', 'Figma']
  };

  // Don't render if not visible and not animating
  if (!isRendered) return null;

  return (
    <div 
  ref={overlayRef} 
  className="fixed inset-0 z-50 bg-white/60 dark:bg-black/60 backdrop-blur-md transition-colors duration-300"
  onClick={onClose}
>
  <div className="relative flex h-full items-center justify-center p-4">
    <div 
      ref={boxRef} 
      className="relative max-h-[85vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-slate-200 dark:border-white/20 bg-white/90 dark:bg-slate-900/80 p-10 shadow-2xl backdrop-blur-lg"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 120px rgba(255, 255, 255, 0.15)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            opacity: 0
          }}
        >
          <style>{`
            .modal-content::-webkit-scrollbar {
              display: none;
            }
            
            /* Smooth transition for padding changes */
            html {
              transition: padding-right 0.3s ease;
            }
          `}</style>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-slate-300 hover:text-white transition-colors animate-item z-10"
            aria-label="Close modal"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Content wrapper */}
          <div className="modal-content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Personal Info */}
              <div>
                 {/* Update text colors throughout the modal */}
      <h3 className="mb-2 text-4xl font-bold animate-item text-slate-900 dark:text-white">Renz Matias</h3>
      <p className="mb-6 text-slate-600 dark:text-slate-200 animate-item">
                  A detail-oriented Front-End Developer with a passion for creating fluid, engaging, and responsive web experiences. 
                  I excel at translating designs into high-quality code and leveraging modern web technologies to build intuitive user interfaces.
                </p>
                
                <div className="animate-item">
                  <h4 className="mb-4 text-2xl font-bold animate-item text-slate-900 dark:text-white">Education</h4>
                  <EducationSection />
                </div>
              </div>
              
              {/* Right Column - Skills & Experience */}
              <div>
                <div className="mb-6 animate-item">
                  <h4 className="mb-4 text-2xl font-bold animate-item text-slate-900 dark:text-white">Core Skills</h4>
                  <div className="grid grid-cols-1 gap-6">
                    <SkillList title="Web Development" skills={skills.frontend} />
                    <SkillList title="Tools & Platforms" skills={skills.tools} />
                  </div>
                </div>
                
                <div className="animate-item">
                  <h4 className="mb-4 text-2xl font-bold animate-item text-slate-900 dark:text-white">Experience</h4>
                  <ExperienceSection />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <Button onClick={onClose} variant="solid" className="animate-item">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};