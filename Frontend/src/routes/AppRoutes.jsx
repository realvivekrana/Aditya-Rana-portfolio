import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import NotFound from "../pages/public/NotFound";
import Loader from "../components/common/Loader";

// Admin pages and the blog page are loaded on demand to keep the public bundle small
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const BlogDetails = lazy(() => import("../pages/public/BlogDetails"));
const Login = lazy(() => import("../pages/admin/Login"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const ManageProfile = lazy(() => import("../pages/admin/ManageProfile"));
const ManageEducation = lazy(() => import("../pages/admin/ManageEducation"));
const ManageSkills = lazy(() => import("../pages/admin/ManageSkills"));
const ManageExperience = lazy(() => import("../pages/admin/ManageExperience"));
const ManageProjects = lazy(() => import("../pages/admin/ManageProjects"));
const ManageCertificates = lazy(() => import("../pages/admin/ManageCertificates"));
const ManageAchievements = lazy(() => import("../pages/admin/ManageAchievements"));
const ManagePublications = lazy(() => import("../pages/admin/ManagePublications"));
const ManageGallery = lazy(() => import("../pages/admin/ManageGallery"));
const ManageBlogs = lazy(() => import("../pages/admin/ManageBlogs"));
const Messages = lazy(() => import("../pages/admin/Messages"));
const Settings = lazy(() => import("../pages/admin/Settings"));

const AppRoutes = () => (
  <Suspense fallback={<Loader fullScreen />}>
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />
    </Route>

    <Route path="/admin/login" element={<Login />} />

    <Route path="/admin" element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<ManageProfile />} />
        <Route path="education" element={<ManageEducation />} />
        <Route path="skills" element={<ManageSkills />} />
        <Route path="experience" element={<ManageExperience />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="certificates" element={<ManageCertificates />} />
        <Route path="achievements" element={<ManageAchievements />} />
        <Route path="publications" element={<ManagePublications />} />
        <Route path="gallery" element={<ManageGallery />} />
        <Route path="blogs" element={<ManageBlogs />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
  </Suspense>
);

export default AppRoutes;