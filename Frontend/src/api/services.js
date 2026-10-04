import api from "./axios";

// backend response: { success, statusCode, message, data } -> sirf data return
const unwrap = (promise) => promise.then((res) => res.data.data);

export const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

// Backend ke CRUD factory ke saath match karta hai
const crud = (path) => ({
  getAll: () => unwrap(api.get(path)),
  getAllAdmin: () => unwrap(api.get(`${path}/admin/all`)),
  create: (data) => unwrap(api.post(path, data)), // JSON ya FormData dono
  update: (id, data) => unwrap(api.put(`${path}/${id}`, data)),
  remove: (id) => unwrap(api.delete(`${path}/${id}`)),
  reorder: (ids) => unwrap(api.put(`${path}/reorder`, { ids })),
});

export const authApi = {
  login: (email, password) => unwrap(api.post("/auth/login", { email, password })),
  me: () => unwrap(api.get("/auth/me")),
  changePassword: (currentPassword, newPassword) =>
    unwrap(api.put("/auth/change-password", { currentPassword, newPassword })),
};

export const profileApi = {
  get: () => unwrap(api.get("/profile")),
  update: (formData) => unwrap(api.put("/profile", formData)),
};

export const educationApi = crud("/education");
export const skillApi = crud("/skills");
export const experienceApi = crud("/experience");
export const certificateApi = crud("/certificates");
export const achievementApi = crud("/achievements");
export const projectApi = crud("/projects");
export const publicationApi = crud("/publications");
export const galleryApi = crud("/gallery");
export const blogApi = {
  ...crud("/blogs"),
  getBySlug: (slug) => unwrap(api.get(`/blogs/slug/${slug}`)),
};

export const messageApi = {
  send: (data) => unwrap(api.post("/messages", data)),
  getAll: (unreadOnly = false) =>
    unwrap(api.get("/messages", { params: unreadOnly ? { unread: true } : {} })),
  markRead: (id, isRead = true) => unwrap(api.patch(`/messages/${id}/read`, { isRead })),
  remove: (id) => unwrap(api.delete(`/messages/${id}`)),
};

export const settingsApi = {
  get: () => unwrap(api.get("/settings")),
  update: (data) => unwrap(api.put("/settings", data)),
};

export const dashboardApi = {
  stats: () => unwrap(api.get("/dashboard")),
};