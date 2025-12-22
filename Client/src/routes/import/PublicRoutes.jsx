import { lazy } from "react";

export const Home = lazy(() => import("@/pages/Home"));
export const Blogs = lazy(() => import("@/pages/blogs/Blogs"));
export const BlogDetails = lazy(() => import("@/pages/blogs/BlogDetail"));
export const Events = lazy(() => import("@/pages/events/Events"));
export const EventDetails = lazy(() => import("@/pages/events/EventDetails"));
export const Careers = lazy(() => import("@/pages/careers/Careers"));
export const CareerDetail = lazy(() => import("@/pages/careers/CareerDetail"));
