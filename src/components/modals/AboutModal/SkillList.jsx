export const SkillList = ({ title, skills }) => (
  <div>
    <h5 className="mb-2 font-semibold ">{title}</h5>
    <ul className="list-disc list-inside ">
      {skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </div>
);