import CrudManager from "../../components/common/CrudManager";
import { experienceApi } from "../../api/services";
import { formatRange } from "../../utils/format";

const fields = [
  { name: "title", label: "Role / Title", required: true, placeholder: "Pharmacy Intern", full: true },
  { name: "organization", label: "Organization", required: true, placeholder: "Company / Hospital name" },
  { name: "location", label: "Location", placeholder: "City, Country" },
  { name: "type", label: "Type", type: "select", options: ["Internship", "Training", "Job", "Volunteer", "Other"] },
  { name: "current", label: "I currently work here", type: "checkbox" },
  { name: "startDate", label: "Start date", type: "date" },
  { name: "endDate", label: "End date", type: "date", showIf: (v) => !v.current },
  { name: "description", label: "Description", type: "textarea", full: true, rows: 5 },
];

const ManageExperience = () => (
  <CrudManager
    api={experienceApi}
    title="Experience"
    singular="experience"
    fields={fields}
    hasImage
    imageLabel="Organization logo (optional)"
    getTitle={(i) => i.title}
    getSubtitle={(i) => i.organization}
    getBadges={(i) => [i.type, formatRange(i.startDate, i.endDate, i.current)]}
  />
);

export default ManageExperience;