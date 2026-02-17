
export const portfolioData = {
    hero: {
        title: "Frontend Developer",
        headingLine1: "Building dynamic",
        headingLine2: "web applications.",
        subtext: "Enthusiastic and dedicated Frontend Developer focused on creating seamless, interactive user experiences with attention to performance and UI/UX optimization.",
        ctaParams: {
            primary: { text: "View Works", link: "/projects" },
            secondary: { text: "View Resumes", link: "/resume" }
        }
    },
    about: {
        title: "About The Developer",
        headingLine1: "Passionate about",
        headingLine2: "seamless UX.",
        description: "I am a Frontend Developer with hands-on experience in React.js, JavaScript, and modern frontend tools. I specialize in responsive design, state management, and API integration, always aiming for scalable, pixel-perfect interfaces that align with brand identity.",
        tags: ["✨ React.js & Tailwind", "🚀 Performance Optimized", "🎨 UI/UX Focused"],
        primaryCta: { text: "My Journey", link: "/about" },
        image: "/profile.jpg",
        name: "Ratnesh Kumar",
        role: "Frontend Developer"
    },
    experience: [
        {
            company: "WebNX Pvt. Ltd",
            role: "Web Developer",
            period: "Sep 2024 - Jan 2025",
            description: "Built responsive, cross-platform UI using React.js and Tailwind CSS. Integrated secure authentication and collaborated with designers for pixel-perfect brand alignment."
        },
        {
            company: "Silver Oak University",
            role: "Internship Trainee",
            period: "Internship",
            description: "Gained practical experience in frontend/backend technologies. Built responsive web apps and integrated RESTful APIs using Context API for state management."
        }
    ],
    skills: {
        row1: ["React.js", "Next.js", "JavaScript (ES6+)", "Tailwind CSS", "Bootstrap", "Material UI", "HTML5", "CSS3"],
        row2: ["Node.js", "Express.js", "MongoDB", "Redux/Context API", "Git/GitHub", "RESTful APIs", "Figma", "VS Code"]
    },
    projects: [
        {
            id: 1,
            title: "Janseva Portal",
            category: "Civic Platform",
            image: "project1",
            description: "Civic issue reporting platform for Viksit Bharat initiative using React, Node, and Socket.io."
        },
        {
            id: 2,
            title: "Heavenstay",
            category: "Booking Platform",
            image: "project2",
            description: "Full-stack Airbnb-inspired villa booking app with CRUD, auth, and responsive UI."
        },
        {
            id: 3,
            title: "Portfolio Website",
            category: "Web Design",
            image: "project3",
            description: "Modern, high-performance portfolio website built with Next.js, Framer Motion, and GSAP."
        },
        {
            id: 4,
            title: "FitIndia",
            category: "Health & Fitness",
            image: "project4",
            description: "FitIndia app is a health and fitness app that helps users track their fitness goals and progress."
        }
    ]
};
