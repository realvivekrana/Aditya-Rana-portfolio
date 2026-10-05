import { motion, useReducedMotion } from "framer-motion";

const Reveal = ({ children, delay = 0, y = 24, className = "" }) => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: Math.min(delay, 0.5), ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;