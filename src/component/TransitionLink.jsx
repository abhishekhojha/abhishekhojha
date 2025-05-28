import { useNavigate } from 'react-router';
import { usePageTransition } from '../context/TransitionContext';

const TransitionLink = ({ to, children, className = '', ...props }) => {
  const navigate = useNavigate();
  const { triggerTransition } = usePageTransition();

  const handleClick = (e) => {
    e.preventDefault();
    triggerTransition(() => navigate(to));
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

export default TransitionLink;
