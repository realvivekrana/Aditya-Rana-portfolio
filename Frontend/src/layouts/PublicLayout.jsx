import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  achievementApi,
  blogApi,
  certificateApi,
  educationApi,
  experienceApi,
  galleryApi,
  profileApi,
  projectApi,
  publicationApi,
  settingsApi,
  skillApi,
} from "../api/services";
import useFetch from "../hooks/useFetch";
import Loader from "../components/common/Loader";
import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";
import { SiteContext } from "../context/SiteContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

// Profile and settings are required; the section lists fall back to empty arrays
const loadSite = async () => {
  const safe = (promise) => promise.catch(() => []);

  const [
    profile,
    settings,
    education,
    skills,
    experience,
    projects,
    publications,
    certificates,
    achievements,
    gallery,
    blogs,
  ] = await Promise.all([
    profileApi.get(),
    settingsApi.get(),
    safe(educationApi.getAll()),
    safe(skillApi.getAll()),
    safe(experienceApi.getAll()),
    safe(projectApi.getAll()),
    safe(publicationApi.getAll()),
    safe(certificateApi.getAll()),
    safe(achievementApi.getAll()),
    safe(galleryApi.getAll()),
    safe(blogApi.getAll()),
  ]);

  return {
    profile,
    settings,
    data: { education, skills, experience, projects, publications, certificates, achievements, gallery, blogs },
  };
};

const setMeta = (name, content) => {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const Shell = () => {
  const { dark } = useTheme();

  return (
    <div className={`theme-public min-h-screen font-sans ${dark ? "dark" : ""}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-deep"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const PublicLayout = () => {
  const { data: site, loading, error, refetch } = useFetch(loadSite);

  useEffect(() => {
    if (!site) return;
    const { settings, profile } = site;
    document.title = settings.siteTitle || profile.fullName || "Portfolio";
    setMeta("description", settings.siteDescription || profile.tagline);
    setMeta("keywords", settings.keywords?.join(", "));
  }, [site]);

  if (loading) return <Loader fullScreen />;

  if (error || !site) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-4xl font-semibold">We could not load the website</h1>
        <p className="max-w-md text-slate-500">
          Please check your internet connection and try again in a moment.
        </p>
        <button onClick={refetch} className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">
          Try again
        </button>
      </div>
    );
  }

  return (
    <SiteContext.Provider value={site}>
      <ThemeProvider defaultMode={site.settings.defaultMode}>
        <Shell />
      </ThemeProvider>
    </SiteContext.Provider>
  );
};

export default PublicLayout;