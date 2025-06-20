import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

//Protected Routes
import { PublicRoute, UserProtectedRoute, AdminProtectedRoute } from "./components/protectedRoute/protectedRoutes";

//Authentication
import {
  ForgotPassword,
  Login,
  Signup,
  VerifyIdentity,
  ResetPassword,
  ResendOtp,
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

// blogs
import { Blogs } from "./pages/blogs/Blogs";
import { BlogDetail } from "./pages/blogs/BlogDetail";
import AddNewBlog from "./pages/blogs/AddNewBlog";

// admin
import { AdminDashboard } from "./pages/adminDashboard/AdminDashboard";
import AdminBlogs from "./pages/adminDashboard/Blogs/AdminBlogs";
import AdminEvents from "./pages/adminDashboard/Events/AdminEvents";
import CareerExplorer from "./pages/adminDashboard/CareerExplorer/CareerExplorer";
import AdminBlogDetails from "./pages/adminDashboard/Blogs/AdminBlogDetails";

// user blogs
import UserBlogs from "./pages/dashboard/blogs/UserBlogs";

function App() {
  return (
    <>
      {/* TODO : avoid repetition here and store the routes in separate file */}
      <BrowserRouter>
        <Routes>
          {/* Public Routes - Accessible to everyone */}
          <Route path="/" element={<Home />} />
          <Route path="/blogs">
            <Route index element={<Blogs />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>
          <Route path="/events" element={<Events />} />
          <Route path="/careers" element={<Careers />} />

          {/* Auth Routes - Only for guests (redirects logged-in users) */}
          <Route path="/auth">
            <Route 
              path="login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="signup" 
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } 
            />
            <Route 
              path="forgot-password" 
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              } 
            />
            <Route 
              path="reset-password/:token" 
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              } 
            />
            <Route 
              path="verify-identity" 
              element={<VerifyIdentity />} 
            />
            <Route 
              path="resend-otp" 
              element={<ResendOtp />} 
            />
          </Route>

          {/* User Dashboard Routes - Protected for authenticated users */}
          <Route path="/dashboard">
            <Route 
              index 
              element={
                <UserProtectedRoute>
                  <Dashboard />
                </UserProtectedRoute>
              } 
            />
            <Route
              path="career-assessment"
              element={
                <UserProtectedRoute>
                  <AssessmentFlowManager />
                </UserProtectedRoute>
              }
            />
            <Route 
              path="skill-tracker" 
              element={
                <UserProtectedRoute>
                  <SkillTracking />
                </UserProtectedRoute>
              } 
            />
            <Route 
              path="mentorship" 
              element={
                <UserProtectedRoute>
                  <Mentors />
                </UserProtectedRoute>
              } 
            />
            <Route 
              path="achievements" 
              element={
                <UserProtectedRoute>
                  <Achievements />
                </UserProtectedRoute>
              } 
            />
            <Route 
              path="settings" 
              element={
                <UserProtectedRoute>
                  <Settings />
                </UserProtectedRoute>
              } 
            />
            <Route 
              path="my-blogs" 
              element={
                <UserProtectedRoute>
                  <UserBlogs />
                </UserProtectedRoute>
              } 
            />
            <Route 
              path="add-new-blogs" 
              element={
                <UserProtectedRoute>
                  <AddNewBlog />
                </UserProtectedRoute>
              } 
            />
          </Route>

          {/* Admin Dashboard Routes - Protected for admin users only */}
          <Route path="/admin-dashboard">
            <Route 
              index 
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="blogs" 
              element={
                <AdminProtectedRoute>
                  <AdminBlogs />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="blogs/:id" 
              element={
                <AdminProtectedRoute>
                  <AdminBlogDetails />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="events" 
              element={
                <AdminProtectedRoute>
                  <AdminEvents />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="career-explorer" 
              element={
                <AdminProtectedRoute>
                  <CareerExplorer />
                </AdminProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;