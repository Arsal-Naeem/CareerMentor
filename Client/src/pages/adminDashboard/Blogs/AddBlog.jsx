import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import usePageTitle from "@/hooks/usePageTitle";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  usePageTitle("Add Blog");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate with blog creation API
    navigate('/admin/dashboard/blogs');
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-semibold mb-4">Add Blog</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Title"
              className="w-full p-2 border rounded"
            />

            <textarea
              name="content"
              placeholder="Content"
              className="w-full p-2 border rounded h-48"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-custom-light-blue text-white rounded"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AddBlog;
import { EventsHeader } from "@/components/admin/events/EventsComponents";
import { AddEditBlogForm } from "@/components/blogs/BlogForm";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { Book } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddBlog as AddBlogMutation } from "@/apiService/BlogsTracking";

const AddBlog = () => {
  usePageTitle("Add New Blog");

  const navigate = useNavigate();

  const { mutate: addBlog, isPending } = AddBlogMutation();

  const handleSubmit = (formData) => {
    addBlog(formData, {
      onSuccess: () => {
        navigate("/admin/dashboard/blogs");
      },
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
          <EventsHeader
            icon={<Book className="h-7 w-7 text-white" />}
            iconContainerClassName="!bg-custom-light-blue"
            buttonClassName="bg-custom-light-blue"
            title={"Add New Blog"}
            buttonTitle="Back to Blogs"
            onAddButtonClick={() => navigate("/admin/dashboard/blogs")}
            subtitle=""
            showIconOnButton={false}
          />

          <AddEditBlogForm onSubmit={handleSubmit} isLoading={isPending} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AddBlog;
