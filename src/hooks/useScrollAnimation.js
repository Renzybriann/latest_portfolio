import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../utils/gsapConfig';

export const useScrollAnimation = (animationConfig) => {
  const ref = useRef();
  
  useGSAP(() => {
    if (animationConfig) {
      animationConfig(ref.current);
    }
  }, { scope: ref });
  
  return ref;
};