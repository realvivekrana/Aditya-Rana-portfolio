import CrudManager from "../../components/common/CrudManager";
import { achievementApi } from "../../api/services";
import { formatDate } from "../../utils/format";

const fields = [
  { name: "title", label: "Title", required: true, full: true },
  { name: "date", label: "Date", type: "date" },
  { name: "description", label: "Description", type: "textarea", full: true },
];

const ManageAchievements = () => (
  <CrudManager
    api={achievementApi}
    title="Achievements"
    singular="achievement"
    fields={fields}
    hasImage
    imageLabel="Photo (optional)"
    getTitle={(i) => i.title}
    getSubtitle={(i) => i.description}
    getBadges={(i) => [formatDate(i.date)]}
  />
);

export default ManageAchievements;