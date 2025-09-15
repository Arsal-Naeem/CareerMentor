export function expandSkills(selectedSkills, graph) {
  const expanded = new Set();

  function addSkill(skill) {
    if (!graph[skill]) return;
    expanded.add(skill);
    graph[skill].forEach(addSkill);
  }

  selectedSkills.forEach(addSkill);
  return Array.from(expanded);
}

export function recommendNextModule(expandedSkills, moduleOrder) {
  for (const module of moduleOrder) {
    if (!expandedSkills.includes(module)) return module;
  }
  return null; // all modules known
}
