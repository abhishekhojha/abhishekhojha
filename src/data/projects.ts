export interface Project {
  slug: string;
  title: string;
  description: string;
  skills: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    slug: "we-won-academy",
    title: "We Won Academy",
    description:
      "A career guidance and college admission platform helping engineering aspirants with AI-driven college prediction, rank analysis, and personalized mentorship workflows.",
    skills: ["Next.js", "Node.js", "MongoDB", "AI"],
    demoUrl: "https://wewonacademy.com",
  },
  {
    slug: "ministry-of-steel",
    title: "Ministry of Steel",
    description:
      "Official Government of India portal. Contributed to usability, accessibility features, organizational navigation, and compliance with government web standards.",
    skills: ["WordPress", "PHP", "SEO", "Accessibility"],
    demoUrl: "https://steel.gov.in",
  },
  {
    slug: "ai-lead-capture",
    title: "AI Lead Capture",
    description:
      "A workflow automation project utilizing N8N to seamlessly capture web leads and execute automatic follow-up sequences across email, SMS, and messaging platforms.",
    skills: ["N8N", "Webhooks", "CRM", "Automation"],
  },
  {
    slug: "sage-euphoria",
    title: "Sage Euphoria",
    description:
      "A modern single-page application featuring dynamic client-side routing and real-time interactivity. Deployed on Vercel for optimal performance and scalability.",
    skills: ["React", "Next.js", "Vercel"],
    demoUrl: "https://sageeuphoria.vercel.app",
  },
  {
    slug: "roomieq",
    title: "RoomieQ",
    description:
      "A full-stack portal for roommate and property discovery, featuring advanced search filters, location-based results, and integrated backend systems for user profiles.",
    skills: ["MERN", "Express.js", "MongoDB", "React"],
    demoUrl: "https://roomieqindia.com",
  },
  {
    slug: "builds-your-mind",
    title: "Builds Your Mind",
    description:
      "An edtech platform offering skill development courses, practice tests, and blogs. Features a responsive layout with course sections and clear engagement CTAs.",
    skills: ["MERN", "Razorpay", "Node.js", "React"],
    imageUrl: "/projects/builds.png",
    demoUrl: "https://buildsyourmind.in",
  },
  {
    slug: "broyal",
    title: "Broyal",
    description:
      "A dynamic e-commerce storefront for handcrafted leather goods. Implemented product catalogs, filtering, checkout, and a seamless shopping experience.",
    skills: ["WordPress", "WooCommerce", "PHP", "SEO"],
    imageUrl: "/projects/broyal.png",
    demoUrl: "https://broyal.in",
  },
  {
    slug: "uttam-facility",
    title: "Uttam Facility",
    description:
      "Corporate site for a professional facility management business. Developed a responsive services showcasing layout with integrated lead forms and local SEO.",
    skills: ["WordPress", "PHP", "SEO", "Bootstrap"],
    demoUrl: "https://uttamfacility.com",
  },
  {
    slug: "mangrole",
    title: "Mangrole.in",
    description:
      "A professional business website showcasing services and organizational details. Designed for optimal user engagement, clear communication, and modern aesthetics.",
    skills: ["React", "Node.js", "Tailwind CSS"],
    demoUrl: "https://mangrole.in",
  },
  {
    slug: "ai-social-media-tool",
    title: "AI Social Media Tool",
    description:
      "Built an AI-powered post content generator utilizing Google's Gemini model. Implements dynamic templates to rapidly generate platform-ready posts.",
    skills: ["Gemini AI", "Node.js", "React", "Automation"],
  },
  {
    slug: "ai-listing-generator",
    title: "AI Listing Generator",
    description:
      "A comprehensive tool for automated e-commerce product listing generation. Integrates AI seamlessly for crafting optimal, SEO-friendly titles and feature descriptions. Deployed on Vercel with fast Next.js SSR architecture.",
    skills: ["Next.js", "Gemini AI", "TypeScript", "Vercel"],
    imageUrl: "/projects/productListing.png",
    demoUrl: "https://product-listing-generator-seven.vercel.app",
    githubUrl: "https://github.com/abhishekhojha/product-listing-generator.git",
  },
];
