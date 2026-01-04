import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../editor/examples/full/editor";
import { InputField } from "../InputField/InputField";
import { TagInput } from "../inputs/TagsInput";
import { UploadImage } from "../inputs/UploadImage";
import { Button } from "../ui/button";
import { BlogFormSchema } from "@/validations";

export const AddEditBlogForm = ({
  initialData,
  onSubmit,
  isLoading,
  loadingText = "Adding...",
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      shortDesc: "",
      coverImage: null,
      coverImagePreview: null,
      description: null,
      tags: [],
      timeToRead: "",
    },
    mode: "all",
    resolver: yupResolver(BlogFormSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title ?? "",
        shortDesc: initialData.shortDesc ?? "",
        coverImage: null,
        coverImagePreview: initialData.coverImage ?? null, // URL
        description: initialData.description ?? null,
        tags: initialData.tags ?? [],
        timeToRead: initialData.timeToRead ?? "",
      });
    }
  }, [initialData, reset]);

  const onFormSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("shortDesc", data.shortDesc || "");
    formData.append("longDesc", JSON.stringify(data.description));
    formData.append("timeToRead", data.timeToRead || "");
    formData.append("tags", JSON.stringify(data.tags));

    if (data.coverImage instanceof File) {
      formData.append("coverImage", data.coverImage);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <InputField
        name="coverImage"
        label="Cover Image"
        component={UploadImage}
        control={control}
        preview={watch("coverImagePreview")}
        setValue={setValue}
        labelClassName="!font-medium"
        showAsterisk
      />

      <InputField
        name="title"
        label="Blog Title"
        control={control}
        placeholder="Enter Blog Title"
        labelClassName="!font-medium"
        showAsterisk
      />

      <InputField
        name="shortDesc"
        label="Short Description"
        control={control}
        labelClassName="!font-medium"
        placeholder="Enter Short Description"
        rows={3}
        isTextArea
        showAsterisk
      />

      <InputField
        name="description"
        label="Blog Description"
        control={control}
        component={Editor}
        placeholder="Enter Blog Description"
        labelClassName="!font-medium"
        showAsterisk
      />

      <InputField
        name="tags"
        label="Tags"
        control={control}
        component={TagInput}
        placeholder="Enter tags for blog"
        labelClassName="!font-medium"
        showAsterisk
      />

      <InputField
        name="timeToRead"
        label="Time to Read (minutes)"
        control={control}
        placeholder="e.g., 5"
        labelClassName="!font-medium"
        type="number"
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/dashboard/blogs")}
          disabled={isLoading}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-custom-light-blue hover:bg-custom-light-blue"
          disabled={isLoading}
        >
          {isLoading
            ? loadingText
            : isEditMode
            ? "Update Blog"
            : "Publish Blog"}
        </Button>
      </div>
    </form>
  );
};
