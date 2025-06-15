import { Edit, Trash2, Calendar, Tag, Eye } from "lucide-react";
import { Badge } from "../ui/badge";

const UserBlogCard = ({ post, onEdit, onDelete, onView }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300 hover:-translate-y-1">
      {/* Cover Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action Buttons - Updated with design system colors */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onView(post)}
            className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-105"
            style={{ color: "#7F8C8D" }}
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(post)}
            className="p-2 rounded-full shadow-md transition-all duration-200 hover:scale-105 text-white"
            style={{ backgroundColor: "#5BA7C7" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#4A96B6")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#5BA7C7")}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="p-2 rounded-full shadow-md transition-all duration-200 hover:scale-105 text-white"
            style={{ backgroundColor: "#E74C3C" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#D73527")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#E74C3C")}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags - Updated with design system colors */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag, index) => {
            // Alternate between different tag styles using design system colors
            const tagStyles = [
              { border: "1px solid" },
              { border: "1px solid" },
              { border: "1px solid" },
            ];
            const style = tagStyles[index % tagStyles.length];

            return (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all duration-200 hover:scale-105"
                style={style}
              >
                <Tag size={10} />
                {tag}
              </span>
            );
          })}
          {post.tags.length > 3 && (
            <Badge
              className="rounded-full text-xs font-medium flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: "#E9ECEF",
                color: "#7F8C8D",
              }}
            >
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Title - Using Heading 3 from typography system - Updated to change color on card hover */}
        <h3
          className=" mb-2 line-clamp-2 transition-colors duration-200 group-hover:text-blue-500 font-bold anonymous-font md:text-2xl text-xl"
          style={{ color: "#2C3E50" }}
        >
          {post.title}
        </h3>

        {/* Excerpt - Using Body Base from typography system */}
        <p
          className="text-sm mb-4 line-clamp-3 leading-relaxed font-light md:text-base"
          style={{ color: "#7F8C8D" }}
        >
          {post.excerpt}
        </p>

        {/* Meta Info - Using Body Small from typography system */}
        <div
          className="flex items-center justify-between text-xs pt-3 border-t"
          style={{
            color: "#7F8C8D",
            borderColor: "#E9ECEF",
          }}
        >
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBlogCard;
