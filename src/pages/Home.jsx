import React, { useEffect, useState } from "react";
import HeroSection from "@/component/HeroSection";
import Layout from "../component/Layout";
import SubHeading from "@/component/ui/SubHeading";
import ServicesData from "@/assets/services.json";
import Abhi from "@/assets/Abhi.png";
import { Link } from "react-router";
import Footer from "../component/Footer";
const Services = ({ props }) => {
  return (
    <div className="group bg-[#f2f2f2] border-2 border-gray-100 rounded-2xl p-8 transition-all duration-300 hover:border-black hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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
    <>
      <Layout>
        <HeroSection />
      </Layout>
      <div className="layout-container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-20 pt-8">
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
              <div className="group bg-[#f2f2f2] border-2 border-gray-100 rounded-2xl p-8 transition-all duration-300 hover:border-black hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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
              <div className="group bg-[#f2f2f2] border-2 border-gray-100 rounded-2xl p-8 transition-all duration-300 hover:border-black hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <h3 class="text-xl font-semibold text-gray-700 mb-3">
                  📈 Experience
                </h3>
                <p class="text-gray-600">
                  Experienced Full-Stack Web Developer with hands-on expertise
                  in MERN, Laravel, and WordPress, delivering scalable apps and
                  optimized UI/UX. Previously worked at IT GEEKS and DMAP
                  Infotech, contributing to real-world client projects and
                  custom platform builds.
                </p>
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
      <Footer />
    </>
  );
}
