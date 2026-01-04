import EventForm from "@/components/admin/events/EventForm";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { GetEventById, UpdateEvent } from "@/apiService/Events";

const EditEvent = () => {
  usePageTitle("Edit Event");

  const navigate = useNavigate();
  const { id: eventId } = useParams();

  const { data, isLoading } = GetEventById(eventId);

  const { mutate: updateEvent, isPending } = UpdateEvent();

  const handleUpdate = (formValues) => {
    const formData = new FormData();
    formData.append("title", formValues.name);
    formData.append("shortDesc", formValues.shortDesc || "");
    formData.append("eventDate", formValues.date);
    formData.append("startTime", formValues.startTime);
    formData.append("endTime", formValues.endTime);
    formData.append("venue", formValues.venue || "");
    formData.append(
      "registration_type",
      formValues.registrationType || "internal"
    );
    formData.append("registration_link", formValues.registrationLink || "");
    formData.append("tags", JSON.stringify(formValues.tags || []));

    if (formValues.description) {
      formData.append("longDesc", formValues.description);
    }

    if (formValues.coverImage && formValues.coverImage instanceof File) {
      formData.append("coverImage", formValues.coverImage);
    }

    updateEvent(
      { eventId, formData },
      {
        onSuccess: () => {
          navigate("/admin/dashboard/events");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <AdminDashboardLayout>
        <div className="max-w-7xl mx-auto py-8 px-6 flex items-center justify-center h-full">
          <p className="text-custom-gray-dark text-2xl">
            Loading event data...
          </p>
        </div>
      </AdminDashboardLayout>
    );
  }

  const initialValues = data?.event
    ? {
        name: data.event.title,
        shortDesc: data.event.shortDesc,
        description:
          typeof data.event.longDesc === "string"
            ? JSON.parse(data.event.longDesc)
            : data.event.longDesc,
        date: data.event.eventDate,
        startTime: data.event.startTime,
        endTime: data.event.endTime,
        venue: data.event.venue,
        registrationType: data.event.registration_type,
        registrationLink: data.event.registration_link,
        tags: data.event.EventTags || [],
        status: data.event.status,
        image_url: data.event.image_url,
      }
    : null;

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-6 space-y-6">
        <h1 className="text-3xl font-bold text-custom-text-orange">
          Edit Event
        </h1>

        <EventForm
          initialValues={initialValues}
          submitLabel="Update Event"
          onSubmit={handleUpdate}
          loading={isPending}
          loadingText="Updating..."
        />
      </div>
    </AdminDashboardLayout>
  );
};

export default EditEvent;
