import CrudManager from "../../components/common/CrudManager";
import { blogApi } from "../../api/services";

const fields = [
  { name: "title", label: "Title", required: true, full: true },
  { name: "excerpt", label: "Short summary", type: "textarea", rows: 2, full: true, help: "Shown on the blog cards (1–2 sentences)." },
  { name: "tags", label: "Tags", type: "tags", placeholder: "Health, Pharmacy", full: true, help: "Separate tags with commas." },
  {
    name: "content",
    label: "Article content",
    type: "textarea",
    rows: 12,
    full: true,
    help: "Write plain text (leave a blank line between paragraphs). Basic HTML such as <h2>, <b>, <ul> and <a> is also supported.",
  },
];

const ManageBlogs = () => (
  <CrudManager
    api={blogApi}
    title="Blogs"
    singular="blog post"
    fields={fields}
    hasImage
    imageLabel="Cover image"
    getTitle={(i) => i.title}
    getSubtitle={(i) => `/blog/${i.slug}`}
    getBadges={(i) => [`${i.views} views`]}
  />
);

export default ManageBlogs;