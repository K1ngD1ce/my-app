import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  triggerAnimation?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delay = 0, triggerAnimation = true  }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      clipPath: 'inset(105% 0% 0% 0%)',
      y: 20,
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const words = text.split(' ');

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={triggerAnimation && inView ? 'visible' : 'hidden'}
      style={{ display: 'block', lineHeight: '1.2' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;