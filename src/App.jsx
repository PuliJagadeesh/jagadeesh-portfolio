import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home, 
  Briefcase, 
  Folder, 
  User, 
  Mail, 
  Linkedin, 
  Instagram, 
  Twitter, 
  ExternalLink, 
  Download, 
  Menu, 
  X as XIcon,
  Cpu,
  Zap,
  BarChart3,
  Brain,
  Lock,
  ArrowRight,
  Monitor,
  Apple as AppleIcon,
  Target,
  Layers,
  TrendingUp,
  DollarSign,
  Lightbulb,
  Users,
  FileText,
  Search,
  Activity,
  PieChart,
  AppWindow,
  CircuitBoard,
  Coins,
  Coffee,
  Flag,
  Dumbbell,
  Car,
  BookOpen,
  Map,
  Copy,
  Check,
  Save,
  RotateCcw
} from 'lucide-react';

// --- CONFIGURATION ---
const PASSCODE = "Cetaphil@007"; 

// --- BRAND COLOR MAP ---
const BRAND_COLORS = {
  AMD: { color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-500/30', accent: 'border-red-500' },
  Nvidia: { color: 'text-green-400', bg: 'bg-green-900/20', border: 'border-green-500/30', accent: 'border-green-500' },
  Apple: { color: 'text-gray-300', bg: 'bg-gray-800', border: 'border-gray-500/30', accent: 'border-gray-400' },
  Google: { color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-500/30', accent: 'border-yellow-500' },
  Meta: { color: 'text-blue-400', bg: 'bg-blue-900/20', border: 'border-blue-500/30', accent: 'border-blue-500' },
  Hardware: { color: 'text-purple-400', bg: 'bg-purple-900/20', border: 'border-purple-500/30', accent: 'border-purple-500' },
};

// --- BRAND SYMBOLS (Lucide Icons) ---
const BRAND_SYMBOLS = {
  AMD: Cpu,
  Nvidia: BarChart3,
  Apple: Lock,
  Google: Zap,
  Meta: Brain,
  Hardware: Cpu,
};

// --- PERSONAL INTEREST ICONS MAP ---
const PERSONAL_ICONS = {
  Flag: Flag,
  Coffee: Coffee,
  Dumbbell: Dumbbell,
  Car: Car
};

// --- INITIAL DATA ---
const INITIAL_DATA = {
  profile: {
    name: "JAGADEESH PULI",
    role: "AI Product Manager",
    tagline: "Scaling AI Requires Three Languages.",
    mission: "A translator at the intersection of engagement, physics, and profit.", 
    longMission: "I prevent software ambition from crashing into hardware constraints. I build AI products that Google/Meta love (Retention) using the efficiency Nvidia/AMD demand (Unit Economics), all while ensuring the numbers work (Business Viability).", 
    email: "jagadeeshpuli.one@gmail.com",
    footer: "© 2025 JAGADEESH PULI", 
    resumeUrl: "https://drive.google.com/file/d/13h3mhC-TsiAXReMxWuv9CrnNu-w3JOh6/view?usp=sharing"
  },
  stats: [
    { value: "40%", label: "Compute Costs Cut", desc: "Hardware-Aware Ops" },
    { value: "2.3x", label: "Discovery Lift", desc: "GenAI Personalization" },
    { value: "92%", label: "Inference Score", desc: "Quality at Scale" }
  ],
  competencies: [
    { area: "Software (Google/Meta)", focus: "Engagement & Growth", color: "blue" },
    { area: "The Bridge (Me)", focus: "Unit Economics & Feasibility", color: "white" },
    { area: "Hardware (Nvidia/AMD)", focus: "Efficiency & Utilization", color: "purple" }
  ],
  personal: [
    { label: "Favorite Driver", value: "Max Verstappen", icon: "Flag", color: "text-orange-500" },
    { label: "Fuel", value: "Black Coffee", icon: "Coffee", color: "text-amber-600" },
    { label: "Routine", value: "Fitness & Gym", icon: "Dumbbell", color: "text-blue-400" },
    { label: "Passion", value: "Automobiles", icon: "Car", color: "text-red-400" }
  ],
  experience: [
    {
      role: "Product Manager (GenAI)", 
      company: "Holiday Channel", 
      dates: "Jul 2025 - Present",
      metrics: ["40% Cost Reduction", "2.3x Visibility Lift", "35% Conv. Boost"],
      bullets: [
        "Led the 0 to 1 launch of a GenAI recommendation system to solve the product discovery problem, delivering a solution that increased item visibility by 2.3× and boosted sales conversions by 35%.",
        "Designed a hybrid Google Vision-Llama pipeline to reduce compute costs by 40% and improve latency by 2x.",
        "Executed product roadmap delivery and lifecycle management by bridging engineering constraints with business KPIs, ensuring execution excellence and consistent release velocity.",
        "Collaborated with Sales and Marketing teams to create product value propositions and ROI dashboards, aligning AI capabilities with go-to-market activities and outbound growth strategies."
      ]
    },
    {
      role: "Assoc. Product Manager (Capstone)",
      company: "Stanford Continuing Studies",
      dates: "Oct 2025 - Nov 2025",
      metrics: ["150% Basket Size (Proj)", "Real-time Inference", "Zero-Shot Detection"],
      bullets: [
        "Recognized that high-friction search was causing significant user drop-off during the cart-building process.",
        "Built 'Smart Cart', a photo-to-cart automation feature using computer vision to identify pantry staples instantly.",
        "Eliminated the search bar for repeat items, projected to increase basket size by 150% through friction reduction."
      ]
    },
    {
      role: "Product Manager (Leadership)",
      company: "PM Club - IIT Chicago",
      dates: "Oct 2024 - May 2025",
      metrics: ["5 Products Shipped", "35% Faster Cycles", "10-Person Team"],
      bullets: [
        "Revitalized a stagnant student organization by implementing agile rituals and structured brainstorming sessions.",
        "Led a 10-person cross-functional team to successfully ship 5 student-led products within a single academic year."
      ]
    },
    {
      role: "Product Mgmt Intern",
      company: "VolkSoft Technologies",
      dates: "Jun 2024 - Aug 2024",
      metrics: ["22% Retention Lift", "28% Time Saved", "Data-Led Roadmap"],
      bullets: [
        "Observed low engagement with the main analytics dashboard, identifying that users were seeking answers, not just raw data.",
        "Redesigned the UX to surface 'Actionable Insights' rather than just raw charts, addressing low user engagement.",
        "Achieved a 22% lift in retention and saved users 28% of their time by reducing analysis paralysis."
      ]
    }
  ],
  projects: [
    {
      title: "Project Halo",
      type: "GTM STRATEGY",
      hook: "AMD GTM Strategy",
      brand: "AMD",
      description: "Designed a complete Go-to-Market (GTM) and Positioning strategy for a novel product line, including the market entry path, pricing tiers, and channel strategy, resulting in a model projected to capture $X million in the first three years.",
      tags: ["GTM", "STRATEGY", "POSITIONING", "REVENUE MODEL"],
      link: "https://drive.google.com/file/d/1Q4j1sf3F0AukGvQY2InNBle--khHwSB5/view?usp=sharing"
    },
    {
      title: "Winning the Brownfield",
      type: "MARKET ANALYSIS",
      hook: "Competitive Market Analysis",
      brand: "Nvidia",
      description: "Conducted a comprehensive teardown and competitive analysis of a target market, resulting in the identification of a $1,050 BOM cost saving opportunity and a viable new product architecture that undercut the incumbent's cost structure while expanding feature capability.",
      tags: ["FINANCIAL VIABILITY", "UNIT ECONOMICS", "COST REDUCTION", "ARCHITECTURE"],
      link: "https://drive.google.com/file/d/1tGVSD-d0EPtsaqdrTHrA3w1fMNTiVMPw/view?usp=sharing"
    },
    {
      title: "Project Helix",
      type: "PRIVACY ARCHITECTURE",
      hook: "Apple Technical Whitepaper",
      brand: "Apple",
      description: "Authored the strategic vision for a new privacy-preserving architecture allowing on-device predictive utility without central cloud data transfer. This defined the feature set and hardware/software interfaces necessary to use privacy as a core product differentiator.",
      tags: ["PRIVACY-BY-DESIGN", "ARCHITECTURE", "APPLE ECOSYSTEM"],
      link: "https://drive.google.com/drive/folders/1_vlo3nm0o1nYFaVV9bsrGIV6MICNN4Qz?usp=sharing"
    },
    {
      title: "Project Aether",
      type: "HYBRID-COMPUTE STRATEGY",
      hook: "Google Hybrid-Compute",
      brand: "Google",
      description: "Developed the strategic framework for hybrid-compute feature prioritization, determining the optimal division of labor between edge and cloud processing based on latency, power consumption, and data privacy goals.",
      tags: ["HYBRID-COMPUTE", "PRIORITIZATION", "EDGE VS CLOUD"],
      link: "https://drive.google.com/drive/folders/1EkXrw9S_GWAbucljHcZK4oTcaQcHFDir?usp=sharing"
    },
    {
      title: "Project Sightline",
      type: "UX/RETENTION INITIATIVE",
      hook: "Meta UX/Retention",
      brand: "Meta",
      description: "Utilized retention metrics and qualitative research to identify a key user friction point, leading to the design and specification of a new feature that drove a projected +X% increase in Week 4 retention and higher product engagement.",
      tags: ["UX", "RETENTION", "PRODUCT DISCOVERY", "META PLATFORMS"],
      link: "https://drive.google.com/drive/folders/1QmqAn-pmC_L8D4Ncv3RVGc_JP16wBBtu?usp=sharing"
    },
    {
      title: "Edge Inference Optimization",
      type: "TECHNICAL VALIDATION",
      hook: "Inference Performance",
      brand: "Hardware",
      description: "Provided the foundational technical validation for the entire strategy by performing multi-vendor competitive benchmarking on edge inference performance, directly informing the minimum viable product (MVP) specifications and performance claims for our silicon roadmap.",
      tags: ["EDGE INFERENCE", "BENCHMARKING", "TECHNICAL VIABILITY"],
      link: "https://drive.google.com/file/d/1Fi6Mr9eVWCjlyj47hOZ6brRG8lpr3w5S/view?usp=sharing"
    },
  ],
  skills: {
    strategic: [
      "Product Strategy", "Go-To-Market (GTM)", "User Stories & Epics", "PRD Writing",
      "Roadmapping", "Stakeholder Management", "Inference Economics", "Model Distillation"
    ],
    technical: [
      "Python", "SQL", "Data Analysis", "A/B Testing",
      "API Design", "System Architecture", "PyTorch Profiler", "LLM Fine-tuning"
    ],
    tools: [
      "Figma", "Jira", "Notion", "Linear", 
      "Miro", "Tableau", "Postman", "GitHub"
    ]
  },
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/jagadeesh-puli", icon: "Linkedin", link: "https://www.linkedin.com/in/jagadeesh-puli" },
    { name: "X / Twitter", url: "https://x.com/jagadeeshpuli12", icon: "Twitter", link: "https://x.com/jagadeeshpuli12" },
    { name: "Instagram", url: "https://www.instagram.com/jagadeesh__puli/", icon: "Instagram", link: "https://www.instagram.com/jagadeesh__puli/" }
  ],
  contact: {
    cta: "Let's Solve The Hardest Problems.",
    sub: "You have the ambition (or the silicon). I have the roadmap.",
    email: "jagadeeshpuli.one@gmail.com"
  }
};

// --- MODAL COMPONENT ---
const CustomModal = ({ isOpen, title, message, onConfirm, onCancel, showConfirm = true }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
      <div className="bg-[#111] p-6 md:p-8 rounded-xl max-w-sm w-full border border-gray-800 shadow-2xl animate-fade-in-up">
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button 
              onClick={onCancel} 
              className="px-4 py-2 text-gray-400 border border-gray-700 rounded-lg hover:border-white transition-colors text-sm"
            >
              Cancel
            </button>
          )}
          {showConfirm && onConfirm && (
            <button 
              onClick={onConfirm} 
              className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- VISUAL COMPONENTS - DOODLES ---
const DoodleBox = ({ className, children, color = "text-white" }) => (
  <div className={`relative ${className} group`}>
    {/* Hand-drawn box effect */}
    <svg className={`absolute inset-0 w-full h-full -z-10 ${color} opacity-20 group-hover:opacity-40 transition-opacity`} fill="none" stroke="currentColor" strokeWidth="2">
       <path d="M2 2 L 98 4 Q 96 50 98 96 L 4 98 Q 2 50 2 2 Z" vectorEffect="non-scaling-stroke" />
    </svg>
    {children}
  </div>
);

const DoodleUnderline = ({ className }) => (
  <svg viewBox="0 0 200 20" className={`w-full h-3 ${className}`} preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M5 15 Q 100 0 195 15" className="opacity-70" />
  </svg>
);

// --- BACKGROUND COMPANY STARS ---
const CompanyStars = () => {
  const companies = [
    { name: "Google", top: "15%", left: "5%", rotate: "-5deg", opacity: 0.5 },
    { name: "Amazon", top: "10%", left: "25%", rotate: "3deg", opacity: 0.4 },
    { name: "Nvidia", top: "8%", left: "80%", rotate: "-2deg", opacity: 0.5 },
    { name: "Apple", top: "18%", left: "85%", rotate: "6deg", opacity: 0.45 },
    { name: "Meta", top: "35%", left: "2%", rotate: "-4deg", opacity: 0.4 },
    { name: "Microsoft", top: "45%", left: "90%", rotate: "2deg", opacity: 0.45 },
    { name: "OpenAI", top: "25%", left: "40%", rotate: "-3deg", opacity: 0.5 },
    { name: "Tesla", top: "60%", left: "8%", rotate: "5deg", opacity: 0.4 },
    { name: "Samsung", top: "80%", left: "88%", rotate: "-2deg", opacity: 0.35 },
    { name: "Intel", top: "70%", left: "15%", rotate: "5deg", opacity: 0.4 },
    { name: "TSMC", top: "55%", left: "80%", rotate: "-3deg", opacity: 0.5 },
    { name: "ASML", top: "90%", left: "40%", rotate: "4deg", opacity: 0.35 },
    { name: "Qualcomm", top: "40%", left: "70%", rotate: "-5deg", opacity: 0.4 },
    { name: "IBM", top: "85%", left: "5%", rotate: "2deg", opacity: 0.35 },
    { name: "Adobe", top: "22%", left: "90%", rotate: "-4deg", opacity: 0.4 },
    { name: "Salesforce", top: "65%", left: "90%", rotate: "3deg", opacity: 0.35 },
    { name: "Oracle", top: "50%", left: "15%", rotate: "6deg", opacity: 0.4 },
    { name: "Broadcom", top: "75%", left: "60%", rotate: "-3deg", opacity: 0.35 },
    { name: "Cisco", top: "30%", left: "95%", rotate: "4deg", opacity: 0.4 },
    { name: "AMD", top: "5%", left: "40%", rotate: "-2deg", opacity: 0.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 font-handwriting text-gray-400 select-none h-full">
      {companies.map((c, i) => (
        <div 
          key={i}
          className="absolute text-xl md:text-3xl font-bold transition-opacity duration-1000 ease-in-out hover:opacity-80 hover:text-white cursor-default"
          style={{ 
            top: c.top, 
            left: c.left, 
            transform: `rotate(${c.rotate})`, 
            opacity: c.opacity,
            zIndex: 0 
          }}
        >
          {c.name}
        </div>
      ))}
    </div>
  );
};

// --- VISUAL COMPONENTS ---

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12 animate-fade-in-up">
    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
      {title}
    </h2>
    {subtitle && (
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6" />
    )}
    <p className="text-gray-400 max-w-2xl text-lg font-light">
      {subtitle}
    </p>
  </div>
);

const ImpactCard = ({ role, company, dates, bullets, win, metrics }) => (
  <div className="bg-[#111] border border-gray-800 p-8 rounded-2xl hover:border-gray-600 transition-all duration-300 group relative mb-8">
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-start mb-6">
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{role}</h3>
        <div className="flex items-center text-blue-400 font-medium text-sm">
          <span>{company}</span>
          <span className="mx-2">•</span>
          <span className="font-mono text-gray-500">{dates}</span>
        </div>
      </div>
    </div>

    {/* Metrics - Business Impact First */}
    <div className="flex flex-wrap gap-3 mb-8">
      {metrics.map((m, i) => (
        <div key={i} className="px-3 py-1.5 bg-blue-900/20 border border-blue-800/50 rounded text-blue-200 text-xs font-bold tracking-wide">
          {m}
        </div>
      ))}
    </div>

    {/* Resume Style Bullet Points - Use bullets array primarily */}
    <ul className="space-y-3 text-sm text-gray-400 leading-relaxed list-disc pl-5 marker:text-gray-600">
      {bullets ? (
        bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))
      ) : (
        // Fallback for legacy data structure
        <>
           <li>{story}</li>
           <li>{win}</li>
        </>
      )}
    </ul>
  </div>
);

const ProjectCard = ({ title, type, hook, description, tags, link, brand }) => {
  const brandInfo = BRAND_COLORS[brand] || BRAND_COLORS.Hardware;
  const SymbolIcon = BRAND_SYMBOLS[brand] || BRAND_SYMBOLS.Hardware;

  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 flex flex-col h-full hover:bg-[#151515] transition-colors relative group overflow-hidden">
      
      {/* Boxed Branding Top Right */}
      <div className="absolute top-0 right-0 p-4 z-20">
        <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-xl ${brandInfo.bg} border ${brandInfo.border} backdrop-blur-sm shadow-lg`}>
           <div className="flex items-center justify-between w-full px-2 mb-1">
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:scale-110 transition-transform"
              >
                 <ExternalLink size={12} />
              </a>
              <SymbolIcon size={16} className={brandInfo.color} />
           </div>
           <span className={`text-[9px] font-bold uppercase tracking-wider ${brandInfo.color}`}>{brand}</span>
        </div>
      </div>

      {/* Header - Increased Top Margin to Prevent Overlap */}
      <div className="mt-20 mb-6 pr-4"> 
        <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 block ${brandInfo.color}`}>
          {type}
        </span>
        <h3 className="text-2xl font-black text-white mb-2 leading-tight">{title}</h3>
        <p className="text-gray-300 font-medium text-sm italic border-l-2 border-gray-700 pl-3">"{hook}"</p>
      </div>
      
      <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow pl-1">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((t, i) => (
          <span 
            key={i} 
            className={`
              px-3 py-1 text-[10px] font-bold rounded uppercase tracking-wider
              ${brandInfo.bg} ${brandInfo.color} border ${brandInfo.border}
            `}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- DOODLE VISUAL: THE CREATIVE TRIANGLE ---
const CreativeTriangle = () => (
  <div className="w-full max-w-4xl mx-auto my-24 relative font-handwriting select-none px-4 z-10">
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24 items-center justify-items-center">
      {/* Top Left: Software */}
      <div className="relative group w-full max-w-xs md:col-start-1 md:row-start-1 flex flex-col items-center">
         <svg className="absolute -bottom-12 -right-12 w-32 h-32 pointer-events-none z-0 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="6 4">
            <path d="M0 0 Q 50 50 100 100" />
            <rect x="30" y="30" width="10" height="8" fill="#111" stroke="#60A5FA" strokeWidth="1" transform="rotate(-10)" />
            <rect x="60" y="60" width="10" height="8" fill="#111" stroke="#60A5FA" strokeWidth="1" transform="rotate(10)" />
         </svg>
        <div className="absolute -top-12 -left-16 text-blue-300/80 rotate-[-12deg] text-lg font-bold hidden md:block">
            <span className="block">User Stories</span>
            <span className="block ml-4">PRDs & Specs</span>
        </div>
        <DoodleBox color="text-blue-400" className="p-6 w-full text-center bg-[#0a0a0a] border-2 border-transparent hover:border-blue-500/30 rounded-xl transition-all z-10">
           <Brain className="mx-auto text-blue-400 mb-3 animate-pulse" size={40} />
           <h3 className="text-2xl text-blue-400 font-bold mb-2">Software</h3>
           <p className="text-lg text-gray-300 font-bold leading-tight">User Needs &<br/>Engagement</p>
        </DoodleBox>
      </div>

      {/* Top Right: Hardware */}
      <div className="relative group w-full max-w-xs md:col-start-3 md:row-start-1 flex flex-col items-center">
        <svg className="absolute -bottom-12 -left-12 w-32 h-32 pointer-events-none z-0 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="#C084FC" strokeWidth="2">
           <path d="M100 0 L 100 50 L 0 100" strokeDasharray="0" />
           <rect x="80" y="30" width="10" height="10" fill="#111" stroke="#C084FC" strokeWidth="1" />
           <circle cx="100" cy="50" r="3" fill="#C084FC" />
        </svg>
        <div className="absolute -top-14 -right-20 text-purple-300/80 rotate-[8deg] text-lg font-bold hidden md:block text-right w-48">
          <span className="block">Latency limits</span>
          <span className="block mr-2">Memory (VRAM)</span>
        </div>
        <DoodleBox color="text-purple-400" className="p-6 w-full text-center bg-[#0a0a0a] border-2 border-transparent hover:border-purple-500/30 rounded-xl transition-all z-10">
           <Cpu className="mx-auto text-purple-400 mb-3 animate-pulse" size={40} />
           <h3 className="text-2xl text-purple-400 font-bold mb-2">Hardware</h3>
           <p className="text-lg text-gray-300 font-bold leading-tight">Constraints &<br/>Physics</p>
        </DoodleBox>
      </div>

      {/* Center: ME */}
      <div className="md:col-start-2 md:row-start-1 md:row-span-2 z-20 my-8 md:my-0 flex justify-center mt-24 md:mt-0">
         <div className="relative transform hover:rotate-0 transition-transform duration-300 cursor-default group">
            <div className="bg-[#FCD34D] text-black p-6 w-48 shadow-[8px_8px_0px_rgba(255,255,255,0.1)] border-4 border-black rounded-sm text-center relative transform rotate-[-2deg]">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-8 bg-white/40 backdrop-blur-sm rotate-[2deg] z-10"></div>
                <h2 className="text-5xl font-black leading-none tracking-tighter mb-1">ME</h2>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-800">The Bridge</p>
            </div>
         </div>
      </div>

      {/* Bottom Center: Business */}
      <div className="relative group w-full max-w-xs md:col-start-2 md:row-start-2 flex flex-col items-center mt-4 md:mt-16">
         <svg className="absolute -top-24 left-1/2 -translate-x-1/2 w-16 h-24 pointer-events-none z-0 hidden md:block" viewBox="0 0 50 100" fill="none" stroke="#4ADE80" strokeWidth="2">
             <path d="M25 100 L 25 0" strokeDasharray="4 4" />
             <text x="30" y="30" fill="#4ADE80" fontSize="20" fontFamily="font-handwriting">$</text>
             <text x="10" y="60" fill="#4ADE80" fontSize="14" fontFamily="font-handwriting">$</text>
         </svg>
         <div className="absolute top-4 -left-48 text-green-300/80 rotate-[5deg] text-lg font-bold hidden md:block w-44 text-right font-handwriting">
            <span className="block">Unit Economics</span>
            <span className="block">CAC / LTV</span>
         </div>
          <div className="absolute top-4 -right-32 text-green-300/60 rotate-[-4deg] text-sm hidden md:block w-32 text-left font-handwriting">
           ROI Models
        </div>
         <DoodleBox color="text-green-400" className="p-6 w-full text-center bg-[#0a0a0a] border-2 border-transparent hover:border-green-500/30 rounded-xl transition-all z-10">
           <TrendingUp className="mx-auto text-green-400 mb-3 animate-pulse" size={40} />
           <h3 className="text-2xl text-green-400 font-bold mb-2">Business</h3>
           <p className="text-lg text-gray-300 font-bold leading-tight">Viability &<br/>Profitability</p>
        </DoodleBox>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-green-300/60 text-sm font-sans hidden md:block w-full text-center">
            <span className="font-handwriting">Go-To-Market Strategy</span>
        </div>
      </div>
    </div>
  </div>
);

// --- VIEWS ---

const HomeView = ({ data, setActiveTab }) => (
  <div className="max-w-6xl mx-auto pt-8 md:pt-16 relative min-h-[80vh]">
    <CompanyStars />
    
    <div className="mb-12 text-center relative z-10">
       <div className="inline-block rotate-[-2deg] bg-yellow-300 text-black font-handwriting text-2xl px-6 py-2 mb-8 shadow-[4px_4px_0px_rgba(255,255,255,0.2)] transform hover:rotate-0 transition-transform duration-300 border-2 border-black cursor-default">
          Hi, I'm Jagadeesh!
       </div>
       <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
         SCALING AI <br/>
         <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 pb-2">
           ACROSS 3 WORLDS.
           <DoodleUnderline className="absolute -bottom-2 left-0 text-white/10 w-full h-4" />
         </span>
       </h1>
       <p className="text-xl md:text-2xl text-gray-300 font-handwriting max-w-4xl mx-auto leading-relaxed mb-12 tracking-wide">
         "Great AI products aren't just built. They are translated. <br className="hidden md:block" />
         I connect <span className="text-blue-400 font-bold">User Needs</span>, <span className="text-purple-400 font-bold">Hardware Limits</span>, and <span className="text-green-400 font-bold">Business Viability</span>."
       </p>
       <div className="flex justify-center gap-6 font-handwriting">
          <button 
            type="button"
            onClick={() => setActiveTab('experience')}
            className="px-8 py-3 bg-white text-black font-bold text-2xl rounded-sm hover:scale-105 transition-transform shadow-[4px_4px_0px_rgba(255,255,255,0.3)] border-2 border-black flex items-center gap-2 rotate-1 hover:rotate-0 cursor-pointer pointer-events-auto relative z-20"
          >
            See My Impact <ArrowRight size={24} strokeWidth={3} />
          </button>
          <a 
             href={data.profile.resumeUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold text-2xl rounded-sm hover:bg-white/10 transition-colors flex items-center gap-2 -rotate-1 hover:rotate-0"
          >
            Resume <Download size={24} strokeWidth={3} />
          </a>
       </div>
    </div>
    <CreativeTriangle />
  </div>
);

const ProjectsView = ({ data }) => (
  <div className="max-w-6xl mx-auto pt-8">
    <SectionTitle 
      title="The Workshop" 
      subtitle="Where I prove the concepts before asking engineers to build them." 
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.projects.map((p, i) => (
        <ProjectCard key={i} {...p} />
      ))}
    </div>
  </div>
);

const ExperienceView = ({ data }) => (
  <div className="max-w-5xl mx-auto pt-8">
    <SectionTitle 
      title="Track Record" 
      subtitle="I don't just manage products. I manage P&L, Latency, and Engagement." 
    />
    <div className="grid gap-8">
      {data.experience.map((job, i) => (
        <ImpactCard key={i} {...job} />
      ))}
    </div>
  </div>
);

const AboutView = ({ data }) => (
  <div className="max-w-5xl mx-auto pt-8">
    <SectionTitle title="About Me" subtitle="" />

    <div className="text-2xl md:text-3xl text-gray-200 font-normal mb-16 leading-relaxed border-l-4 border-blue-500 pl-8 py-2 font-sans tracking-wide">
      "I believe building products is about connecting dots others don't see. Here is a glimpse into my world—both at work and away from the keyboard."
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-20">
       {data.personal.map((item, i) => {
          const Icon = PERSONAL_ICONS[item.icon];
          return (
            <div key={i} className="bg-[#111] border border-gray-800 p-6 rounded-2xl flex flex-col items-center text-center hover:border-gray-600 transition-all group">
                <Icon size={32} className={`mb-3 ${item.color} group-hover:scale-110 transition-transform`} />
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{item.label}</p>
                <h4 className="text-lg font-bold text-white">{item.value}</h4>
            </div>
          )
       })}
    </div>

    <div className="space-y-12">
       <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Target className="mr-3 text-red-400" /> Product Strategy
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {data.skills.strategic.map((s, i) => (
               <div key={i} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 text-gray-300 text-sm font-medium text-center shadow-sm">
                 {s}
               </div>
             ))}
          </div>
       </div>
       <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Cpu className="mr-3 text-blue-400" /> Technical Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {data.skills.technical.map((s, i) => (
               <div key={i} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 text-gray-300 text-sm font-medium text-center shadow-sm">
                 {s}
               </div>
             ))}
          </div>
       </div>
       <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Layers className="mr-3 text-purple-400" /> Toolkit
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {data.skills.tools.map((s, i) => (
               <div key={i} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 text-gray-300 text-sm font-medium text-center shadow-sm">
                 {s}
               </div>
             ))}
          </div>
       </div>
    </div>
  </div>
);

const ContactView = ({ data, setModal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textField = document.createElement('textarea');
    textField.innerText = data.contact.email;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto pt-8">
       <SectionTitle title="Connect" subtitle="" />
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#111] border border-gray-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all group">
             <div className="w-12 h-12 bg-blue-900/20 rounded-xl flex items-center justify-center mb-6">
                <Mail className="text-blue-400" size={24} />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">Email</h3>
             <p className="text-gray-400 mb-8 text-sm">The best way to reach me for work inquiries.</p>
             <div className="flex items-center justify-between bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
                <span className="text-gray-300 font-mono text-sm truncate mr-4">{data.contact.email}</span>
                <button 
                  onClick={handleCopy}
                  className="text-gray-500 hover:text-white transition-colors"
                  title="Copy Email"
                >
                   {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                </button>
             </div>
          </div>

          <div className="space-y-4">
             {data.socials.map((s, i) => {
               const Icon = s.icon === 'Linkedin' ? Linkedin : s.icon === 'Twitter' ? Twitter : Instagram;
               return (
                 <a 
                   key={i} 
                   href={s.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center p-6 bg-[#111] border border-gray-800 rounded-2xl hover:bg-[#151515] hover:border-gray-600 transition-all group"
                 >
                    <div className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center mr-4 group-hover:bg-white group-hover:text-black transition-colors">
                       <Icon size={20} />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-white">{s.name}</h4>
                       <p className="text-xs text-gray-500 uppercase tracking-wider">Connect</p>
                    </div>
                    <ArrowRight className="ml-auto text-gray-600 group-hover:text-white transition-colors" size={20} />
                 </a>
               )
             })}
          </div>
       </div>
    </div>
  );
};

const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen, profile, onAdminClick }) => {
  const navItems = [
    { id: 'home', label: 'Mission', icon: Home },
    { id: 'experience', label: 'Impact', icon: Briefcase },
    { id: 'projects', label: 'Workshop', icon: Folder },
    { id: 'about', label: 'About', icon: User },
    { id: 'contact', label: 'Connect', icon: Mail },
  ];

  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 bg-black/90 z-40 md:hidden" onClick={() => setIsMobileOpen(false)} />}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 
        bg-gradient-to-b from-[#0a0a0a] to-[#111] border-r border-white/5
        transform transition-transform duration-300 ease-in-out flex flex-col justify-between
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-2xl
      `}>
        <div className="p-8">
          <div className="mb-12 pt-4">
            <h1 className="text-white font-black text-3xl tracking-tighter mb-1 leading-none">
              JAGADEESH<br />
              <span className="text-gray-600">PULI.</span>
            </h1>
            <p className="text-[10px] font-bold text-blue-500/80 uppercase tracking-[0.25em] mt-2">AI Product Manager</p>
          </div>
          <nav className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMobileOpen(false); 
                    // Scroll to top when switching tabs
                    window.scrollTo(0,0);
                  }}
                  className={`
                    w-full flex items-center space-x-4 px-4 py-3 rounded-full text-sm font-bold transition-all duration-300
                    ${isActive 
                      ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] translate-x-2' 
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 hover:translate-x-1'}
                  `}
                >
                  <Icon size={18} className={isActive ? 'text-blue-400' : ''} />
                  <span className="uppercase tracking-wider">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between text-[10px] text-gray-700 font-mono">
            <span>{profile.footer}</span>
            <button onClick={onAdminClick} className="text-gray-800 hover:text-gray-600 transition-colors">
              <Lock size={10} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

const LoginView = ({ onLogin }) => {
    const [input, setInput] = useState("");
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-xs text-center">
          <Lock className="mx-auto text-gray-600 mb-4" />
          <input 
            type="password" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && input === PASSCODE && onLogin()}
            placeholder="Admin Passcode"
            className="w-full bg-[#111] border border-gray-800 p-2 rounded text-center text-white focus:outline-none focus:border-white mb-4"
          />
          <button onClick={() => input === PASSCODE && onLogin()} className="w-full bg-white text-black font-bold py-2 rounded">Enter</button>
        </div>
      </div>
    );
  };
  
  const EditorView = ({ data, onSave, onReset, setModal }) => {
    const [jsonText, setJsonText] = useState(JSON.stringify(data, null, 2));
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const orderedKeys = ['profile', 'experience', 'projects', 'skills', 'personal', 'stats', 'competencies'];
      const orderedData = {};
      orderedKeys.forEach(key => {
        if (data[key]) orderedData[key] = data[key];
      });
      Object.keys(data).forEach(key => {
        if (!orderedKeys.includes(key)) orderedData[key] = data[key];
      });
      setJsonText(JSON.stringify(orderedData, null, 2));
    }, [data]);

    const handleSave = () => {
      try {
        onSave(JSON.parse(jsonText));
        alert("Saved!");
      } catch { setError("Invalid JSON"); }
    };
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col p-8 md:ml-64">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white">CMS</h2>
            <p className="text-gray-500 text-sm mt-1">Edit your portfolio content directly.</p>
          </div>
          <div className="space-x-3">
            <button onClick={onReset} className="px-6 py-3 text-red-400 border border-red-900/50 rounded-lg hover:bg-red-900/20 transition-colors">Reset Defaults</button>
            <button onClick={handleSave} className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">Save Changes</button>
          </div>
        </div>
        <textarea 
          value={jsonText} 
          onChange={(e) => setJsonText(e.target.value)} 
          className="flex-grow bg-[#0d0d0d] text-green-400 font-mono p-6 rounded-xl border border-gray-800 resize-none focus:outline-none focus:border-blue-500/50 leading-relaxed shadow-inner text-sm"
          style={{ height: '85vh' }}
        />
      </div>
    );
  };
  
  const App = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [data, setData] = useState(INITIAL_DATA);
    const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      const saved = localStorage.getItem('portfolioData_v2');
      if (saved) setData(JSON.parse(saved));
      setIsLoaded(true);
    }, []);
  
    const handleSave = useCallback((newData) => {
      setData(newData);
      localStorage.setItem('portfolioData_v2', JSON.stringify(newData));
    }, []);
  
    const handleReset = useCallback(() => {
      setData(INITIAL_DATA);
      localStorage.removeItem('portfolioData_v2');
    }, []);
  
    const handleAdminClick = useCallback(() => {
      if (activeTab === 'editor') {
        setIsAuthenticated(false);
        setActiveTab('home');
      } else {
        setActiveTab('editor');
      }
    }, [activeTab]);

    if (!isLoaded) return null;
  
    return (
      <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-blue-500 selection:text-white overflow-hidden relative">
         <link href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap" rel="stylesheet" />
  
        <div className="md:hidden fixed top-0 w-full bg-[#0a0a0a]/90 z-40 border-b border-gray-800 p-4 flex justify-between items-center backdrop-blur">
          <span className="font-bold tracking-tighter">JAGADEESH PULI</span>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)}>{isMobileOpen ? <XIcon /> : <Menu />}</button>
        </div>
  
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isMobileOpen={isMobileOpen} 
          setIsMobileOpen={setIsMobileOpen} 
          profile={data.profile} 
          onAdminClick={handleAdminClick}
        />
  
        <main className="md:ml-64 min-h-screen p-6 md:p-12 lg:p-20 transition-all relative z-10">
          <div className="mt-12 md:mt-0 animate-fade-in">
            {activeTab === 'home' && <HomeView data={data} setActiveTab={setActiveTab} />}
            {activeTab === 'experience' && <ExperienceView data={data} />}
            {activeTab === 'projects' && <ProjectsView data={data} />}
            {activeTab === 'about' && <AboutView data={data} />}
            {activeTab === 'contact' && <ContactView data={data} setModal={() => {}} />}
            {activeTab === 'editor' && (isAuthenticated ? <EditorView data={data} onSave={handleSave} onReset={handleReset} setModal={() => {}} /> : <LoginView onLogin={() => setIsAuthenticated(true)} />)}
          </div>
        </main>
        
        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
          .font-handwriting { font-family: 'Nanum Pen Script', cursive; }
          .animate-bounce-slow { animation: bounce 3s infinite; }
          @keyframes bounce {
            0%, 100% { transform: translateY(-5%); }
            50% { transform: translateY(0); }
          }
          .bg-grid-pattern {
            background-image: linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px);
            background-size: 40px 40px;
          }
        `}</style>
      </div>
    );
  };
  
  export default App;