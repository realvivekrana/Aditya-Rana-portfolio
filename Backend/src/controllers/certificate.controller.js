import Certificate from "../models/Certificate.model.js";
import createCrudController from "../utils/createCrudController.js";

export default createCrudController(Certificate, {
  name: "Certificate",
  folder: "certificates",
  hasImage: true,
  allowedFields: ["title", "issuer", "issueDate", "credentialId", "credentialUrl", "isPublished"],
});