import {
  Shield,
  Calendar,
  ShoppingBag,
  Globe,
  HandPlatter,
} from "lucide-react";
import { ExternalLink, Github } from "lucide-react";
import Layout from "../component/LayoutTop";
import projectsData from "../data/projects.json";
import Footer from "../component/Footer";

const iconMap = {
  Shield: <Shield className="w-8 h-8 text-red-600" />,
  Calendar: <Calendar className="w-8 h-8 text-purple-600" />,
  ShoppingBag: <ShoppingBag className="w-8 h-8 text-emerald-600" />,
  Globe: <Globe className="w-8 h-8 text-blue-600" />,
  HandPlatter: <HandPlatter className="w-8 h-8 text-indigo-600" />,
};

export default function PortfolioProjects() {
  const getStatusColor = (status) => {
    switch (status) {
      case "Latest":
        return "bg-red-100 text-red-800 border-red-200";
      case "Live":
        return "bg-green-100 text-green-800 border-green-200";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Security":
        return "bg-red-50 text-red-700";
      case "Frontend":
        return "bg-purple-50 text-purple-700";
      case "Full-Stack":
        return "bg-emerald-50 text-emerald-700";
      case "E-commerce":
        return "bg-orange-50 text-orange-700";
      case "Business":
        return "bg-indigo-50 text-indigo-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <>
      <Layout />
      <div className="layout-container">
        <div className="py-8 lg:py-12">
          <div className="mb-16 py-12 ">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed text-justify">
              A showcase of my recent work spanning full-stack development,
              e-commerce solutions, educational platforms, and security
              applications. Each project demonstrates my commitment to
              delivering high-quality, user-focused digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <div
                key={index}
                className="group bg-[#f2f2f2] border-2 border-gray-100 rounded-2xl p-4 md:p-8 transition-all duration-300 hover:border-black hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="transform group-hover:scale-110 transition-transform duration-300">
                      {iconMap[project.icon]}
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        project.category
                      )}`}
                    >
                      {project.category}
                    </span>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="mb-2 md:mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full object-cover rounded-lg mb-4 transition-transform duration-300"
                  />
                </div>

                <div className="mb-2 md:mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500">{project.date}</p>
                </div>
{/* 
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p> */}

                <div className="mb-4 md:mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  {project.Link && (
                    <button
                      className="flex items-center space-x-2 bg-gray-700 cursor-pointer hover:bg-black text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
                      onClick={() => window.open(project.Link, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Preview</span>
                    </button>
                  )}
                  {/* <button className="flex items-center space-x-2 border-2 border-gray-600 hover:border-black text-gray-700 hover:text-black cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium">
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              Recognition & Achievements
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
                <span className="text-yellow-800 font-medium text-sm">
                  🏆 Mindcoders Hackathon Winner
                </span>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2">
                <span className="text-purple-800 font-medium text-sm">
                  🥈 Indoricoders Clash 2.0 - 2nd Place
                </span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                <span className="text-blue-800 font-medium text-sm">
                  🎯 Innothon Hackathon Winner
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
