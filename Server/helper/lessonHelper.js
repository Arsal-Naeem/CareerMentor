export const generateLessonProgress = (userId, moduleId, lessons, totalLessonXP, unlockCount = 3) => {
  const xpPerLesson = totalLessonXP / lessons.length;

  return lessons.map((lesson, index) => ({
    userId,
    moduleId,
    lessonId: lesson.id,
    status: "not_started",
    xpEarned: xpPerLesson,
    locked: index >= unlockCount, // first `unlockCount` lessons unlocked
  }));
};
