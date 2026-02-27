export interface Project {
  title: string;
  description: string;
  skills: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    title: "We Won Academy",
    description:
      "A career guidance and college admission platform helping engineering aspirants with AI-driven college prediction, rank analysis, and personalized mentorship workflows.",
    skills: ["AI Tools", "Education"],
    demoUrl: "https://wewonacademy.com",
  },
  {
    title: "Ministry of Steel",
    description:
      "Official Government of India portal. Contributed to usability, accessibility features, organizational navigation, and compliance with government web standards.",
    skills: ["Govt Portal", "Accessibility"],
    demoUrl: "https://steel.gov.in",
  },
  {
    title: "AI Lead Capture",
    description:
      "A workflow automation project utilizing N8N to seamlessly capture web leads and execute automatic follow-up sequences across email, SMS, and messaging platforms.",
    skills: ["N8N", "CRM Integrations"],
  },
  {
    title: "Sage Euphoria",
    description:
      "A modern single-page application featuring dynamic client-side routing and real-time interactivity. Deployed on Vercel for optimal performance and scalability.",
    skills: ["React/Next.js", "Vercel"],
    demoUrl: "https://sageeuphoria.vercel.app",
  },
  {
    title: "RoomieQ",
    description:
      "A full-stack portal for roommate and property discovery, featuring advanced search filters, location-based results, and integrated backend systems for user profiles.",
    skills: ["Full-Stack", "Real Estate"],
    demoUrl: "https://roomieqindia.com",
  },
  {
    title: "Builds Your Mind",
    description:
      "An edtech platform offering skill development courses, practice tests, and blogs. Features a responsive layout with course sections and clear engagement CTAs.",
    skills: ["MERN Stack", "Razorpay API"],
    demoUrl: "https://buildsyourmind.in",
  },
  {
    title: "Broyal",
    description:
      "A dynamic e-commerce storefront for handcrafted leather goods. Implemented product catalogs, filtering, checkout, and a seamless shopping experience.",
    skills: ["E-commerce", "WordPress"],
    demoUrl: "https://broyal.in",
  },
  {
    title: "Uttam Facility",
    description:
      "Corporate site for a professional facility management business. Developed a responsive services showcasing layout with integrated lead forms and local SEO.",
    skills: ["Corporate Site", "SEO"],
    demoUrl: "https://uttamfacility.com",
  },
  {
    title: "Mangrole.in",
    description:
      "A professional business website showcasing services and organizational details. Designed for optimal user engagement, clear communication, and modern aesthetics.",
    skills: ["Business Site", "Web Design"],
    demoUrl: "https://mangrole.in",
  },
  {
    title: "AI Social Media Tool",
    description:
      "Built an AI-powered post content generator utilizing Google's Gemini (Nano Banana) model. Implements dynamic templates to rapidly generate platform-ready posts.",
    skills: ["Gemini AI", "Content Automation"],
  },
  {
    title: "AI Listing Generator",
    description:
      "A comprehensive tool for automated e-commerce product listing generation. Integrates AI seamlessly for crafting optimal, SEO-friendly titles and feature descriptions. Deployed dynamically on Vercel with fast Next.js SSR architecture and an exceptionally clean UI.",
    skills: ["AI Automation", "Next.js/SSR"],
    demoUrl: "https://product-listing-generator-seven.vercel.app",
    githubUrl: "https://github.com/abhishekhojha/product-listing-generator.git",
  },
];
