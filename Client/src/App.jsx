import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

//Authentication
import {
  ForgotPassword,
  Login,
  Signup,
  VerifyIdentity,
  ResetPassword,
} from "./pages/auth";

//Pages
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/verify-identity" element={<VerifyIdentity />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
