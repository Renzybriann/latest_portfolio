import { useRef, useEffect, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../../utils/gsapConfig';
import { Button } from '../../shared/Button';
import { SkillList } from './SkillList';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';

export const AboutModal = ({ isVisible, onClose }) => {
  const overlayRef = useRef();
  const boxRef = useRef();
  const timelineRef = useRef();
  const [shouldRender, setShouldRender] = useState(false);

  // Memoized close handler
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Create timeline once when component mounts
  useGSAP(() => {
    if (!overlayRef.current || !boxRef.current) return;

    // Create reusable timeline
    timelineRef.current = gsap.timeline({ 
      paused: true,
      onComplete: () => {
        // Timeline completed opening
      },
      onReverseComplete: () => {
        // Animation finished closing, hide component
        setShouldRender(false);
        
        // Restore scroll
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY) * -1);
        }
      }
    })
    .set(overlayRef.current, { display: 'flex' })
    .fromTo(overlayRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.2, ease: 'power1.out' }
    )
    .fromTo(boxRef.current,
      { opacity: 0, scale: 0.98, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'power2.out' },
      "-=0.1"
    )
    .fromTo('.modal-item',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.03, duration: 0.3, ease: 'power2.out' },
      "-=0.15"
    );
  }, { dependencies: [shouldRender] });

  // Handle visibility changes
  useEffect(() => {
    if (isVisible) {
      // Show modal
      setShouldRender(true);
      
      // Prevent body scroll
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Play animation after render
      requestAnimationFrame(() => {
        timelineRef.current?.restart();
      });
    } else if (timelineRef.current && shouldRender) {
      // Hide modal with animation
      timelineRef.current.reverse();
    }
  }, [isVisible, shouldRender]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      // Restore body styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, []);

  const skills = {
    frontend: ['React & Next.js', 'JavaScript (ES6+) & TypeScript', 'HTML5 & CSS3', 'Tailwind CSS', 'Laravel', 'Python'],
    tools: ['GSAP (Animation)', 'Git & GitHub', 'Vite & Webpack', 'Figma']
  };

  // Don't render if not needed
  if (!shouldRender) return null;

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-50 hidden items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={handleClose}
      style={{ opacity: 0 }}
    >
      <div 
        ref={boxRef} 
        className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-500 bg-white dark:bg-black p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          opacity: 0,
          scrollbarWidth: 'thin',
          scrollbarColor: '#64748b transparent'
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="modal-item absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Content */}
        <div className="pr-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h3 className="modal-item mb-2 text-4xl font-bold text-slate-900 dark:text-white">Renz Matias</h3>
              <p className="modal-item mb-6 text-slate-600 dark:text-slate-300">
                A detail-oriented Front-End Developer with a passion for creating fluid, engaging, and responsive web experiences. 
                I excel at translating designs into high-quality code and leveraging modern web technologies to build intuitive user interfaces.
              </p>
              
              <div className="modal-item">
                <h4 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Education</h4>
                <EducationSection />
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <div className="modal-item mb-6">
                <h4 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Core Skills</h4>
                <div className="grid grid-cols-1 gap-6">
                  <SkillList title="Web Development" skills={skills.frontend} />
                  <SkillList title="Tools & Platforms" skills={skills.tools} />
                </div>
              </div>
              
              <div className="modal-item">
                <h4 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Experience</h4>
                <ExperienceSection />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-8">
            <Button onClick={handleClose} variant="solid" className="modal-item">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};