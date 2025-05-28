import { Github, Instagram, Linkedin } from "lucide-react";
import Logo from "../assets/logo.png";
import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { usePageTransition } from "../context/TransitionContext";
import TransitionLink from "./TransitionLink";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { triggerTransition } = usePageTransition();

  const handleNavigation = (path) => {
    triggerTransition(() => {
      navigate(path);
    });
  };

  const mainLayout = useRef(null);
  const layoutWrapperTop = useRef(null);
  useEffect(() => {
    if (layoutWrapperTop.current) {
      const height = layoutWrapperTop.current.offsetHeight;
      mainLayout.current.style.height = `calc(100vh - ${height}px)`;
    }
  }, []);
  return (
    <div>
      <div className="layoutWrapper">
        <div className="layout-container">
          <div
            className="layoutWrapperTop flex justify-between items-center py-4"
            ref={layoutWrapperTop}
          >
            <div className="logo w-[70px] h-[70px] rounded-full">
              <TransitionLink to="/" className="cursor-pointer">
                <img src={Logo} className="rounded-full" alt="Abhishekh" />
              </TransitionLink>
            </div>
            <ul className="flex justify-end gap-4">
              <li className="text-sm md:text-lg font-semibold">
                <TransitionLink
                  to="/"
                  className="cursor-pointer relative group transition-colors duration-300"
                >
                  Home
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </TransitionLink>
              </li>
              <li className="text-sm md:text-lg font-semibold">
                <TransitionLink
                  to="/portfolio"
                  className="cursor-pointer relative group transition-colors duration-300"
                >
                  Portfolio
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </TransitionLink>
              </li>
              {/* <li className="text-sm md:text-lg font-semibold">
                <a href="#about">About</a>
              </li>
              <li className="text-sm md:text-lg font-semibold">
                <a href="#service">Services</a>
              </li> */}
            </ul>
          </div>
          <div className="mainLayout overflow-hidden" ref={mainLayout}>
            <div className="layoutWrapperLeft flex flex-col pl-8 md:pl-0 justify-center items-center gap-16">
              <div className="Borderline h-[200px] w-[2px] bg-black"></div>
              <div className="flex flex-col gap-4 items-center">
                <a
                  href="https://github.com/abhishekhojha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icons-hover"
                >
                  <Github />
                </a>
                <a
                  href="https://www.linkedin.com/in/abhishekh-ojha-10802b215/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icons-hover"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://www.instagram.com/q_abhishekh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icons-hover"
                >
                  <Instagram />
                </a>
              </div>
            </div>
            <div className="overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
