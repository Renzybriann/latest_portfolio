import { TechPill } from '../../shared/TechPill';
import { LinkButton } from '../../shared/LinkButton';

export const ProjectInfo = ({ title, description, techStack, liveUrl, repoUrl }) => (
  <div className="flex flex-col gap-4 text-center md:text-left">
    <h2 className="text-5xl font-bold">{title}</h2>
    <p className="text-xl dark:text-slate-300">{description}</p>
    <div className="flex flex-wrap justify-center gap-2 md:justify-start">
      {techStack.map(tech => <TechPill key={tech} tech={tech} />)}
    </div>
    <div className="mt-4 flex justify-center gap-4 md:justify-start">
      {liveUrl && (
        <LinkButton 
          href={liveUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="link-button"
        >
          Live Site
        </LinkButton>
      )}
      {repoUrl && (
        <LinkButton 
          href={repoUrl} 
          variant="outline" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="link-button"
        >
          GitHub
        </LinkButton>
      )}
    </div>
  </div>
);