export const formatDate = (value, options = { month: "short", year: "numeric" }) =>
  value ? new Date(value).toLocaleDateString("en-US", options) : "";

export const formatLongDate = (value) =>
  formatDate(value, { day: "numeric", month: "long", year: "numeric" });

export const formatRange = (start, end, current = false) =>
  [formatDate(start), current ? "Present" : formatDate(end)].filter(Boolean).join(" – ");

// "2024-05-01T00:00:00.000Z" -> "2024-05-01" (for <input type="date">)
export const toInputDate = (value) => (value ? new Date(value).toISOString().slice(0, 10) : "");

export const ensureUrl = (url = "") => {
  const value = url.trim();
  if (!value) return "";
  return /^(https?:|mailto:|tel:)/i.test(value) ? value : `https://${value}`;
};

export const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "AR";

export const looksLikeHtml = (text = "") => /<\/?[a-z][\s\S]*>/i.test(text);

export const escapeHtml = (text = "") =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Plain text -> paragraphs (blank line = new paragraph)
export const textToHtml = (text = "") =>
  text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br />")}</p>`)
    .join("");

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};