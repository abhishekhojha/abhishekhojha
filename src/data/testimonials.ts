export interface Testimonial {
  name: string;
  title: string;
  company: string;
  text: string;
  avatar?: string;
  linkedinUrl?: string;
}

export const testimonialsData: Testimonial[] = [
  {
    name: "Sanjay Mehta",
    title: "Founder",
    company: "Westack.ai",
    text: "Abhishekh consistently delivers clean, well-architected code. He has a rare ability to bridge complex AI workflows with intuitive user interfaces — his work on our platform's automation layer was outstanding.",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Priya Sharma",
    title: "Product Manager",
    company: "We Won Academy",
    text: "Working with Abhishekh was an absolute pleasure. He took our ed-tech vision and built a robust, scalable platform that handles thousands of students. His attention to performance and user experience sets him apart.",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Rahul Verma",
    title: "CEO",
    company: "RoomieQ",
    text: "Abhishekh built our entire product from scratch — frontend, backend, database, deployment. He communicated well throughout, delivered on time, and the codebase is clean enough that we can extend it ourselves.",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Ananya Patel",
    title: "Marketing Director",
    company: "Broyal",
    text: "Our e-commerce store needed a complete overhaul. Abhishekh redesigned the site, improved page speed significantly, and integrated WooCommerce seamlessly. Conversion rates improved within weeks of launch.",
    linkedinUrl: "https://linkedin.com",
  },
];
