import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { useAddNewLessonAdmin } from "@/apis/skillTracking/lessonTracking/lessonTracking.services";

const AddLessonModal = ({ open, onClose, moduleId }) => {
  const { mutateAsync: addLesson, isLoading } = useAddNewLessonAdmin(moduleId);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      isMandatory: true,
      resources: [{ type: "Other", url: "" }],
      learningPoints: [""],
      examples: [{ codeSnippet: "", description: "" }],
    },
  });

  // 🧩 Dynamic Field Arrays
  const { fields: resourceFields, append: addResource, remove: removeResource } =
    useFieldArray({ control, name: "resources" });
  const {
    fields: learningFields,
    append: addLearningPoint,
    remove: removeLearningPoint,
  } = useFieldArray({ control, name: "learningPoints" });
  const {
    fields: exampleFields,
    append: addExample,
    remove: removeExample,
  } = useFieldArray({ control, name: "examples" });

  // 🚀 Submit handler
  const onSubmit = async (data) => {
    try {
      console.log("Submitting Lesson Data:", data);
      await addLesson(data);
      reset();
      onClose();
    } catch (err) {
      console.error("Error adding lesson:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 bg-white shadow-xl">
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add New Lesson
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-4">
          {/* === Lesson Info Section === */}
          <section className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lesson Title
              </label>
              <Input
                {...register("title", { required: "Title is required" })}
                placeholder="Enter lesson title"
                className="mt-1"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                {...register("description", { required: "Description is required" })}
                placeholder="Write a short description"
                rows={3}
                className="mt-1"
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </section>

          {/* === Resources Section === */}
          <section className="space-y-3 border rounded-xl p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-base font-semibold text-gray-800">Resources</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => addResource({ type: "Other", url: "" })}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Resource
              </Button>
            </div>

            <div className="space-y-3">
              {resourceFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row gap-2 items-start sm:items-center bg-white p-3 rounded-lg shadow-sm border"
                >
                  <select
                    {...register(`resources.${index}.type`)}
                    className="border rounded-md px-2 py-1 text-sm w-full sm:w-32"
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="Udemy">Udemy</option>
                    <option value="W3School">W3School</option>
                    <option value="MDN">MDN</option>
                    <option value="Other">Other</option>
                  </select>
                  <Input
                    {...register(`resources.${index}.url`, {
                      required: "URL is required",
                    })}
                    placeholder="Enter resource URL"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeResource(index)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* === Learning Points === */}
          <section className="space-y-3 border rounded-xl p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-base font-semibold text-gray-800">
                Learning Points
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => addLearningPoint("")}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Point
              </Button>
            </div>
            <div className="space-y-3">
              {learningFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-2 items-center bg-white p-3 rounded-lg shadow-sm border"
                >
                  <Input
                    {...register(`learningPoints.${index}`, {
                      required: "Learning point cannot be empty",
                    })}
                    placeholder={`Learning Point #${index + 1}`}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeLearningPoint(index)}
                    className="text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* === Examples Section === */}
          <section className="space-y-3 border rounded-xl p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-base font-semibold text-gray-800">Examples</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => addExample({ codeSnippet: "", description: "" })}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Example
              </Button>
            </div>

            <div className="space-y-4">
              {exampleFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border p-3 rounded-lg bg-white shadow-sm space-y-3"
                >
                  <Textarea
                    {...register(`examples.${index}.codeSnippet`)}
                    placeholder="Code Snippet"
                    rows={3}
                  />
                  <Input
                    {...register(`examples.${index}.description`)}
                    placeholder="Example description"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeExample(index)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === Footer === */}
          <DialogFooter className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#59A4C0] hover:bg-[#4b93ad] w-full sm:w-auto"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Lesson"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonModal;
