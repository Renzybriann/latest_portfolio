import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../../utils/gsapConfig';
import { ProjectInfo } from './ProjectInfo';
import { ProjectImage } from './ProjectImage';

export const ProjectSection = ({ title, description, imageUrl, techStack = [], liveUrl, repoUrl }) => {
  const sectionRef = useRef();
  
  useGSAP(() => {
    // Set initial state to ensure elements are visible after animation
    const elements = sectionRef.current.querySelectorAll('h2, p, .tech-pill, .link-button, a, img');
    
    gsap.set(elements, { opacity: 0, y: 50 });
    
    gsap.to(elements, {
      opacity: 1, 
      y: 0, 
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
    <section ref={sectionRef} className="flex min-h-screen w-full items-center justify-center p-8">
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <ProjectInfo 
          title={title}
          description={description}
          techStack={techStack}
          liveUrl={liveUrl}
          repoUrl={repoUrl}
        />
        <ProjectImage imageUrl={imageUrl} title={title} />
      </div>
    </section>
  );
};