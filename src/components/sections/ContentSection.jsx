import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../utils/gsapConfig';
import { AboutModal } from '../modals/AboutModal';

export const ContentSection = ({ title, text, children, isFirst = false }) => {
  const sectionRef = useRef();
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  useGSAP(() => {
    if (isFirst) {
      gsap.set(sectionRef.current.querySelectorAll("h2, p, button"), { opacity: 1 });
      return;
    }
    gsap.from(sectionRef.current.querySelectorAll("h2, p, button"), {
      opacity: 0, 
      y: 50, 
      stagger: 0.1, 
      duration: 1, 
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current, 
        start: 'top 80%', 
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  return (
    <>
      <section ref={sectionRef} className="flex min-h-screen w-full items-center justify-center p-8 text-center">
        <div className="w-full max-w-4xl">
          <h2 className="mb-4 text-5xl font-bold">{title}</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 transition-colors duration-300">{text}</p>
          {children && (
            <div 
              className="mt-6 inline-block"
              onMouseEnter={() => title.includes("Renz") && setIsAboutVisible(true)}
            >
              {children}
            </div>
          )}
        </div>
      </section>
      {title.includes("Renz") && (
        <AboutModal isVisible={isAboutVisible} onClose={() => setIsAboutVisible(false)} />
      )}
    </>
  );
};