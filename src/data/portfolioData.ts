
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
        role: "Frontend Developer",
        githubUsername: "Yash-Raj20"
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
        row1: [
            { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "JavaScript (ES6+)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
            { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
            { name: "Material UI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
            { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
        ],
        row2: [
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
            { name: "Redux/Context API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
            { name: "Git/GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
            { name: "RESTful APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/icons/chrome/chrome-original.svg" }, // Placeholder for REST
            { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
            { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" }
        ]
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
