export interface UsesItem {
  name: string;
  description: string;
  url?: string;
}

export interface UsesCategory {
  category: string;
  icon: string;
  items: UsesItem[];
}

export const usesData: UsesCategory[] = [
  {
    category: "Hardware",
    icon: "💻",
    items: [
      { name: "MacBook Pro / Windows Laptop", description: "Primary development machine for all coding, design, and deployment work." },
      { name: "27\" External Monitor", description: "Extra screen real estate for multi-window workflows." },
      { name: "Mechanical Keyboard", description: "Tactile feedback for long coding sessions." },
    ],
  },
  {
    category: "Editor & Terminal",
    icon: "🖊️",
    items: [
      { name: "Visual Studio Code", description: "Daily driver editor with GitHub Copilot, Prettier, and ESLint extensions.", url: "https://code.visualstudio.com" },
      { name: "iTerm2 / Windows Terminal", description: "Fast, customizable terminals with split-pane support." },
      { name: "Zsh + Oh My Zsh", description: "Shell setup with git prompt, auto-suggestions, and syntax highlighting." },
    ],
  },
  {
    category: "Frontend",
    icon: "🎨",
    items: [
      { name: "React / Next.js", description: "Go-to framework for building full-stack web applications.", url: "https://nextjs.org" },
      { name: "Astro", description: "Static site framework powering this portfolio.", url: "https://astro.build" },
      { name: "Tailwind CSS", description: "Utility-first CSS for rapid, consistent UI development.", url: "https://tailwindcss.com" },
      { name: "Figma", description: "UI design, wireframing, and component prototyping.", url: "https://figma.com" },
    ],
  },
  {
    category: "Backend & Database",
    icon: "⚙️",
    items: [
      { name: "Node.js + Express", description: "Server-side runtime for REST APIs and backend services.", url: "https://nodejs.org" },
      { name: "MongoDB + Atlas", description: "Document database for flexible, scalable data storage.", url: "https://mongodb.com" },
      { name: "MySQL", description: "Relational database for structured, transactional data." },
      { name: "Postman", description: "API development and testing platform.", url: "https://postman.com" },
    ],
  },
  {
    category: "AI & Automation",
    icon: "🤖",
    items: [
      { name: "N8N", description: "Open-source workflow automation for building no-code AI pipelines.", url: "https://n8n.io" },
      { name: "Google Gemini API", description: "Used for building AI content generation and analysis tools.", url: "https://ai.google.dev" },
      { name: "OpenAI API", description: "LLM integrations for chat, summarization, and automation.", url: "https://openai.com" },
    ],
  },
  {
    category: "DevOps & Deployment",
    icon: "🚀",
    items: [
      { name: "Vercel", description: "Preferred deployment platform for Next.js and Astro projects.", url: "https://vercel.com" },
      { name: "Cloudflare Pages", description: "CDN-powered deployment with edge functions.", url: "https://pages.cloudflare.com" },
      { name: "Git + GitHub", description: "Version control and code collaboration hub.", url: "https://github.com" },
    ],
  },
  {
    category: "Productivity",
    icon: "📋",
    items: [
      { name: "Notion", description: "All-in-one workspace for notes, project planning, and docs.", url: "https://notion.so" },
      { name: "Linear", description: "Issue tracking and project management for personal projects.", url: "https://linear.app" },
      { name: "Arc Browser", description: "Fast, workspace-based browser with built-in tab management.", url: "https://arc.net" },
    ],
  },
];
