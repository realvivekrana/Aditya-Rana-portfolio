import CrudManager from "../../components/common/CrudManager";
import { galleryApi } from "../../api/services";

const fields = [
  { name: "title", label: "Title", full: true },
  { name: "category", label: "Category", default: "General", placeholder: "Events, Lab, College...", help: "Used for the filter buttons on the website." },
  { name: "caption", label: "Caption", type: "textarea", full: true, rows: 3 },
];

const ManageGallery = () => (
  <CrudManager
    api={galleryApi}
    title="Gallery"
    singular="photo"
    fields={fields}
    hasImage
    imageRequired
    imageLabel="Photo"
    getTitle={(i) => i.title || i.caption || "Untitled photo"}
    getSubtitle={(i) => i.category}
  />
);

export default ManageGallery;