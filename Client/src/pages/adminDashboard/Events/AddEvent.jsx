import EventForm from "@/components/admin/events/EventForm";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { AddEvent as AddEventMutation } from "@/apiService/Events";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  usePageTitle("Add New Event");

  const navigate = useNavigate();

  const { mutate: addEvent, isPending } = AddEventMutation();

  const handleCreate = (data) => {
    const formData = new FormData();
    formData.append("title", data.name);
    formData.append("shortDesc", data.shortDesc || "");
    formData.append("eventDate", data.date);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    formData.append("venue", data.venue || "");
    formData.append("registration_type", data.registrationType || "internal");
    formData.append("registration_link", data.registrationLink || "");
    formData.append("tags", JSON.stringify(data.tags || []));
    if (data.description) {
      formData.append("longDesc", JSON.stringify(data.description));
    }
    if (data.coverImage instanceof File) {
      formData.append("coverImage", data.coverImage);
    }

    addEvent(formData, {
      onSuccess: () => {
        navigate("/admin/dashboard/events");
      },
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-6 space-y-6">
        <h1 className="text-3xl font-bold text-custom-text-orange">
          Add New Event
        </h1>

        <EventForm
          submitLabel="Create Event"
          onSubmit={handleCreate}
          loading={isPending}
        />
      </div>
    </AdminDashboardLayout>
  );
};

export default AddEvent;
