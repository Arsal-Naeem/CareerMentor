import { AddEditCareerForm } from "@/components/admin/careers/AddEditCareerForm";
import { EventsHeader } from "@/components/admin/events/EventsComponents";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Compass } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddCareer as AddCareerMutation } from "@/apiService/Careers";

const AddCareer = () => {
  usePageTitle("Add New Career");

  const navigate = useNavigate();

  const { mutate: addCareer, isPending } = AddCareerMutation();

  const handleSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.name);
    formData.append("shortDesc", data.shortDesc || "");
    formData.append("longDesc", JSON.stringify(data.description));
    formData.append("status", data.status || "published");

    if (data.coverImage instanceof File) {
      formData.append("coverImage", data.coverImage);
    }

    addCareer(formData, {
      onSuccess: () => {
        navigate("/admin/dashboard/careers");
      },
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <EventsHeader
            icon={<Compass className="h-7 w-7 text-white" />}
            iconContainerClassName="!bg-custom-orange-light"
            title="Add New Career"
            buttonTitle="Back to Careers"
            onAddButtonClick={() => navigate("/admin/dashboard/careers")}
            buttonClassName="!bg-custom-orange-light"
            subtitle=""
          />

          <AddEditCareerForm
            onSubmit={handleSubmit}
            isLoading={isPending}
            loadingText="Adding..."
          />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AddCareer;
