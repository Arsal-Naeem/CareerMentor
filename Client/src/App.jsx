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
import { Events } from "./pages/events/Events";
import { Careers } from "./pages/careers/Careers";
import {
  Achievements,
  Dashboard,
  AssessmentFlowManager,
  Mentors,
  Settings,
  SkillTracking,
} from "./pages/dashboard";
import { Blogs } from "./pages/blogs/Blogs";
import { BlogDetail } from "./pages/blogs/BlogDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs">
            <Route index element={<Blogs />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>
          <Route path="/events" element={<Events />} />
          <Route path="/careers" element={<Careers />} />
          {/* auth */}
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="verify-identity" element={<VerifyIdentity />} />
          </Route>
          {/* dashboard */}
          <Route path="/dashboard">
            <Route index element={<Dashboard />} />
            <Route
              path="career-assessment"
              element={<AssessmentFlowManager />}
            />
            <Route path="skill-tracker" element={<SkillTracking />} />
            <Route path="mentorship" element={<Mentors />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
