// Decides which public sections are visible (enabled in Settings AND have content).
export const getVisibleSections = (profile = {}, settings = {}, data = {}) => {
  const enabled = (key) => settings.sections?.[key] !== false;
  const has = (list) => Array.isArray(list) && list.length > 0;

  const sections = [
    { id: "about", label: "About", show: Boolean(profile.bio || profile.email || profile.phone || profile.location) },
    { id: "education", label: "Education", show: enabled("education") && has(data.education) },
    { id: "skills", label: "Skills", show: enabled("skills") && has(data.skills) },
    { id: "experience", label: "Experience", show: enabled("experience") && has(data.experience) },
    { id: "projects", label: "Projects", show: enabled("projects") && has(data.projects) },
    { id: "publications", label: "Publications", show: enabled("publications") && has(data.publications) },
    { id: "certificates", label: "Certificates", show: enabled("certificates") && has(data.certificates) },
    { id: "achievements", label: "Achievements", show: enabled("achievements") && has(data.achievements) },
    { id: "gallery", label: "Gallery", show: enabled("gallery") && has(data.gallery) },
    { id: "blog", label: "Blog", show: enabled("blog") && has(data.blogs) },
    { id: "contact", label: "Contact", show: enabled("contact") },
  ];

  return sections.filter((section) => section.show);
};