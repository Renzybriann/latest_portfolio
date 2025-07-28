export const ProjectImage = ({ imageUrl, title }) => (
  <div>
    <img src={imageUrl} alt={title} className="rounded-lg shadow-2xl" />
  </div>
);