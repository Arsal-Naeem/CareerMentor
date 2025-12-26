import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InputField } from "../InputField/InputField";
import { TagInput } from "../inputs/TagsInput";
import { UploadImage } from "../inputs/UploadImage";
import { useEffect } from "react";

export default function ProjectModal({
  mode = "add",
  initialData,
  open,
  setOpen,
  onSubmit,
}) {
  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      projectName: "",
      description: "",
      techStack: [],
      url: "",
      coverImage: null,
      coverImagePreview: null,
    },
    mode: "all",
    resolver: yupResolver(ProjectFormSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        projectName: initialData.projectName ?? "",
        description: initialData.description ?? "",
        techStack: initialData.techStack ?? [],
        url: initialData.url ?? "",
        coverImage: null,
        coverImagePreview: initialData.coverImage ?? null,
      });
    }
  }, [initialData, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="px-2">
          <DialogTitle>
            {mode === "edit" ? "Edit Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-4 h-full">
          <div className="flex flex-col gap-4 overflow-y-auto h-96 px-2">
            <InputField
              name="projectName"
              htmlFor="projectName"
              label="Project Name"
              placeholder="Ecommerce App"
              control={control}
              labelClassName="!font-medium"
              showAsterisk
            />

            <InputField
              isTextArea
              name="description"
              htmlFor="description"
              label="Description"
              placeholder="Describe your project"
              control={control}
              labelClassName="!font-medium"
              showAsterisk
            />

            <InputField
              name="techStack"
              htmlFor="techStack"
              label="Tech Stack"
              placeholder="e.g. React, Node.js"
              component={TagInput}
              labelClassName="!font-medium"
              control={control}
            />

            <InputField
              name="url"
              htmlFor="url"
              label="URL"
              placeholder="https://yourproject.com"
              type="url"
              labelClassName="!font-medium"
              control={control}
            />

            <InputField
              name="coverImage"
              label="Cover Image"
              component={UploadImage}
              control={control}
              preview={watch("coverImagePreview")}
              setValue={setValue}
              labelClassName="!font-medium"
              uploaderClassName="!border-custom-black !text-custom-black"
              showAsterisk
            />
          </div>
        </form>

        <div className="mt-4 px-2">
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit(onFormSubmit)}
          >
            {mode === "edit" ? "Update Project" : "Save Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
