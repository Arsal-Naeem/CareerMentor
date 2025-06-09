import { useScreenSize } from "@/hooks/useScreenSize";
import { truncateText } from "@/utils/helpers/truncateText";
import React from "react";
import { useNavigate } from "react-router-dom";

export const BlogCard = ({ post }) => {
  const navigate = useNavigate();
  const { isSmallScreen } = useScreenSize();
  const handleNavigate = (postId) => {
    navigate(`/blogs/${postId}`);
  };
  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${post.span}`}
      style={{
        backgroundImage: `url(${post.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => handleNavigate(post.id)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
      <div className="absolute bottom-0 p-4 text-white">
        <span className="text-[8px] lg:text-xs bg-white text-black px-2 py-0.5 lg:py-1.5 rounded-full font-medium">
          {isSmallScreen ? truncateText(post.category, 10) : post.category}
        </span>
        <h3 className="text-[8px] sm:text-sm md:text-base font-semibold mt-1.5 lg:mt-3 leading-snug max-w-xs">
          {post.title}
        </h3>
      </div>
    </div>
  );
};
