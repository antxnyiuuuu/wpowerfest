import { motion } from 'framer-motion';

const SectionDivider = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full h-px bg-gradient-to-r from-transparent via-[#AB00A4] to-transparent my-8"
    />
  );
};

export default SectionDivider;

