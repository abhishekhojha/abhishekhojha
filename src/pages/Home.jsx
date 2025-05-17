import React, { useEffect, useState } from "react";
import HeroSection from "@/component/HeroSection";
import Layout from "../component/Layout";
import SubHeading from "@/component/ui/SubHeading";
import ServicesData from "@/assets/services.json";
import Abhi from "@/assets/Abhi.png";
import { Link } from "react-router";
const Services = ({ props }) => {
  return (
    <div className="bg-[#f2f2f2] p-6 rounded-lg shadow-md hover:shadow-2xl cursor-pointer transition-shadow duration-300">
      <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold">
        {props.heading}
      </h4>
      <p className="text-xs sm:text-sm text-gray-800 mt-2 font-semibold">
        {props.subtext}
      </p>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <Layout>
        <HeroSection />
      </Layout>
      <div className="layout-container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-6">
          <SubHeading
            heading="What I Can Do for You"
            subtext="Whether you're a startup, business, or individual with an idea, I offer end-to-end web development services tailored to your goals. I turn your vision into scalable, secure, and user-friendly digital solutions."
          />
          {ServicesData?.map((service, index) => (
            <Services
              key={index}
              props={{
                heading: service.title,
                subtext: service.description,
              }}
            />
          ))}
        </div>
      </div>
      <div className="layout-container">
        <div className="flex gap-4 pb-6 mt-6 md:flex-row flex-col">
          <div>
            <SubHeading
              heading="About Me"
              subtext="I'm Abhishekh Ojha, a passionate Full-Stack Web Developer with a strong foundation in modern web technologies and a keen eye for practical, user-centered design. With hands-on experience in building scalable applications using the MERN stack, as well as WordPress and Shopify, I bring digital ideas to life — from concept to deployment.

Over the past few years, I’ve worked with startups, educational platforms, service providers, and e-commerce businesses, delivering solutions that are fast, secure, and fully responsive. My focus is on writing clean code, optimizing performance, and solving real-world problems through technology.

Whether you're looking to build a robust platform, design a high-converting landing page, or integrate smart features like AI or payment systems, I’ve got the tools and experience to make it happen."
            />
            <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {/* <!-- Key Skills --> */}
              <div className="bg-[#f2f2f2] p-6 rounded-lg shadow-md hover:shadow-2xl cursor-pointer transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-700 mb-3">
                  🛠️ Key Skills
                </h3>
                <ul class="list-disc pl-5 text-gray-600 space-y-1">
                  <li>React, Node.js, Express, MongoDB</li>
                  <li>WordPress, Shopify, PHP, Laravel</li>
                  <li>REST APIs, JWT Auth, Razorpay Integration</li>
                  <li>Git, GitHub, Vercel, Hostinger</li>
                </ul>
              </div>

              {/* <!-- Achievements --> */}
              <div className="bg-[#f2f2f2] p-6 rounded-lg shadow-md hover:shadow-2xl cursor-pointer transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-700 mb-3">
                  🏆 Achievements
                </h3>
                <ul class="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Winner – Mindcoders Hackathon (Creative Category)</li>
                  <li>2nd Place – Indoricoders Clash 2.0</li>
                  <li>Hackathon Organizer – Sage University</li>
                </ul>
              </div>

              {/* <!-- Experience Summary --> */}
              <div className="bg-[#f2f2f2] p-6 rounded-lg shadow-md hover:shadow-2xl cursor-pointer transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-700 mb-3">
                  📈 Experience
                </h3>
                <p class="text-gray-600">
                  Built and deployed 10+ websites and platforms for startups,
                  education portals, and service-based businesses.
                </p>
              </div>
              {/* <!-- Contact --> */}
              <div class="bg-[#f2f2f2] p-6 rounded-lg shadow-md hover:shadow-2xl cursor-pointer transition-shadow duration-300">
                <h3 class="text-xl font-semibold text-gray-700 mb-3">
                  💬 Let’s Connect
                </h3>
                <p class="text-gray-600 mb-4">
                  I’m open to freelance projects, collaborations, or just
                  talking tech. Feel free to reach out!
                </p>
                <button className="bg-black text-white px-4 py-2 rounded-md mt-4 cursor-pointer">
                  <Link
                    to="/contact"
                    className="text-sm font-bold tracking-wide"
                  >
                    Contact Me
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="flex mt-6">
            <div className="w-full md:w-[400px]">
              <img
                src={Abhi}
                alt="Abhishekh Ojha"
                className="shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
