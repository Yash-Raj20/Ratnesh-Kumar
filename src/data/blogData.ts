export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    slug: string;
    image: string;
    readTime: string;
    author: {
        name: string;
        role: string;
        image: string;
    };
    tags?: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "The Future of Web Animation: Beyond Parallax",
        excerpt: "Exploring how WebGL, GSAP, and R3F are shaping the next generation of immersive web experiences, moving beyond simple scroll effects to fully interactive 3D worlds.",
        content: `
            <p class="lead">Web animation has come a long way since the days of Flash. Today, with libraries like GSAP and Three.js, we can create immersive experiences that were previously thought impossible on the web.</p>
            
            <h2>The Rise of WebGL</h2>
            <p>WebGL allows us to tap into the power of the GPU to render high-performance graphics directly in the browser. This opens up a world of possibilities for creative developers, from 3D product visualizations to interactive data storytelling.</p>
            <p>Tools like <strong>React Three Fiber (R3F)</strong> have democratized 3D on the web, making it accessible to React developers. We're seeing a shift from static interfaces to spatial, depth-aware designs.</p>

            <h3>Why Performance Matters</h3>
            <p>While visual flair is important, performance should never be an afterthought. Optimizing animations for 60fps is crucial for maintaining a smooth user experience. This involves techniques like:</p>
            <ul>
                <li>Using \`will-change\` sparingly</li>
                <li>Minimizing layout thrashing</li>
                <li>Leveraging the composite layer for transforms and opacity</li>
            </ul>

            <blockquote>"Animation is not just decoration. It is a fundamental part of the user experience, guiding attention and explaining relationships between elements."</blockquote>

            <h2>GSAP: The Standard for DOM Animation</h2>
            <p>GreenSock Animation Platform (GSAP) remains the industry standard for robust, timeline-based animations. Its ScrollTrigger plugin has revolutionized how we build scroll-driven narratives.</p>
            
            <pre><code class="language-javascript">
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom top",
    scrub: true
  },
  x: 500,
  rotation: 360
});
            </code></pre>

            <h2>Conclusion</h2>
            <p>As browsers continue to evolve, so too will the capabilities of web animation. The key is to use these tools responsibly, enhancing the user journey without overwhelming it.</p>
        `,
        date: "Oct 12, 2024",
        category: "Development",
        slug: "future-of-web-animation",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        readTime: "8 min read",
        author: {
            name: "Ratnesh",
            role: "Frontend Engineer",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
        },
        tags: ["WebGL", "GSAP", "React", "Frontend"]
    },
    {
        id: 2,
        title: "Designing for Dark Mode: A Comprehensive Guide",
        excerpt: "Dark mode is more than just a color swap. It requires careful consideration of contrast, saturation, and elevation to ensure a premium and accessible user experience.",
        content: `
            <p class="lead">Dark mode is more than just a color swap. It requires careful consideration of contrast, saturation, and elevation to ensure legibility and visual comfort.</p>
            
            <h2>Color Theory for Dark Themes</h2>
            <p>Pure black (#000000) can cause eye strain due to high contrast with white text. Instead, use dark grays (e.g., #121212) to soften the interface. Desaturate colors to prevent them from vibrating against dark backgrounds.</p>

            <h3>Key Principles</h3>
            <ol>
                <li><strong>Avoid Pure Black:</strong> Use dark grey (#121212) for surfaces to allow shadows to be visible.</li>
                <li><strong>Desaturate Colors:</strong> Bright colors vibrate against dark backgrounds. Lower the saturation for better readability.</li>
                <li><strong>Use Elevation:</strong> Lighter surfaces indicate higher elevation in dark mode, mimicking how light hits closer objects.</li>
            </ol>

            <h2>Elevation and Depth</h2>
            <p>In light mode, we use shadows to convey depth. in dark mode, shadows are less visible. Instead, effective dark mode design uses lighter surface colors to indicate elevation—the closer an element is to the light source (the user), the lighter it should be.</p>
            
            <blockquote>"Dark mode isn't just a feature; it's an accessibility requirement and an aesthetic choice that conveys elegance."</blockquote>
        `,
        date: "Sep 28, 2024",
        category: "Design",
        slug: "designing-for-dark-mode",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
        readTime: "6 min read",
        author: {
            name: "Ratnesh",
            role: "Frontend Engineer",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
        },
        tags: ["UI/UX", "Design System", "Dark Mode"]
    },
    {
        id: 3,
        title: "Optimizing Next.js for Performance",
        excerpt: "Practical tips and techniques to achieve perfect Lighthouse scores with Next.js 14, focusing on Core Web Vitals, image optimization, and code splitting.",
        content: `
            <p class="lead">Next.js entails performance out of the box, but achieving a perfect 100 on Lighthouse requires attention to detail and a deep understanding of rendering strategies.</p>
            
            <h2>Image Optimization</h2>
            <p>The updated \`next/image\` component is a game-changer. Defaulting to lazy loading and properly sizing images for different viewports significantly reduces LCP (Largest Contentful Paint).</p>

            <h2>Server Components vs. Client Components</h2>
            <p>Move as much logic as possible to the server. Server Components reduce the client-side JavaScript bundle size, leading to faster TTI (Time to Interactive).</p>

            <h3>Code Splitting & Dynamic Imports</h3>
            <p>Break down large bundles by dynamically importing heavy components that aren't critical for the initial render. This keeps the main thread free and improves TBT (Total Blocking Time).</p>
            
            <pre><code class="language-javascript">
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})
            </code></pre>
        `,
        date: "Aug 15, 2024",
        category: "Engineering",
        slug: "optimizing-nextjs-performance",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
        readTime: "10 min read",
        author: {
            name: "Ratnesh",
            role: "Frontend Engineer",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
        },
        tags: ["Next.js", "Performance", "React"]
    },
    {
        id: 4,
        title: "The Art of Micro-Interactions",
        excerpt: "How subtle animations and feedback loops create a delightful user experience. Micro-interactions are the difference between a good product and a great one.",
        content: `
            <p class="lead">Micro-interactions are the small, functional animations that guide the user and provide feedback. They are the difference between a static interface and one that feels alive.</p>
            
            <h2>What are Micro-interactions?</h2>
            <p>They are single-use case events in the product. Examples include:</p>
            <ul>
                <li>The "Like" button animation</li>
                <li>Pull-to-refresh gestures</li>
                <li>Typing indicators in chat apps</li>
                <li>Progress bars</li>
            </ul>

            <h2>Why They Matter</h2>
            <p>Micro-interactions provide immediate feedback, improved navigation, and branding. They teach the user how to interact with the interface without explicit instructions.</p>
            
            <blockquote>"Details are not just details. They make the design." — Charles Eames</blockquote>
        `,
        date: "July 02, 2024",
        category: "UI/UX",
        slug: "art-of-micro-interactions",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?q=80&w=1887&auto=format&fit=crop",
        readTime: "4 min read",
        author: {
            name: "Ratnesh",
            role: "Frontend Engineer",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
        },
        tags: ["Interaction Design", "Animation", "UX"]
    },
    {
        id: 5,
        title: "Mastering Tailwind CSS Configuration",
        excerpt: "Deep dive into customizing tailwind.config.ts for scalable design systems. Learn how to extend themes, create custom plugins, and manage design tokens.",
        content: `
            <p class="lead">Tailwind CSS is powerful out of the box, but its true potential is unlocked when you customize the configuration to match your design system perfectly.</p>
            
            <h2>Extending the Theme</h2>
            <p>Don't just override; extend. This allows you to keep the default utilities while adding your own.</p>
            
            <pre><code class="language-javascript">
theme: {
  extend: {
    colors: {
      primary: '#FF5733',
      secondary: '#33FF57'
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    }
  }
}
            </code></pre>

            <h2>Custom Plugins</h2>
            <p>Write your own plugins to generate complex utilities or components that need to be reused across your project. This keeps your HTML clean and your CSS maintainable.</p>
        `,
        date: "June 18, 2024",
        category: "Engineering",
        slug: "mastering-tailwind-css",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop",
        readTime: "7 min read",
        author: {
            name: "Ratnesh",
            role: "Frontend Engineer",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
        },
        tags: ["CSS", "Tailwind", "Frontend"]
    }
];
