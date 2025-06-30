import React from 'react';
import { motion, useTransform } from 'framer-motion';

/**
 * @param {object} props
 * @param {React.ReactNode} props.children - The component to animate.
 * @param {import('framer-motion').MotionValue<number>} props.scrollYProgress - The scroll progress from useScroll.
 * @param {number[]} props.inputRange - The scroll progress range to map from (e.g., [0, 0.2]).
 */
const AnimatedSection = ({ children, scrollYProgress, inputRange }) => {
  // Map the scroll progress (from inputRange) to an opacity value from 0 to 1
  const opacity = useTransform(
    scrollYProgress,
    inputRange,
    [0, 1]
  );

  // Map the scroll progress to a vertical transform (slide up)
  const y = useTransform(
    scrollYProgress,
    inputRange,
    [50, 0] // Moves from 50px below to its original position
  );

  return (
    <motion.div style={{ opacity, y }}>
      {children}
    </motion.div>
  );
};

export default AnimatedSection;