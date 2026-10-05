import CrudManager from "../../components/common/CrudManager";
import { educationApi } from "../../api/services";

const fields = [
  { name: "degree", label: "Degree / Qualification", required: true, placeholder: "B.Pharm", full: true },
  { name: "institution", label: "Institution", required: true, placeholder: "University / College name", full: true },
  { name: "field", label: "Field of study", placeholder: "Pharmacy" },
  { name: "grade", label: "Grade / CGPA", placeholder: "8.5 CGPA" },
  { name: "startYear", label: "Start year", placeholder: "2022" },
  { name: "endYear", label: "End year", placeholder: "2026 or Present" },
  { name: "description", label: "Description", type: "textarea", full: true },
];

const ManageEducation = () => (
  <CrudManager
    api={educationApi}
    title="Education"
    singular="education"
    fields={fields}
    getTitle={(i) => i.degree}
    getSubtitle={(i) => i.institution}
    getBadges={(i) => [[i.startYear, i.endYear].filter(Boolean).join(" – ")]}
  />
);

export default ManageEducation;