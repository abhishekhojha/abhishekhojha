import { createContext, useContext, useState } from 'react';

const TransitionContext = createContext();

export const usePageTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextRouteCallback, setNextRouteCallback] = useState(null);

  const triggerTransition = (navigateCallback) => {
    setIsAnimating(true);
    setNextRouteCallback(() => navigateCallback);
  };

  const onAnimationEnd = () => {
    if (nextRouteCallback) {
      nextRouteCallback(); 
    }
    setTimeout(() => {
      setIsAnimating(false);
      setNextRouteCallback(null);
    }, 500); 
  };

  return (
    <TransitionContext.Provider value={{ isAnimating, triggerTransition, onAnimationEnd }}>
      {children}
    </TransitionContext.Provider>
  );
};
