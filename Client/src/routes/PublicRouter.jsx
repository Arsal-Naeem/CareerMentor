import {
  BLOG_ROUTES,
  CAREERS_ROUTE,
  EVENTS_ROUTE,
  HOME_ROUTE,
} from "@/constants/navigation";
import {
  Home,
  BlogDetails,
  Blogs,
  CareerDetail,
  Careers,
  EventDetails,
  Events,
} from "./import/PublicRoutes";

export const publicRouter = [
  {
    path: HOME_ROUTE,
    element: <Home />,
  },
  {
    path: BLOG_ROUTES.INDEX,
    children: [
      {
        index: true,
        element: <Blogs />,
      },
      {
        path: BLOG_ROUTES.DETAILS,
        element: <BlogDetails />,
      },
    ],
  },
  {
    path: EVENTS_ROUTE.INDEX,
    children: [
      {
        index: true,
        element: <Events />,
      },
      {
        path: EVENTS_ROUTE.DETAILS,
        element: <EventDetails />,
      },
    ],
  },
  {
    path: CAREERS_ROUTE.INDEX,
    children: [
      {
        index: true,
        element: <Careers />,
      },
      {
        path: CAREERS_ROUTE.DETAILS,
        element: <CareerDetail />,
      },
    ],
  },
];
