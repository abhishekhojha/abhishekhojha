import React from 'react';
import {
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaWordpress, FaShopify, FaGitAlt, FaPhp, FaPython, FaLaravel
} from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { TbBrandNextjs } from 'react-icons/tb';
import { SiMongodb, SiExpress, SiMysql, SiVercel } from 'react-icons/si';

const MernIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
    <path d="m2 12 10 5 10-5" />
    <path d="m2 17 10 5 10-5" />
  </svg>
);

const TypeScriptIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M3 3h18v18H3V3Zm10.71 14.86c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8Zm-4.8-5.13H11v-1.48H5.14v1.48h2.08v6.69h1.69v-6.69Z" />
  </svg>
);

const TailwindIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8Zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12Z" />
  </svg>
);

const N8nIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="5" cy="12" r="2.2" />
    <circle cx="12" cy="7" r="2.2" />
    <circle cx="12" cy="17" r="2.2" />
    <circle cx="19" cy="12" r="2.2" />
    <path d="M7.2 11.2 9.9 8.2M7.2 12.8l2.7 3M14.1 8.2l2.7 3M14.1 15.8l2.7-3" />
  </svg>
);

const SparkleIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2c.4 5.2 4.8 9.6 10 10-5.2.4-9.6 4.8-10 10-.4-5.2-4.8-9.6-10-10 5.2-.4 9.6-4.8 10-10Z" />
  </svg>
);

const LangChainIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const AwsIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);

const AiWorkflowIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
  </svg>
);

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

const specializedSkills = [
  { icon: MernIcon, name: 'MERN Stack' },
  { icon: TypeScriptIcon, name: 'TypeScript' },
  { icon: TailwindIcon, name: 'Tailwind CSS' },
  { icon: AwsIcon, name: 'AWS' },
  { icon: LangChainIcon, name: 'LangChain' },
  { icon: AiWorkflowIcon, name: 'AI Agents' },
  { icon: N8nIcon, name: 'n8n' },
  { icon: SparkleIcon, name: 'Generative AI' },
];

function SkillCard({ icon: Icon, name }) {
  return (
    <div className="group relative flex flex-col justify-center items-center p-6 border border-gray-100 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800/50 hover:border-[var(--brand-dark)] dark:hover:border-gray-400 hover:shadow-sm transition-all duration-300 gap-3 hover:-translate-y-1">
      <Icon
        size={32}
        className="text-gray-400 dark:text-gray-500 group-hover:text-[var(--brand-dark)] dark:group-hover:text-gray-200 transition-colors duration-300"
      />
      <span className="text-xs font-semibold text-center text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

export default function SkillGrid() {
  return (
    <div className="space-y-12 sm:space-y-14">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 mx-auto">
        {skills.map((skill) => (
          <SkillCard key={skill.name} icon={skill.icon} name={skill.name} />
        ))}
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 sm:w-8 h-px bg-gray-900 dark:bg-gray-400" />
          <h3 className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
            Specialized
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 mx-auto">
          {specializedSkills.map((skill) => (
            <SkillCard key={skill.name} icon={skill.icon} name={skill.name} />
          ))}
        </div>
      </div>
    </div>
  );
}