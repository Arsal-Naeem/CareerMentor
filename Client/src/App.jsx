import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { SplashScreen } from "./pages/splash/SplashScreen";
import { getRoutes } from "./routes";

function App() {
  const router = getRoutes();

  return (
    <Suspense fallback={<SplashScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
