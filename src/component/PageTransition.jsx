import { motion, AnimatePresence } from "framer-motion";
import { usePageTransition } from "../context/TransitionContext";
import { useEffect } from "react";

const PageTransition = () => {
  const { isAnimating, onAnimationEnd } = usePageTransition();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    document.body.style.overflow = isAnimating ? "hidden" : "";
  }, [isAnimating]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Black overlay - covers from top */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />

          {/* White overlay - reveals from bottom */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
            style={{ transformOrigin: "bottom" }}
            onAnimationComplete={onAnimationEnd}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
