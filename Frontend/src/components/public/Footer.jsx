import { FiArrowUp } from "react-icons/fi";
import { useSite } from "../../context/SiteContext";
import SocialLinks from "../common/SocialLinks";

const Footer = () => {
  const { profile, settings } = useSite();
  const name = profile.fullName || settings.siteTitle || "Portfolio";
  const text = settings.footerText || `© ${new Date().getFullYear()} ${name}. All rights reserved.`;

  return (
    <footer className="bg-deep pb-[max(2rem,env(safe-area-inset-bottom))] pt-14 text-white">
      <div className="container-x flex flex-col items-center gap-6 text-center">
        <p className="font-display text-3xl font-semibold">{name}</p>
        {profile.tagline && <p className="max-w-xl text-sm text-white/65">{profile.tagline}</p>}

        <SocialLinks socials={profile.socials} className="justify-center" />

        <div className="h-px w-full max-w-xs bg-gold/30" />

        <div className="flex w-full flex-col items-center justify-between gap-4 text-sm text-white/60 sm:flex-row">
          <p>{text}</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-white/80 transition hover:border-gold hover:text-gold"
          >
            <FiArrowUp size={16} />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;