export const projects = [
    {
        id: 1,
        title: "E-Commerce Rebrand",
        category: "Web Design",
        description: "A complete visual overhaul for a fashion retailer.",
        year: "2023",
        color: "bg-blue-900",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
        details: {
            problem: "The client's existing site was outdated and suffering from high bounce rates due to poor navigation and slow load times.",
            solution: "We designed a mobile-first experience with a focus on visual storytelling. Using Next.js for performance and a headless CMS for content management.",
            outcome: "Bounce rates decreased by 40% and conversion rates improved by 25% within the first month of launch."
        },
        tech: ["Next.js", "Tailwind CSS", "Shopify", "Framer Motion"],
        features: ["Custom Shopping Cart", "AI Product Recommendations", "Lookbook Integration", "Seamless Checkout"],
        gallery: [
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
        ],
        testimonial: {
            name: "Sarah Jenkins",
            role: "CMO, FashionForward",
            quote: "The new design completely transformed our brand image. Sales have never been higher.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
        }
    },
    {
        id: 2,
        title: "Fintech Dashboard",
        category: "Product Design",
        description: "Real-time analytics dashboard for financial data.",
        year: "2023",
        color: "bg-emerald-900",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
        details: {
            problem: "Users struggled to visualize complex financial data sets, leading to decision paralysis.",
            solution: "Implemented interactive data visualization using D3.js and a modular component system for customizable dashboards.",
            outcome: "User engagement time increased by 300% and customer support tickets related to data confusion dropped significantly."
        },
        tech: ["React", "D3.js", "TypeScript", "Node.js"],
        features: ["Real-time Data Streaming", "Customizable Widgets", "Dark Mode Support", "Export to PDF/CSV"],
        gallery: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543286386-713df548e9cc?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2000&auto=format&fit=crop"
        ],
        testimonial: {
            name: "David Chen",
            role: "Product Lead, FinTech Sol",
            quote: "Our users finally love looking at their data. The dashboard is intuitive and powerful.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
        }
    },
    {
        id: 3,
        title: "AI Startup Landing",
        category: "Development",
        description: "Landing page with 3D elements for an AI company.",
        year: "2024",
        color: "bg-purple-900",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
        details: {
            problem: "The startup needed to explain complex AI concepts in a simple, engaging way to attract investors.",
            solution: "Created an immersive 3D scrolling experience that visually narrates the AI's capabilities as the user explores the page.",
            outcome: "Successfully raised Series A funding with investors citing the clarity of the product vision as a key factor."
        },
        tech: ["Three.js", "R3F", "GSAP", "Next.js"],
        features: ["3D Interactive Models", "Scroll-triggered Animations", "WebGL Performance Optimization", "Responsive Design"],
        gallery: [
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
        ],
        testimonial: {
            name: "Elena Rodriguez",
            role: "Founder, NeuralNet",
            quote: "The 3D elements blew everyone away. It perfectly captures our innovative spirit.",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
        }
    },
    {
        id: 4,
        title: "Luxury Hotel Site",
        category: "Web Design",
        description: "Booking platform for a boutique hotel chain.",
        year: "2022",
        color: "bg-amber-900",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop",
        details: {
            problem: "The booking process was cumbersome and did not reflect the premium nature of the hotel brand.",
            solution: "Streamlined the booking flow into a single-page application with elegant transitions and micro-interactions.",
            outcome: "Direct bookings increased by 50%, reducing reliance on third-party booking platforms."
        },
        tech: ["Vue.js", "Nuxt", "SCSS", "Stripe"],
        features: ["Single Page Booking", "Room Virtual Tours", "Dynamic Pricing Engine", "Multilingual Support"],
        gallery: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2000&auto=format&fit=crop"
        ],
        testimonial: {
            name: "Marcus Thorne",
            role: "GM, The Grand",
            quote: "Elegance meets functionality. Our guests compliment the website as much as the hotel itself.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
        }
    },
    {
        id: 5,
        title: "Portfolio v1",
        category: "Development",
        description: "Previous iteration of my personal portfolio.",
        year: "2021",
        color: "bg-zinc-800",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2000&auto=format&fit=crop",
        details: {
            problem: "Need a space to showcase early work.",
            solution: "Simple static site.",
            outcome: "Landed first job."
        },
        tech: ["HTML", "CSS", "Vanilla JS"],
        features: ["Static Site Generation", "Dark Mode", "Contact Form", "Blog Integration"],
        gallery: [
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2000&auto=format&fit=crop"
        ],
        testimonial: {
            name: "Ratnesh",
            role: "Developer",
            quote: "It was a great starting point for my journey.",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
        }
    },
    {
        id: 6,
        title: "Social Campaign",
        category: "Motion Design",
        description: "Animated social media assets for a product launch.",
        year: "2022",
        color: "bg-rose-900",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
        details: {
            problem: "Low engagement on social channels.",
            solution: "High-energy motion graphics.",
            outcome: "Viral reach."
        },
        tech: ["After Effects", "Lottie", "Illustrator"],
        features: ["Lottie Exports", "Vector Animation", "Sound Design", "Platform Optimization"],
        gallery: [
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1626544827763-d516dce335ca?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
        ],
        testimonial: {
            name: "Jessica Lee",
            role: "Social Media Manager",
            quote: "These animations stopped people scrolling. Engagement went through the roof.",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop"
        }
    },
];

export const projectCategories = ["All", "Web Design", "Development", "Product Design", "Motion Design"];

export const services = [
    {
        id: "web-design",
        title: "Web Design",
        description: "Crafting visually stunning and user-centric interfaces that tell your brand's story.",
        detailedDescription: "I believe that design is not just about how things look, but how they work. My web design process involves deep research into your brand and users, followed by iterative wireframing and high-fidelity prototyping. I focus on creating emotional connections through aesthetics, typography, and layout.",
        features: ["UI/UX Design", "Design Systems", "Prototyping", "Responsive Layouts"],
        icon: "Layout",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
        process: [
            { title: "Discovery", description: "Understanding your brand, goals, and target audience." },
            { title: "Wireframing", description: "Creating the structural blueprint of your website." },
            { title: "Visual Design", description: "Applying high-fidelity aesthetics and interactions." },
            { title: "Handoff", description: "Delivering production-ready assets and documentation." }
        ],
        tools: ["Figma", "Adobe XD", "Sketch", "Principle"],
        faqs: [
            { question: "How long does a typical redesign take?", answer: "A typical redesign takes 4-8 weeks depending on the scope and complexity." },
            { question: "Do you provide the source files?", answer: "Yes, you will receive full access to all design files and assets upon completion." }
        ]
    },
    {
        id: "development",
        title: "Development",
        description: "Building robust, scalable, and performant web applications using modern technologies.",
        detailedDescription: "I translate designs into pixel-perfect code. specialized in the React ecosystem (Next.js), I build fast, accessible, and SEO-friendly applications. I pay attention to code quality, performance optimization, and maintainability.",
        features: ["React / Next.js", "TypeScript", "Tailwind CSS", "Headless CMS Integration"],
        icon: "Code",
        image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2006&auto=format&fit=crop",
        process: [
            { title: "Planning", description: "Defining the technical architecture and stack." },
            { title: "Development", description: "Coding the frontend and integrating the backend." },
            { title: "Testing", description: "Rigorous QA for bugs, performance, and accessibility." },
            { title: "Deployment", description: "Launching your site to a global CDN." }
        ],
        tools: ["VS Code", "GitHub", "Vercel", "Postman"],
        faqs: [
            { question: "Will my site be mobile-friendly?", answer: "Absolutely. I follow a mobile-first approach to ensure your site looks great on all devices." },
            { question: "How do you handle SEO?", answer: "I implement best technical SEO practices including semantic HTML, meta tags, and fast load times." }
        ]
    },
    {
        id: "motion",
        title: "Motion & Branding",
        description: "Adding life and identity to digital products through purposeful motion and interaction.",
        detailedDescription: "Motion is the secret ingredient that makes a digital product feel alive. I use libraries like GSAP and Framer Motion to create smooth transitions, micro-interactions, and immersive scroll effects that guide the user and enhance the experience.",
        features: ["GSAP Animations", "Framer Motion", "WebGL / Three.js", "Logo Animation"],
        icon: "Zap",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        process: [
            { title: "Storyboarding", description: "Mapping out the animation flow and keyframes." },
            { title: "Animation", description: "Bringing static elements to life with code or tools." },
            { title: "Optimization", description: "Ensuring animations run smoothly at 60fps." },
            { title: "Integration", description: "Implementing the animations into the live build." }
        ],
        tools: ["After Effects", "Lottie", "GSAP", "Three.js"],
        faqs: [
            { question: "Will animations slow down my site?", answer: "Not if done correctly. I optimize every animation to ensure minimal impact on performance." },
            { question: "Can you animate my existing logo?", answer: "Yes, I can breathe new life into your existing brand assets." }
        ]
    },
    {
        id: "strategy",
        title: "Digital Strategy",
        description: "Aligning digital solutions with business goals to drive growth and engagement.",
        detailedDescription: "Before a single line of code is written, we need a plan. I help define the digital strategy, identifying the target audience, key performance indicators, and the best technical approach to achieve your business objectives.",
        features: ["Technical Consultation", "Performance Audits", "SEO Strategy", "Accessibility Review"],
        icon: "Layers",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        process: [
            { title: "Audit", description: "Analyzing your current digital presence." },
            { title: "Research", description: "Studying competitors and market trends." },
            { title: "Strategy", description: "Developing a roadmap for success." },
            { title: "Execution", description: "Overseeing the implementation of the strategy." }
        ],
        tools: ["Analytics", "Semrush", "Lighthouse", "Hotjar"],
        faqs: [
            { question: "Why do I need a digital strategy?", answer: "A strategy ensures that your digital efforts are aligned with your business goals, saving time and money in the long run." },
            { question: "Do you offer ongoing consulting?", answer: "Yes, I can partner with you long-term to guide your digital growth." }
        ]
    }
];
