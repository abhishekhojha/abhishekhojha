import React from "react";
import {
  Download,
  Phone,
  Github,
  Instagram,
  Linkedin,
  FileDown,
} from "lucide-react";
import { Link } from "react-router";
import Resume from "../assets/Abhishekh_Ojha_Web_Developer.pdf";
import TransitionLink from "../component/TransitionLink";

export default function HeroSection() {
  return (
    <>
      <div className="heroSection flex items-center">
        <div className="heroDescription pl-8 pb-20 lg:pb-15 md:pl-12 lg:pl-16 xl:pl-20">
          <h2 className="uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            <span>a</span>
            <span>b</span>
            <span>h</span>
            <span>i</span>
            <span>s</span>
            <span>h</span>
            <span>e</span>
            <span>k</span>
            <span>h</span> <span>o</span>
            <span>j</span>
            <span>h</span>
            <span>a</span>
          </h2>
          <p className="lg:text-lg mt-2">Full-Stack Web Developer</p>

          <TransitionLink
            to="/contact"
            className="text-sm font-bold tracking-wide"
          >
            <button className="bg-black text-white px-4 py-2 rounded-md mt-4 cursor-pointer">
              Let's Discuss
            </button>
          </TransitionLink>

          <div>
            <a
              href={Resume}
              download
              className="flex gap-2 py-2 max-w-[110px] cursor-pointer"
            >
              Resume <FileDown />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
