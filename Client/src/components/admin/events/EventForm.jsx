import Editor from "@/components/editor/examples/full/editor";
import { TagInput } from "@/components/inputs/TagsInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const EventForm = ({
  initialValues,
  onSubmit,
  submitLabel = "Save Event",
  loading = false,
}) => {
  // WIP: Validations aren't added yet
  const [formData, setFormData] = useState(
    initialValues
      ? initialValues
      : {
          name: "",
          description: null,
          date: "",
          time: "",
          venue: "",
          registrationLink: "",
          status: "pending",
          tags: [],
        }
  );
  const [tags, setTags] = useState(initialValues?.tags ?? []);

  const [descriptionContent, setDescriptionContent] = useState(
    initialValues?.description ? initialValues.description : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags,
      description: JSON.stringify(descriptionContent),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 grow">
      <div className="space-y-8">
        {/* Event Info */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Event Information
          </h2>

          <div className="space-y-3 col-span-1 lg:col-span-2">
            <Label>Event Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. AI Career Fair 2025"
              className="lg:max-w-md"
            />
          </div>

          <div className="space-y-3 col-span-1 lg:col-span-2">
            <Label>Description</Label>
            <Editor
              initialContent={descriptionContent}
              onChange={(content) => setDescriptionContent(content)}
            />
          </div>
        </section>

        {/* Date & Location */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Date & Location
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Venue</Label>
              <Input
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Venue or Online"
              />
            </div>

            <div>
              <Label>Start Time</Label>
              <Input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <Label>End Time</Label>
              <Input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Registration */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Registration & Tags
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label>Tags</Label>
              <TagInput
                name="tags"
                placeholder="Enter tags..."
                value={tags}
                onChange={setTags}
              />
            </div>
            <div className="space-y-4">
              <Label>Registration Link</Label>
              <Input
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="https://..."
                type="url"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="w-full md:w-fit md:self-end">
        <Button className="w-full bg-custom-text-orange" disabled={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
