import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowDown, FiDownload, FiMail } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import SocialLinks from "../common/SocialLinks";
import { getInitials, scrollToId } from "../../utils/format";

const Hero = () => {
  const { profile, settings } = useSite();
  const name = profile.fullName || settings.siteTitle || "Portfolio";
  const roles = profile.roles || [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (roles.length < 2) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  const contactEnabled = settings.sections?.contact !== false;

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-deep pb-16 pt-28 text-white"
    >
      <div className="bg-hex absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-gold-soft">
            Welcome to my portfolio
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            {name}
          </h1>

          {roles.length > 0 && (
            <div className="mt-5 h-9 overflow-hidden font-display text-2xl italic text-gold sm:text-3xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roles[index]}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {roles[index]}
                </motion.p>
              </AnimatePresence>
            </div>
          )}

          {profile.tagline && (
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">
              {profile.tagline}
            </p>
          )}

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            {contactEnabled && (
              <button
                onClick={() => scrollToId("contact")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold tracking-wide text-deep transition hover:brightness-110"
              >
                <FiMail size={16} />
                Get in touch
              </button>
            )}
            {profile.resume?.url && (
              <a
                href={profile.resume.url}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 px-7 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-gold/10"
              >
                <FiDownload size={16} />
                Download resume
              </a>
            )}
          </div>

          <SocialLinks socials={profile.socials} className="mt-8 justify-center lg:justify-start" />
        </div>

        <div className="order-1 mx-auto w-full max-w-[220px] min-[400px]:max-w-[260px] sm:max-w-xs lg:order-2 lg:max-w-sm">
          <div className="relative">
            <div className="absolute -inset-3 rounded-t-full border border-gold/40" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full border border-gold/60 bg-primary/40">
              {profile.photo?.url ? (
                <img
                  src={profile.photo.url}
                  alt={name}
                  className="h-full w-full object-cover"
                  fetchPriority="high"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-display text-8xl text-gold/80">
                  {getInitials(name)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToId("about")}
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/25 text-white/70 transition hover:border-gold hover:text-gold sm:flex"
      >
        <FiArrowDown size={18} />
      </button>
    </section>
  );
};

export default Hero;