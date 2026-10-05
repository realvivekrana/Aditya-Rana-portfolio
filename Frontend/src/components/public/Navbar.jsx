import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import { useTheme } from "../../context/ThemeContext";
import { getInitials, scrollToId } from "../../utils/format";
import { getVisibleSections } from "../../utils/sections";

const Navbar = () => {
  const { profile, settings, data } = useSite();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // "Home" replaces the old "About" menu item and scrolls to the top (hero) section
  const links = useMemo(
    () => [
      { id: "home", label: "Home" },
      ...getVisibleSections(profile, settings, data).filter((section) => section.id !== "about"),
    ],
    [profile, settings, data]
  );
  const name = profile.fullName || settings.siteTitle || "Portfolio";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    if (!isHome) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [links, isHome]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (id) => {
    setOpen(false);
    if (isHome) scrollToId(id);
    else navigate(`/#${id}`);
  };

  const goHome = () => {
    setOpen(false);
    if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
    else navigate("/");
  };

  const solid = scrolled || open || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        solid ? "border-b border-gold/20 bg-deep/95 shadow-lg backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main navigation">
        <button onClick={goHome} className="flex items-center gap-3 text-white" aria-label="Go to top">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold font-display text-lg text-gold">
            {getInitials(name)}
          </span>
          <span className="hidden whitespace-nowrap font-display text-xl font-semibold sm:block xl:hidden 2xl:block">
            {name}
          </span>
        </button>

        <ul className="hidden items-center gap-1 xl:flex">
          {links.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => goTo(id)}
                className={`rounded-full px-3 py-2 text-[13px] font-medium tracking-wide transition ${
                  active === id && isHome ? "text-gold" : "text-white/80 hover:text-gold"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-gold"
          >
            {dark ? <FiSun size={19} /> : <FiMoon size={19} />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10 xl:hidden"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      {open && (
        <div className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-gold/20 bg-deep xl:hidden">
          <ul className="container-x flex flex-col py-4">
            {links.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => goTo(id)}
                  className={`flex w-full items-center justify-between border-b border-white/10 py-4 text-left font-display text-2xl ${
                    active === id && isHome ? "text-gold" : "text-white"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;