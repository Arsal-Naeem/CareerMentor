import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";

const AdminDashboard = () => {
  usePageTitle("Admin Dashboard");

  return <AdminDashboardLayout>Admin Dashboard</AdminDashboardLayout>;
};

export default AdminDashboard;
