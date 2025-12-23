import Editor from "@/components/editor/examples/full/editor";
import { InputField } from "@/components/InputField/InputField";
import { DatePicker } from "@/components/inputs/DatePicker";
import { TagInput } from "@/components/inputs/TagsInput";
import { Button } from "@/components/ui/button";
import { EventFormSchema } from "@/validations";
import { useForm } from "react-hook-form";

const EventForm = ({
  initialValues,
  onSubmit,
  submitLabel = "Save Event",
  loading = false,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: initialValues || {
      name: "",
      description: initialValues?.description || null,
      date: null,
      venue: "",
      startTime: "",
      endTime: "",
      registrationLink: "",
      tags: [],
      status: "pending",
    },
    resolver: EventFormSchema,
  });

  const onSubmitForm = (data) => {
    onSubmit({
      ...data,
      description: JSON.stringify(data.description),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col gap-10 grow"
    >
      <div className="space-y-8">
        {/* Event Info */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Event Information
          </h2>

          <div className="space-y-3 col-span-1 lg:col-span-2">
            <InputField
              name="name"
              label="Event Name"
              placeholder="e.g. AI Career Fair 2025"
              control={control}
              showAsterisk
            />
          </div>

          <div className="space-y-3 col-span-1 lg:col-span-2">
            <InputField
              name="description"
              label="Description"
              component={Editor}
              control={control}
              showAsterisk
            />
          </div>
        </section>

        {/* Date & Location */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Date & Location
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <InputField
              name="date"
              label="Date"
              component={DatePicker}
              control={control}
              placeholder="12/04/2003"
              showAsterisk
            />

            <InputField
              name="venue"
              label="Venue"
              placeholder="Venue or Online"
              control={control}
              showAsterisk
            />

            <InputField
              name="startTime"
              label="Start Time"
              type="time"
              control={control}
              showAsterisk
            />

            <InputField
              name="endTime"
              label="End Time"
              type="time"
              control={control}
              showAsterisk
            />
          </div>
        </section>

        {/* Registration */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Registration & Tags
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InputField
              name="registrationLink"
              label="Registration Link"
              placeholder="https://..."
              type="url"
              control={control}
              showAsterisk
            />

            <InputField
              name="tags"
              label="Tags"
              component={TagInput}
              control={control}
              placeholder="Enter tags..."
            />
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="w-full md:w-fit md:self-end">
        <Button
          className="w-full bg-custom-text-orange hover:bg-custom-orange"
          disabled={loading}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
