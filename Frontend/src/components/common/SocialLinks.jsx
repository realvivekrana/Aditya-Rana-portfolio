import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { ensureUrl } from "../../utils/format";

const ICONS = {
  linkedin: { icon: FaLinkedinIn, label: "LinkedIn" },
  github: { icon: FaGithub, label: "GitHub" },
  twitter: { icon: FaTwitter, label: "Twitter" },
  instagram: { icon: FaInstagram, label: "Instagram" },
  facebook: { icon: FaFacebookF, label: "Facebook" },
  website: { icon: FiGlobe, label: "Website" },
};

const SocialLinks = ({ socials = {}, className = "", tone = "light" }) => {
  const items = Object.entries(ICONS).filter(([key]) => socials[key]);
  if (items.length === 0) return null;

  const toneClass =
    tone === "light"
      ? "border-white/25 text-white/80 hover:border-gold hover:text-gold"
      : "border-line text-muted hover:border-gold hover:text-gold";

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {items.map(([key, { icon: Icon, label }]) => (
        <li key={key}>
          <a
            href={ensureUrl(socials[key])}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${toneClass}`}
          >
            <Icon size={16} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;