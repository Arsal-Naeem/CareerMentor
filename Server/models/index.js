import Blogs from "./blogModel.js";
import Tag from "./tagModel.js";
import User from "./userModel.js";

// 🔁 Define relationships here

// User → Blog (One-to-Many)
User.hasMany(Blogs, { foreignKey: "userId", as: "blogs" });
Blogs.belongsTo(User, { foreignKey: "userId", as: "authorInfo" });

// Blog ↔ Tag (Many-to-Many)
Blogs.belongsToMany(Tag, {
  through: "BlogTags",
  foreignKey: "blogId",
  otherKey: "tagId",
});
Tag.belongsToMany(Blogs, {
  through: "BlogTags",
  foreignKey: "tagId",
  otherKey: "blogId",
});

export { Blogs, Tag, User };
