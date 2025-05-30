import PersonOne from "../assets/icons/person1.svg";
import PersonTwo from "../assets/icons/person2.svg";
import PersonThree from "../assets/icons/person3.svg";
import PersonFour from "../assets/icons/person4.svg";

export const floatingTestimonialsData = [
  {
    position: "top-20 left-36",
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    imageAlt: "Student testimonial",
    text: "Career Mentor has the best\nroadmaps for us students.",
    avatarBgColor: "bg-blue-100",
    textSize: "text-xs",
    textColor: "text-custom-gray-dark",
    borderColor: "border-gray-400",
    showBackground: false,
  },
  {
    position: "top-24 right-24",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    imageAlt: "Student testimonial",
    text: "Gamification helps me\nmotivated to keep learning.",
    avatarBgColor: "bg-orange-100",
    textSize: "text-sm",
    textColor: "text-gray-600",
    borderColor: "border-gray-300",
    showBackground: true,
  },
  {
    position: "bottom-36 left-20",
    imageSrc:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    imageAlt: "Student testimonial",
    text: "Career Mentor helped me\ngrow so much.",
    avatarBgColor: "bg-orange-100",
    textSize: "text-sm",
    textColor: "text-gray-600",
    borderColor: "border-gray-300",
    showBackground: true,
  },
  {
    position: "bottom-36 right-12",
    imageSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    imageAlt: "Student testimonial",
    text: "Signing up for Career Mentor is\nthe best decision of my life.",
    avatarBgColor: "bg-purple-100",
    textSize: "text-sm",
    textColor: "text-gray-600",
    borderColor: "border-gray-300",
    showBackground: true,
    maxWidth: "max-w-xs",
  },
];

export const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Steps", href: "#steps" },
  { label: "Feature", href: "#feature" },
  { label: "Testimonials", href: "#testimonials" },
];

export const stepsData = [
  {
    heading: "Discover Yourself",
    text: " Take our smart assessment to understand your unique strengths and interests.",
  },
  {
    heading: "Explore Career Paths",
    text: "Dive into top tech fields with clear roadmaps, job roles, and required skills.",
  },
  {
    heading: "Prepare & Connect",
    text: "Start learning, earn badges, and connect with real industry mentors.",
  },
];

export const features = [
  {
    title: "Career Assessment",
    description: "AI-based test to discover what suits you best",
  },
  {
    title: "Career Explorer",
    description: "Explore in-demand tech careers and what’s required",
  },
  {
    title: "Skill Tracking",
    description: "Visualize your learning progress with milestones",
  },
  {
    title: "Expert Guidance",
    description: "Book sessions with real industry professionals",
  },
  {
    title: "Events & Blogs",
    description: "Stay updated with local tech events & insights",
  },
  {
    title: "Gamification",
    description: "Earn points, badges & motivation along your path",
  },
];

export const testimonials = [
  {
    text: "CareerMentor helped me identify my true passion in AI, and now I’m confidently building my skills toward a Data Scientist career!",
    name: "Anas from NUST",
    image: PersonOne,
    borderColor: "#FFC36A",
  },
  {
    text: "Before CareerMentor, I was confused between Web Development and UI/UX. The personalized guidance helped me choose the right path!",
    name: "Aisha from FAST",
    image: PersonTwo,
    borderColor: "#FFD36E",
  },
  {
    text: "The step-by-step learning roadmaps and mentorship sessions gave me clarity that no university course ever did.",
    name: "Bilal from IBA",
    image: PersonThree,
    borderColor: "#A6E3F7",
  },
  {
    text: "CareerMentor helped me identify my true passion and confidently build a career in tech.",
    name: "Anas from GIKI",
    image: PersonFour,
    borderColor: "#8CD4FF",
  },
];
