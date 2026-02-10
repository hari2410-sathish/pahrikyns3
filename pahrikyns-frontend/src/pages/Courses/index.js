// src/pages/Courses/index.js

import React from "react"; // Required for strict JS files using React
import GenericLesson from "../../components/Course/GenericLesson";
import { awsData } from "../../data/courseData/awsData";
import { devopsData } from "../../data/courseData/devopsData";
import { osData } from "../../data/courseData/osData";

// Data Source Map
const DATA_SOURCES = {
  aws: awsData,
  devops: devopsData,
  os: osData,
  // mapping 'cloud' to aws if needed, or other aliases
};

export async function loadAllLessons(category, tool) {
  // 1. Try to get data from new Data Files
  // We assume 'tool' might match the key, OR 'category' matches.
  // For now, if category is 'aws', 'devops', 'os', we use that full list.

  let sourceData = DATA_SOURCES[category?.toLowerCase()] || DATA_SOURCES[tool?.toLowerCase()];

  // Specific fallback: if tool is 'linux', map to 'os'? 
  // For this tasks requirement (20 lessons per category), we'll trust the category map.

  if (sourceData) {
    // Transform Data Object into Lessons Array
    const lessons = Object.entries(sourceData).map(([key, item], index) => {
      const num = index + 1;
      return {
        num,
        name: `lesson${num}`, // Maps URL /lesson1 to this item
        // We create a wrapper component that renders GenericLesson with our item
        Component: () => React.createElement(GenericLesson, { data: item }),
        meta: {
          title: item.title,
          description: item.description,
          difficulty: "Intermediate", // Default
          duration: "20 min",
          tags: [category, tool],
        }
      };
    });
    return lessons;
  }

  // 2. FALLBACK: Old File-System Globbing (for existing lessons not in data)
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
