import { GetCareerById, UpdateCareer } from "@/apiService/Careers";
import { AddEditCareerForm } from "@/components/admin/careers/AddEditCareerForm";
import { EventsHeader } from "@/components/admin/events/EventsComponents";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Compass } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const EditCareer = () => {
  usePageTitle("Edit Career");

  const navigate = useNavigate();
  const { id: careerId } = useParams();

  const { data, isLoading, isError } = GetCareerById(careerId);
  const { mutate: updateCareer, isPending } = UpdateCareer();

  const handleSubmit = (formValues) => {
    const formData = new FormData();
    formData.append("title", formValues.name);
    formData.append("shortDesc", formValues.shortDesc);
    formData.append("longDesc", JSON.stringify(formValues.description));
    formData.append("status", formValues.status);

    if (formValues.coverImage && formValues.coverImage instanceof File) {
      formData.append("coverImage", formValues.coverImage);
    }

    updateCareer(
      { careerId, formData },
      {
        onSuccess: () => {
          navigate("/admin/dashboard/careers");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <AdminDashboardLayout>
        <div className="min-h-screen bg-white flex items-center justify-center h-full">
          <p className="text-custom-gray-dark text-2xl">
            Loading career data...
          </p>
        </div>
      </AdminDashboardLayout>
    );
  }

  if (isError) {
    return (
      <AdminDashboardLayout>
        <div className="min-h-screen bg-white flex items-center justify-center h-full">
          <p className="text-red-500">Failed to load career data</p>
        </div>
      </AdminDashboardLayout>
    );
  }

  const initialData = data?.career
    ? {
        name: data.career.title,
        shortDesc: data.career.shortDesc,
        description:
          typeof data.career.longDesc === "string"
            ? JSON.parse(data.career.longDesc)
            : data.career.longDesc,
        coverImage: data.career.imageUrl,
        status: data.career.status,
      }
    : null;

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <EventsHeader
            icon={<Compass className="h-7 w-7 text-white" />}
            iconContainerClassName="!bg-custom-orange-light"
            title="Edit Career"
            buttonTitle="Back to Careers"
            onAddButtonClick={() => navigate("/admin/dashboard/careers")}
            buttonClassName="bg-custom-orange-light"
            subtitle=""
          />

          <AddEditCareerForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={isPending}
            loadingText="Updating..."
          />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default EditCareer;
