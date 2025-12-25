import {
  SettingsHeader,
  SettingsTabs,
} from "@/components/settings/SettingsComponents";
import { useAuth } from "@/context/AuthContext";
import usePageTitle from "@/hooks/usePageTitle";
import DashboardLayout from "@/layouts/DashboardLayout";

const Settings = () => {
  usePageTitle("Settings");

  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 space-y-4 min-h-screen">
        <SettingsHeader />
        <SettingsTabs user={user} />
      </div>
    </DashboardLayout>
  );
};
export default Settings;
