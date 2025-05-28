import Logo from "../assets/logo.png";
import TransitionLink from "./TransitionLink";

export default function LayoutTop() {
  return (
    <div className="layoutWrapper">
      <div className="layout-container">
        <div className="layoutWrapperTop flex justify-between items-center py-4">
          <div className="logo w-[70px] h-[70px] rounded-full">
            <TransitionLink to="/" className="cursor-pointer">
              <img src={Logo} className="rounded-full" alt="Abhishekh" />
            </TransitionLink>
          </div>
          <ul className="flex justify-end gap-4">
            <li className="text-sm md:text-lg font-semibold">
              <TransitionLink to="/" className="cursor-pointer relative group transition-colors duration-300">
                Home
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
              </TransitionLink>
            </li>
            <li className="text-sm md:text-lg font-semibold">
              <TransitionLink to="/portfolio" className="cursor-pointer relative group transition-colors duration-300">
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
      </div>
    </div>
  );
}
