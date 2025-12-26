import { allowedAttributes, allowedTags } from "@/constants";

export const truncateText = (text, maxLength = 32) => {
  if (!text) return "";
  return text.length > maxLength
    ? text.slice(0, maxLength).trim() + "..."
    : text;
};

// this function is designed to format the category text from
// the api format to the readable format.
// Example : if the category is stored as "critical-thinking",
// then the function will return "Critical Thinking"
export const getCategory = (category = "", splitter = "-") => {
  return category
    .split(splitter)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getBadgeColorClasses = (badge) => {
  switch (badge.toLowerCase()) {
    case "gold":
      return "bg-[#D4AF37] text-gray-900";
    case "silver":
      return "bg-gray-300 text-gray-800";
    case "bronze":
      return "bg-amber-500 text-white";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getInitials = (firstName = "", lastName = "") => {
  if (!firstName || !lastName) return "";
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  return firstInitial + lastInitial;
};

export const capitalizeFirstChar = (word = "") => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export function normalizeString(str) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

export const replaceNullWithPlaceholder = (value, replaceBy) => {
  if (value === null || value === undefined || value === "") {
    return replaceBy ?? "N/A";
  }
  return value;
};

export function sanitizeHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  function sanitizeNode(node) {
    // Remove unwanted tags
    if (node.nodeType === 1) {
      // ELEMENT_NODE
      if (!allowedTags.includes(node.tagName.toLowerCase())) {
        node.remove();
        return;
      }

      // Remove unwanted attributes
      Array.from(node.attributes).forEach((attr) => {
        const allowed = allowedAttributes[node.tagName.toLowerCase()] || [];
        if (!allowed.includes(attr.name)) {
          node.removeAttribute(attr.name);
        }

        // Remove javascript: links
        if (attr.name === "href" && attr.value.startsWith("javascript:")) {
          node.removeAttribute(attr.name);
        }
      });
    }

    // Recursively sanitize children
    node.childNodes.forEach((child) => sanitizeNode(child));
  }

  doc.body.childNodes.forEach((child) => sanitizeNode(child));

  return doc.body.innerHTML;
}
