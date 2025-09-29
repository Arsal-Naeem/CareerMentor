const bulkFrontendModules = [
  {
    category: "frontend",
    title: "Responsive Design",
    description: "Use media queries and mobile-first design to make your web pages look great on all devices.",
    badge: "Responsive Design Expert",
    totalXP: 80,
    sequence: 5,
  },
  {
    category: "frontend",
    title: "JavaScript ES6+ Features",
    description: "Explore modern JavaScript features like arrow functions, template literals, destructuring, and modules.",
    badge: "JavaScript Specialist",
    totalXP: 100,
    sequence: 6,
  },
  {
    category: "frontend",
    title: "Working with Arrays & Objects",
    description: "Learn to manipulate arrays and objects efficiently in JavaScript.",
    badge: "Data Manipulation Pro",
    totalXP: 70,
    sequence: 7,
  },
  {
    category: "frontend",
    title: "AJAX & Fetch API",
    description: "Fetch data from APIs asynchronously and update UI dynamically.",
    badge: "API Integration Expert",
    totalXP: 90,
    sequence: 8,
  },
  {
    category: "frontend",
    title: "LocalStorage & SessionStorage",
    description: "Store and retrieve data in the browser using local and session storage.",
    badge: "Web Storage Professional",
    totalXP: 60,
    sequence: 9,
  },
  {
    category: "frontend",
    title: "Debugging & Browser DevTools",
    description: "Inspect elements, debug JavaScript, and profile performance in browsers.",
    badge: "Debugging Specialist",
    totalXP: 70,
    sequence: 10,
  },
  {
    category: "frontend",
    title: "CSS Animations & Transitions",
    description: "Add animations and transitions to enhance UI interactions.",
    badge: "UI Animation Expert",
    totalXP: 70,
    sequence: 11,
  },
  {
    category: "frontend",
    title: "CSS Preprocessors (Sass/LESS)",
    description: "Use variables, nesting, and mixins to write efficient CSS.",
    badge: "CSS Preprocessor Specialist",
    totalXP: 80,
    sequence: 12,
  },
  {
    category: "frontend",
    title: "Introduction to Frontend Frameworks",
    description: "Get started with popular frontend frameworks like React, Vue, or Angular.",
    badge: "Frameworks Explorer",
    totalXP: 90,
    sequence: 13,
  },
  {
    category: "frontend",
    title: "React Basics",
    description: "Learn React components, JSX, props, and state.",
    badge: "React Developer",
    totalXP: 90,
    sequence: 14,
  },
  {
    category: "frontend",
    title: "React Hooks",
    description: "Use useState, useEffect, and other React hooks effectively.",
    badge: "React Hooks Specialist",
    totalXP: 100,
    sequence: 15,
  },
  {
    category: "frontend",
    title: "Routing in React",
    description: "Manage navigation in single-page React applications using React Router.",
    badge: "React Router Expert",
    totalXP: 80,
    sequence: 16,
  },
  {
    category: "frontend",
    title: "State Management: Context API",
    description: "Learn how to manage state using React's built-in Context API.",
    badge: "Context API Professional",
    totalXP: 90,
    sequence: 17,
  },
  {
    category: "frontend",
    title: "State Management: Redux",
    description: "Understand global state management with Redux and middleware like Thunk or Saga.",
    badge: "Redux Specialist",
    totalXP: 120,
    sequence: 18,
  },
  {
    category: "frontend",
    title: "State Management: Modern Tools",
    description: "Learn lightweight and modern state management libraries like Zustand, Jotai, and Recoil.",
    badge: "Advanced State Management Pro",
    totalXP: 100,
    sequence: 19,
  },
  {
    category: "frontend",
    title: "Styling in React",
    description: "Explore Tailwind CSS, Styled Components, and CSS Modules for styling React apps.",
    badge: "UI Styling Expert",
    totalXP: 90,
    sequence: 20,
  },
  {
    category: "frontend",
    title: "API Handling in React",
    description: "Fetch and manage API data using Axios, Fetch API, React Query, and SWR.",
    badge: "API Handling Professional",
    totalXP: 100,
    sequence: 21,
  },
  {
    category: "frontend",
    title: "Testing React Applications",
    description: "Learn unit testing and integration testing for React apps using Jest and React Testing Library.",
    badge: "Testing Specialist",
    totalXP: 90,
    sequence: 22,
  },
  {
    category: "frontend",
    title: "React Performance Optimization",
    description: "Optimize React apps using memoization, lazy loading, and performance profiling.",
    badge: "Performance Optimization Pro",
    totalXP: 100,
    sequence: 23,
  },
  {
    category: "frontend",
    title: "Working with Forms in React",
    description: "Handle controlled and uncontrolled components, validation, and submission in React.",
    badge: "Forms Specialist",
    totalXP: 80,
    sequence: 24,
  },

  // Advanced modules (sequences 25-32)
  {
    category: "frontend",
    title: "Version Control with Git",
    description: "Master Git commands, branching, merging, pull requests, and collaborative development workflows.",
    badge: "Git Professional",
    totalXP: 80,
    sequence: 25,
  },
  {
    category: "frontend",
    title: "Build Tools & Module Bundlers",
    description: "Learn Webpack, Vite, Parcel, and modern build processes for optimized frontend applications.",
    badge: "Build Tools Specialist",
    totalXP: 90,
    sequence: 26,
  },
  {
    category: "frontend",
    title: "TypeScript Fundamentals",
    description: "Add type safety to JavaScript applications with TypeScript syntax, interfaces, and generics.",
    badge: "TypeScript Specialist",
    totalXP: 110,
    sequence: 27,
  },
  {
    category: "frontend",
    title: "TypeScript with React",
    description: "Build type-safe React applications with TypeScript, including props typing and hooks.",
    badge: "TypeScript React Pro",
    totalXP: 100,
    sequence: 28,
  },
  {
    category: "frontend",
    title: "Next.js Framework",
    description: "Build production-ready React applications with Next.js, including SSR, SSG, and API routes.",
    badge: "Next.js Specialist",
    totalXP: 120,
    sequence: 29,
  },
  {
    category: "frontend",
    title: "Progressive Web Apps (PWA)",
    description: "Create app-like experiences with service workers, offline functionality, and push notifications.",
    badge: "PWA Developer",
    totalXP: 100,
    sequence: 30,
  },
  {
    category: "frontend",
    title: "Web Security Best Practices",
    description: "Learn about XSS, CSRF protection, content security policy, and secure authentication in frontend apps.",
    badge: "Web Security Expert",
    totalXP: 90,
    sequence: 31,
  },
  {
    category: "frontend",
    title: "Deployment & DevOps",
    description: "Deploy frontend applications using Netlify, Vercel, AWS, and implement CI/CD pipelines.",
    badge: "Deployment Specialist",
    totalXP: 90,
    sequence: 32,
  }

];

import { Op } from "sequelize";
import { Module } from "../../../models/index.js"; // adjust the path if needed

export const seedModules = async () => {
  try {
    console.log("Starting module seeding...");

    for (const moduleData of bulkFrontendModules) {
      const { category, title, description, badge, totalXP, sequence } = moduleData;

      // Generate module ID based on category and sequence
      const moduleId = `module-${category}-${sequence}`;

      // Check if module already exists
      const existingModule = await Module.findByPk(moduleId);
      if (existingModule) {
        console.log(`Skipping existing module: ${moduleId}`);
        continue;
      }

      // Create the module
      await Module.create({
        id: moduleId,
        title,
        description,
        badge,
        totalXP,
        sequence,
      });

      console.log(`Created module: ${moduleId} - ${title}`);
    }

    console.log("Module seeding completed successfully!");
    process.exit(0); // exit after completion
  } catch (error) {
    console.error("Error seeding modules:", error);
    process.exit(1);
  }
};
