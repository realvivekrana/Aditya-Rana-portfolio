import CrudManager from "../../components/common/CrudManager";
import { publicationApi } from "../../api/services";
import { formatDate } from "../../utils/format";

const fields = [
  { name: "title", label: "Title", required: true, full: true },
  { name: "type", label: "Type", type: "select", options: ["Research Paper", "Poster", "Seminar", "Presentation", "Article", "Other"] },
  { name: "date", label: "Date", type: "date" },
  { name: "venue", label: "Journal / Conference / Venue", full: true },
  { name: "authors", label: "Authors", placeholder: "A. Rana, B. Sharma", full: true },
  { name: "link", label: "Link", type: "url", placeholder: "https://...", full: true },
  { name: "description", label: "Description", type: "textarea", full: true },
];

const ManagePublications = () => (
  <CrudManager
    api={publicationApi}
    title="Publications"
    singular="publication"
    fields={fields}
    hasImage
    imageLabel="Cover image (optional)"
    getTitle={(i) => i.title}
    getSubtitle={(i) => i.venue || i.authors}
    getBadges={(i) => [i.type, formatDate(i.date)]}
  />
);

export default ManagePublications;