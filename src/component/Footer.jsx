import React from "react";
import { Linkedin, Github, Instagram } from "lucide-react";
import TransitionLink from "./TransitionLink";
export default function Footer() {
  return (
    <>
      <footer class="bg-black text-white py-6 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="flex items-center space-x-2">
              <p class="text-sm text-gray-400">
                © {new Date().getFullYear()} Abhishekh Ojha
              </p>
            </div>

            <nav class="flex flex-wrap justify-center gap-6 md:gap-8">
              <TransitionLink to="/" className="cursor-pointer">
                Home
              </TransitionLink>
              <TransitionLink to="/portfolio" className="cursor-pointer">
                Portfolio
              </TransitionLink>
              {/* <TransitionLink to="/portfolio" className="cursor-pointer">
                Portfolio
              </TransitionLink> */}
            </nav>

            <div class="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/abhishekh-ojha-10802b215/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span class="sr-only">LinkedIn</span>
                <Linkedin />
              </a>
              <a
                href="https://github.com/abhishekhojha/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span class="sr-only">GitHub</span>
                <Github />
              </a>
              <a
                href="https://www.instagram.com/q_abhishekh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <span class="sr-only">Instagram</span>
                <Instagram />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
