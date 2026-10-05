import CrudManager from "../../components/common/CrudManager";
import { skillApi } from "../../api/services";

const fields = [
  { name: "name", label: "Skill name", required: true, placeholder: "Pharmacology", full: true },
  { name: "category", label: "Category", placeholder: "Pharmaceutical, Laboratory, Software...", default: "General", help: "Skills with the same category are grouped together." },
  { name: "level", label: "Proficiency (0–100)", type: "number", min: 0, max: 100, default: 80 },
];

const ManageSkills = () => (
  <CrudManager
    api={skillApi}
    title="Skills"
    singular="skill"
    fields={fields}
    getTitle={(i) => i.name}
    getSubtitle={(i) => i.category}
    getBadges={(i) => [`${i.level}%`]}
  />
);

export default ManageSkills;