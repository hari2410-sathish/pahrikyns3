// src/pages/Courses/index.js

export async function loadAllLessons(category, tool) {
  const ctx = import.meta.glob('./**/lesson*.jsx');

  const getLessonNumber = (path) => {
    const match = path.match(/lesson(\d+)\.jsx$/);
    return match ? Number(match[1]) : 9999;
  };

  const lessons = [];

  for (const fullPath in ctx) {
    if (
      fullPath.includes(`/${category}/`) &&
      fullPath.includes(`/${tool}/`)
    ) {
      const mod = await ctx[fullPath]();
      const Component = mod.default;
      const meta = mod.meta || {};

      const num = getLessonNumber(fullPath);

      lessons.push({
        num,
        name: `lesson${num}`,
        Component,
        meta: {
          title: meta.title || `Lesson ${num}`,
          description: meta.description || "",
          difficulty: meta.difficulty || ["Beginner", "Intermediate", "Advanced"][num % 3],
          duration: meta.duration || `${10 + num} min`,
          tags: meta.tags || [],
          updated: meta.updated || "",
          thumbnail: meta.thumbnail || null,
        },
      });
    }
  }

  lessons.sort((a, b) => a.num - b.num);

  return lessons;
}
