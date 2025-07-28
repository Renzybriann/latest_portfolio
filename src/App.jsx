import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/shared/ThemeToggle';
import { ContentSection } from './components/sections/ContentSection';
import { ProjectSection } from './components/sections/ProjectSection';
import { TechSection } from './components/sections/TechSection';
import { Button } from './components/shared/Button';
import { LinkButton } from './components/shared/LinkButton';
import { projectsData } from './data/projects';

export default function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <main className="bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
        <ContentSection 
          title="Hello, I'm Renz." 
          text="I build dynamic and responsive web applications from concept to deployment."
          isFirst={true}
        >
          <Button variant="outline">
            Know More About Me
          </Button>
        </ContentSection>

        {projectsData.map((project, index) => (
          <ProjectSection key={index} {...project} />
        ))}

        <TechSection />

        <ContentSection 
          title="Let's Build Something Great." 
          text="Have a project in mind? I'm currently available for freelance opportunities." 
        >
          <LinkButton href="mailto:email@example.com" variant="solid">
            Get in Touch
          </LinkButton>
        </ContentSection>
      </main>
    </ThemeProvider>
  );
}