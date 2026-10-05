import Reveal from "./Reveal";

const SectionTitle = ({ eyebrow, title, subtitle, center = true }) => (
  <Reveal className={`mb-12 max-w-2xl sm:mb-16 ${center ? "mx-auto text-center" : ""}`}>
    {eyebrow && (
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brass">{eyebrow}</p>
    )}
    <h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">{title}</h2>
    <div className={`mt-5 h-px w-16 bg-gold ${center ? "mx-auto" : ""}`} />
    {subtitle && <p className="mt-5 text-muted">{subtitle}</p>}
  </Reveal>
);

export default SectionTitle;