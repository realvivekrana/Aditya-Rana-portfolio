import { motion, useReducedMotion } from "framer-motion";
import { useSite } from "../../context/SiteContext";
import Reveal from "../common/Reveal";
import SectionTitle from "../common/SectionTitle";

const Skills = () => {
  const { data } = useSite();
  const reduce = useReducedMotion();
  const items = data.skills || [];
  if (items.length === 0) return null;

  // group by category (keeps the admin-defined order)
  const groups = items.reduce((acc, skill) => {
    const key = skill.category || "General";
    (acc[key] = acc[key] || []).push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="Expertise" title="Skills & Competencies" />

        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(groups).map(([category, skills], g) => (
            <Reveal key={category} delay={g * 0.07}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6 sm:p-8">
                <h3 className="font-display text-2xl font-semibold text-accent">{category}</h3>
                <ul className="mt-6 space-y-5">
                  {skills.map((skill) => (
                    <li key={skill._id}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted">{skill.level}%</span>
                      </div>
                      <div
                        className="h-1.5 overflow-hidden rounded-full bg-line"
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={skill.name}
                      >
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-gold"
                          initial={reduce ? false : { width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          style={reduce ? { width: `${skill.level}%` } : undefined}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;