export interface Experience {
  index: number;
  role: string;
  company: string;
  period: string;
  current: boolean;
  points: string[];
}

export const experienceData: Experience[] = [
  {
    index: 1,
    role: "Full-Stack Developer",
    company: "Westack.ai, Indore",
    period: "July 2025 — Present",
    current: true,
    points: [
      "Developing and maintaining full-stack web applications in a professional environment.",
      "Contributing to innovative projects that require advanced AI implementation.",
    ],
  },
  {
    index: 2,
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    period: "Jan 2024 — June 2025",
    current: false,
    points: [
      "Delivered end-to-end web solutions for a diverse client base, including ed-tech platforms, e-commerce sites, and service-based businesses.",
      "Engineered MERN stack applications with secure payment gateways like Razorpay.",
    ],
  },
  {
    index: 3,
    role: "Web Developer",
    company: "IT GEEKS",
    period: "Aug 2022 — July 2023",
    current: false,
    points: [
      "Developed applications using Node.js, React.js, PHP, Laravel, and Shopify.",
      "Led codebase optimization efforts to improve performance and scalability for multiple client websites.",
    ],
  },
];
