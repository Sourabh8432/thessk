// ─── THESSK CONTENT DATA ─────────────────────────────────────────────────────
// Kept in a separate file so ThreeBackground.jsx can stay SSR-free

export const servicesContent = [
  {
    title: "WEB_PROTOCOLS",
    titleFull: "Web Development",
    slug: "web-development",
    externalLink: "https://web.thessk.in/",
    desc: "Custom websites, landing pages & e-commerce solutions built with modern frameworks — hyper-optimized for SEO, speed and conversions.",
    fullDesc: "We build high-performance, scalable websites that don't just look good but perform exceptionally. From complex e-commerce platforms to sleek corporate sites, our web solutions are engineered for speed, security, and search engine dominance. We use the latest technologies like Next.js and React to ensure your digital presence is future-proof.",
    features: [
      "Responsive & Adaptive Design",
      "SEO-First Architecture",
      "Blazing Fast Load Speeds",
      "Secure E-commerce Integration",
      "Custom CMS Solutions",
      "API & Third-party Integrations"
    ],
    process: [
      { step: "01", name: "Audit & Strategy", text: "Analyzing your current presence and defining technical goals." },
      { step: "02", name: "Architecture", text: "Planning the site structure and user flow for maximum conversion." },
      { step: "03", name: "Execution", text: "Writing clean, efficient code using modern frameworks." },
      { step: "04", name: "Launch", text: "Rigorous testing followed by seamless deployment." }
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    color: "#00b8ff",
    tag: "SYS_W3 // INVOKE",
    details: ["Business Websites", "Landing Pages", "E-commerce Stores", "Admin Dashboards", "CMS Integration", "Performance Optimization"]
  },
  {
    title: "MOBILE_SYNAPSE",
    titleFull: "App Development",
    slug: "app-development",
    desc: "Native & cross-platform mobile apps with Flutter, React Native & Firebase. From MVP to full-scale product launch.",
    fullDesc: "Our mobile app development service focuses on creating intuitive, high-performance applications for both iOS and Android. We leverage cross-platform technologies to reduce development costs while maintaining a native feel. Whether it's a social network, a fintech tool, or an internal business app, we bring your vision to the palm of your users' hands.",
    features: [
      "Native iOS & Android Performance",
      "Intuitive User Interfaces",
      "Offline Functionality",
      "Real-time Data Sync",
      "Push Notification Systems",
      "Secure Payment Gateways"
    ],
    process: [
      { step: "01", name: "Wireframing", text: "Mapping out every screen and interaction point." },
      { step: "02", name: "Prototyping", text: "Creating a clickable model to test the user experience." },
      { step: "03", name: "Development", text: "Building the app logic and integrating cloud backends." },
      { step: "04", name: "Deployment", text: "Managing App Store and Play Store submission processes." }
    ],
    tech: ["Flutter", "React Native", "Firebase", "Dart", "Redux", "GraphQL"],
    color: "#ff007f",
    tag: "SYS_MOB // DEPLOY",
    details: ["Android & iOS Apps", "Flutter Engine", "Firebase Backend", "API Integrations", "Push Notifications", "App Store Publishing"]
  },
  {
    title: "MARKET_MATRIX",
    titleFull: "Digital Marketing",
    slug: "digital-marketing",
    desc: "SEO, Google Ads & social media strategies engineered to drive traffic, leads and measurable revenue growth.",
    fullDesc: "Digital marketing at THESSK is a science. We don't just 'post on social media' — we engineer growth loops that consistently bring in high-quality leads. Our data-driven approach ensures that every rupee of your marketing budget is optimized for the highest possible ROI. We combine technical SEO with aggressive PPC strategies to dominate search results.",
    features: [
      "Technical SEO Audits",
      "Strategic Content Marketing",
      "High-ROI PPC Campaigns",
      "Social Media Management",
      "Email Marketing Automation",
      "Conversion Rate Optimization"
    ],
    process: [
      { step: "01", name: "Data Analysis", text: "Deep dive into your industry and competitor metrics." },
      { step: "02", name: "Funnel Design", text: "Creating a multi-channel strategy to capture leads." },
      { step: "03", name: "Campaign Launch", text: "Deploying targeted ads and optimized content." },
      { step: "04", name: "Optimization", text: "Continuous A/B testing and performance scaling." }
    ],
    tech: ["Google Ads", "Meta Ads", "Ahrefs", "Google Analytics 4", "Semrush", "Mailchimp"],
    color: "#ff4d4d",
    tag: "SYS_MKT // EXPAND",
    details: ["SEO Optimization", "Google Ads (PPC)", "Social Media", "Content Strategy", "Lead Generation", "Analytics & Reporting"]
  },
  {
    title: "VISUAL_IDENTITY",
    titleFull: "UI/UX Design",
    slug: "ui-ux-design",
    desc: "Beautiful, user-centric interfaces crafted to convert visitors into customers — wireframes to motion prototypes.",
    fullDesc: "We believe that great design is invisible — it just works. Our UI/UX design process starts with deep user research to understand pain points and motivations. We then craft pixel-perfect interfaces that guide users effortlessly toward their goals. From stunning visual aesthetics to smooth motion design, we create digital experiences that people love to use.",
    features: [
      "User Research & Personas",
      "Information Architecture",
      "Interactive Prototyping",
      "Advanced Motion Graphics",
      "Complete Design Systems",
      "Accessibility Compliance"
    ],
    process: [
      { step: "01", name: "Empathize", text: "Understanding user needs through interviews and research." },
      { step: "02", name: "Ideate", text: "Rapid sketching and low-fidelity wireframing." },
      { step: "03", name: "Design", text: "Applying visual styles and building interactive components." },
      { step: "04", name: "Test", text: "Validating the design with real users and iterating." }
    ],
    tech: ["Figma", "Adobe After Effects", "Spline", "Principle", "Framer", "Lottie"],
    color: "#ffaa00",
    tag: "SYS_VFX // CORE",
    details: ["Wireframing", "Visual Design", "Interactive Prototypes", "Usability Testing", "Design Systems", "Motion Design"]
  }
];

export const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" }
];

export const projects = [
  { name: "Apex E-Com", type: "Web // E-commerce", tech: "Next.js 15" },
  { name: "Nova Mobile", type: "App // Cross-Platform", tech: "Flutter 3.0" },
  { name: "Growth Matrix", type: "Marketing // PPC", tech: "Google Ads" },
  { name: "Prism UI", type: "Design // Motion", tech: "Figma / R3F" }
];

export const processSteps = [
  { id: "01", title: "DISCOVER", desc: "We audit your business goals, target audience and competitive landscape to craft a precise digital strategy." },
  { id: "02", title: "DESIGN", desc: "Pixel-perfect, user-centric interfaces crafted for maximum conversion and cinematic visual impact." },
  { id: "03", title: "DEVELOP", desc: "High-performance, scalable codebases built with modern frameworks — Next.js, Flutter, Firebase." },
  { id: "04", title: "GROW", desc: "Post-launch optimization: SEO, Google Ads, analytics and iterative growth loops." }
];

export const techStack = [
  "Next.js 16", "React 19", "Flutter", "Firebase", "TypeScript",
  "Three.js (WebGL)", "Tailwind CSS v4", "Node.js", "Express.js", "Python / Django",
  "PostgreSQL", "MongoDB", "Supabase", "Prisma ORM", "GraphQL",
  "Git & GitHub", "AWS Cloud", "Vercel Deploy", "Docker", "Framer Motion", "GSAP Animations", "Figma"
];

export const whyUs = [
  { title: "Custom Solutions", desc: "Every project tailor-made to your specific needs and goals." },
  { title: "Fast Delivery", desc: "Agile workflows ensure quick turnaround without cutting corners." },
  { title: "Affordable Pricing", desc: "Premium quality without the enterprise price tag." },
  { title: "Direct Access", desc: "Work directly with skilled developers — zero middlemen." },
  { title: "Long-Term Support", desc: "Ongoing maintenance and upgrades after launch." },
  { title: "Global Reach", desc: "Based in Jaipur, serving clients and startups worldwide." },
];
