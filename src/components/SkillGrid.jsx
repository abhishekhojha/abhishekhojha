import React from 'react';
import {
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaWordpress, FaShopify, FaGitAlt, FaPhp, FaPython, FaLaravel
} from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { TbBrandNextjs } from 'react-icons/tb';
import { SiMongodb, SiExpress, SiMysql, SiVercel } from 'react-icons/si';

const skills = [
  { icon: FaHtml5, name: 'HTML5' },
  { icon: FaCss3Alt, name: 'CSS3' },
  { icon: IoLogoJavascript, name: 'JavaScript' },
  { icon: FaReact, name: 'React.js' },
  { icon: TbBrandNextjs, name: 'Next.js' },
  { icon: FaNodeJs, name: 'Node.js' },
  { icon: SiExpress, name: 'Express.js' },
  { icon: FaPhp, name: 'PHP' },
  { icon: FaLaravel, name: 'Laravel' },
  { icon: FaPython, name: 'Python' },
  { icon: SiMongodb, name: 'MongoDB' },
  { icon: SiMysql, name: 'MySQL' },
  { icon: FaWordpress, name: 'WordPress' },
  { icon: FaShopify, name: 'Shopify' },
  { icon: FaGitAlt, name: 'Git' },
  { icon: SiVercel, name: 'Vercel' },
];

export default function SkillGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 mx-auto">
      {skills.map(({ icon: Icon, name }) => (
        <div key={name} className="group relative flex flex-col justify-center items-center p-6 border border-gray-100 rounded-2xl bg-white hover:border-[var(--brand-dark)] hover:shadow-sm transition-all duration-300 gap-3 hover:-translate-y-1">
          <Icon size={32} className="text-gray-400 group-hover:text-[var(--brand-dark)] transition-colors duration-300" />
          <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-900 transition-colors duration-300">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}