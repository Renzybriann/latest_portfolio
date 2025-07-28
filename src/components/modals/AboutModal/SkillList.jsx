export const SkillList = ({ title, skills }) => (
  <div>
    <h5 className="mb-2 font-semibold text-slate-100">{title}</h5>
    <ul className="list-disc list-inside text-slate-200">
      {skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </div>
);