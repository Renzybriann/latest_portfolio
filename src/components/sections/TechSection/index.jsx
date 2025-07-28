import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../../utils/gsapConfig';
import { TechIcon } from './TechIcon';
import { technologies } from '../../../data/technologies';

export const TechSection = () => {
  const sectionRef = useRef();
  
  useGSAP(() => {
    gsap.from(sectionRef.current.querySelectorAll('h2, .tech-icon'), {
      opacity: 0, 
      y: 50, 
      stagger: 0.1, 
      duration: 1, 
      ease: 'power2.out',
      scrollTrigger: { 
        trigger: sectionRef.current, 
        start: 'top 80%', 
        toggleActions: 'play none none reverse' 
      },
    });
  }, { scope: sectionRef });
  
  return (
    // Update the section background if needed:
    <section ref={sectionRef} className="panel flex min-h-screen w-full flex-col items-center justify-center p-8 bg-slate-50 dark:bg-black transition-colors duration-300">
      <h2 className="mb-12 text-center text-5xl font-bold">My Toolkit</h2>
      <div className="flex max-w-2xl flex-wrap justify-center gap-8">
        {technologies.map((tech) => (
          <TechIcon key={tech.name} tech={tech} />
        ))}
      </div>
    </section>
  );
};