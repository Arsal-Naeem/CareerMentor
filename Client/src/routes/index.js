import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "./AuthRouter";
import { publicRouter } from "./PublicRouter";
import { userRouter } from "./UserRouter";
import { adminRouter } from "./AdminRouter";

export const getRoutes = () => {
  return createBrowserRouter([
    ...publicRouter,
    ...authRouter,
    ...userRouter,
    ...adminRouter,
  ]);
};
