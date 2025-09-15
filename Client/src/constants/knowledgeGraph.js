export const frontendGraph = {
  HTML: [],
  CSS: ["HTML"],
  JavaScript: ["HTML", "CSS"],
  React: ["JavaScript"],
};

export const backendGraph = {
  "Intro to Servers": [],
  "Node.js": ["Intro to Servers"],
  "Express.js": ["Node.js"],
  Databases: [],
  Authentication: ["Express.js", "Databases"],
};
