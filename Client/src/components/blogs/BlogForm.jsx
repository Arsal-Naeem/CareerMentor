import React, { useState } from "react";
import { Input } from "../ui/input";
import Editor from "../editor/examples/full/editor";
import { TagInput } from "../inputs/TagsInput";
import { useParams } from "react-router-dom";
import { Upload, X } from "lucide-react";
import { Button } from "../ui/button";

export const AddEditBlogForm = ({ initialData, onSubmit }) => {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(
    initialData
      ? initialData
      : {
          title: "",
          description: null,
          coverImage: null,
        }
  );
  const [tags, setTags] = useState(initialData?.tags ?? []);
  const [descriptionContent, setDescriptionContent] = useState(
    initialData?.description ? initialData.description : null
  );

  const [preview, setPreview] = useState(
    initialData?.coverImage ? URL.createObjectURL(initialData.coverImage) : null
  );

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((p) => ({ ...p, coverImage: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleImageDelete = () => {
    setFormData((p) => ({ ...p, coverImage: null }));
    setPreview(null);
  };

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cover Image */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-custom-black-dark">
          Cover Image <span className="text-red-500">*</span>
        </label>

        {!preview && !formData.coverImage && (
          <div className="flex items-center gap-6">
            <label
              htmlFor="coverImage"
              className="
                    flex items-center justify-center gap-2
                    px-4 py-2
                    rounded-lg
                    border border-dashed border-[#59A4C0]/40
                    text-[#59A4C0]
                    cursor-pointer
                    hover:bg-[#59A4C0]/5
                    transition w-full h-52
                  "
            >
              <Upload size={16} />
              Upload Image
            </label>

            <input
              id="coverImage"
              type="file"
              accept="image/*"
              className="hidden"
              required={!isEditMode}
              onChange={handleImageChange}
            />
          </div>
        )}

        {preview && (
          <div className="relative w-fit">
            <img
              src={preview}
              alt="Preview"
              className="h-52 rounded-lg w-full object-cover"
            />
            <div
              onClick={handleImageDelete}
              className="bg-gray-200 rounded-full p-1.5 absolute top-2 right-2 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-custom-black-dark">
          Blog Title <span className="text-red-500">*</span>
        </label>
        <Input
          label="Blog Title"
          placeholder="Enter blog title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-custom-black-dark">
          Description <span className="text-red-500">*</span>
        </label>

        <Editor
          initialContent={descriptionContent}
          onChange={(content) => setDescriptionContent(content)}
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-custom-black-dark">
          Tags
        </label>
        <TagInput
          label=""
          name="tags"
          placeholder="Press enter to add a tag"
          value={tags}
          onChange={setTags}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/dashboard/blogs")}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-custom-light-blue hover:bg-[#4A94AF]"
        >
          {isEditMode ? "Update Blog" : "Publish Blog"}
        </Button>
      </div>
    </form>
  );
};
