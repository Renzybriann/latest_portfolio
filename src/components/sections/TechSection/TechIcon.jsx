export const TechIcon = ({ tech }) => (
  <div className="tech-icon flex flex-col items-center gap-2">
    <i className={`${tech.class} text-6xl`}></i>
    <span className="text-sm">{tech.name}</span>
  </div>
);