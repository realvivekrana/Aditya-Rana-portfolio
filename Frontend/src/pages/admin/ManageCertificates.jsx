import CrudManager from "../../components/common/CrudManager";
import { certificateApi } from "../../api/services";
import { formatDate } from "../../utils/format";

const fields = [
  { name: "title", label: "Certificate title", required: true, full: true },
  { name: "issuer", label: "Issued by", required: true, placeholder: "Organization name" },
  { name: "issueDate", label: "Issue date", type: "date" },
  { name: "credentialId", label: "Credential ID" },
  { name: "credentialUrl", label: "Credential URL", type: "url", placeholder: "https://..." },
];

const ManageCertificates = () => (
  <CrudManager
    api={certificateApi}
    title="Certificates"
    singular="certificate"
    fields={fields}
    hasImage
    imageLabel="Certificate image"
    getTitle={(i) => i.title}
    getSubtitle={(i) => i.issuer}
    getBadges={(i) => [formatDate(i.issueDate)]}
  />
);

export default ManageCertificates;