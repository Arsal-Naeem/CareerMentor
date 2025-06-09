import { useNavigate, useParams } from "react-router-dom";
import BlogImage from "@/assets/images/blog.png";
import MainLayout from "@/layouts/MainLayout";
import { blogData } from "@/constants";
import { useScreenSize } from "@/hooks/useScreenSize";

export const BlogDetail = () => {
  //   const { id } = useParams();
  const navigate = useNavigate();
  const recommendedBlogs = blogData
    .slice(0, 4)
    .map(({ span, ...rest }) => rest);

  const handleNavigate = (postId) => {
    navigate(`/blogs/${postId}`);
  };

  return (
    <MainLayout>
      <div className="w-full px-4 sm:px-8 md:px-10 py-10 flex flex-col h-full gap-3 lg:gap-7">
        {/* Blog Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <img
              src={BlogImage}
              alt="blog"
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
          <div
            className="lg:col-span-1 rounded-xl p-5 lg:p-10 flex flex-col justify-center gap-2 lg:gap-6"
            style={{
              background:
                "linear-gradient(107deg, rgba(243, 179, 78, 0.20) 0%, rgba(255, 210, 114, 0.20) 50%, rgba(89, 164, 192, 0.20) 100%)",
            }}
          >
            <span className="text-sm md:text-base text-black bg-white rounded-full w-fit px-4 py-1 font-medium">
              Back-end Development
            </span>
            <h1 className="text-2xl md:text-4xl font-semibold">
              What is Backend Development? A Beginner’s Guide
            </h1>
            <p className="text-sm md:text-base text-black font-medium">
              By Author Name
            </p>
          </div>
        </div>

        {/* Blog Content */}

        <div className="pt-4">
          <hr className="border-t-2 border-gray-200" />
        </div>

        {/* Recommended Blogs Section */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl md:text-4xl font-semibold">
            Recommended articles
          </h2>
          <div className="flex flex-col md:flex-row md:items-center md:overflow-x-scroll gap-3">
            {recommendedBlogs.map((post) => (
              <div
                key={post.id}
                onClick={() => handleNavigate(post.id)}
                className="relative cursor-pointer rounded-2xl w-full md:w-[300px] h-[250px] md:h-[300px] overflow-hidden"
                style={{
                  backgroundImage: `url(${post.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  flex: "0 0 auto",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
                <div className="absolute bottom-0 p-4 pb-6 text-white w-full">
                  <span className="text-[10px] md:text-xs bg-white text-black px-2 py-0.5 rounded-full font-medium inline-block mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xs md:text-sm font-semibold leading-snug max-w-xs">
                    {post.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
