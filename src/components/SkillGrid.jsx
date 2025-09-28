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
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 md:gap-8 max-w-4xl mx-auto">
      {skills.map(({ icon: Icon, name }) => (
        <div key={name} className="group relative flex justify-center items-center">
          <div className="bg-white p-5 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
            <Icon size={40} className="text-gray-700" />
          </div>
          <span className="absolute -top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}