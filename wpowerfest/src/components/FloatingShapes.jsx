import { motion } from 'framer-motion';

const FloatingShapes = () => {
  const shapes = [
    {
      className: 'absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-[#AB00A4]/10 to-[#58F5C8]/10 rounded-full blur-2xl',
      animate: {
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.3, 1],
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    },
    {
      className: 'absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-br from-[#58F5C8]/8 to-[#AB00A4]/8 rounded-full blur-3xl',
      animate: {
        y: [0, 25, 0],
        x: [0, -20, 0],
        scale: [1, 1.2, 1],
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1,
      }
    },
    {
      className: 'absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-[#AB00A4]/12 to-transparent rounded-lg blur-xl rotate-45',
      animate: {
        rotate: [45, 135, 45],
        scale: [1, 1.4, 1],
      },
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 0.5,
      }
    },
    {
      className: 'absolute bottom-1/4 left-1/3 w-28 h-28 bg-gradient-to-br from-[#58F5C8]/10 to-[#AB00A4]/10 rounded-full blur-2xl',
      animate: {
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.25, 1],
      },
      transition: {
        duration: 9,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 2,
      }
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={shape.className}
          animate={shape.animate}
          transition={shape.transition}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;

