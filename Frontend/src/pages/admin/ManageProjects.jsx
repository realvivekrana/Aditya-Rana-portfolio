import CrudManager from "../../components/common/CrudManager";
import { projectApi } from "../../api/services";

const fields = [
  { name: "title", label: "Project title", required: true, full: true },
  { name: "category", label: "Category", default: "Academic", placeholder: "Academic, Research, Mini Project..." },
  { name: "link", label: "Project link", type: "url", placeholder: "https://..." },
  { name: "tags", label: "Tags", type: "tags", placeholder: "Pharmacology, Research, Lab", full: true, help: "Separate tags with commas." },
  { name: "description", label: "Description", type: "textarea", full: true, rows: 5 },
  { name: "featured", label: "Mark as featured", type: "checkbox", full: true },
];

const ManageProjects = () => (
  <CrudManager
    api={projectApi}
    title="Projects"
    singular="project"
    fields={fields}
    hasImage
    imageLabel="Cover image"
    getTitle={(i) => i.title}
    getSubtitle={(i) => i.category}
    getBadges={(i) => [i.featured ? "Featured" : ""]}
  />
);

export default ManageProjects;