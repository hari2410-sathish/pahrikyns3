/** ========================================================
 * TEMPLATE REGISTRY — PRO VERSION (v1)
 * Central source of truth for all resume templates
 * - Supports free / pro templates
 * - Supports thumbnails
 * - Supports lazy loading
 * - Scalable for future 10+ templates
 * ======================================================== */

import FreeTemplate from "./FreeTemplate";
import ProTemplate from "./ProTemplate";
import UltraTemplate from "./UltraTemplate";

export const TEMPLATE_REGISTRY = [
  {
    id: "free-01",
    name: "Free Template",
    component: FreeTemplate,
    type: "free",
    thumbnail: "/thumbnails/free-01.png",
  },
  {
    id: "pro-01",
    name: "Pro Template",
    component: ProTemplate,
    type: "pro",
    thumbnail: "/thumbnails/pro-01.png",
  },
  {
    id: "ultra-01",
    name: "Ultra Premium",
    component: UltraTemplate,
    type: "pro",
    thumbnail: "/thumbnails/ultra-01.png",
  },
];

/**
 * Helper to fetch template by ID
 */
export function getTemplateById(id) {
  return TEMPLATE_REGISTRY.find((t) => t.id === id) || null;
}

/**
 * Helper to fetch component only
 */
export function getTemplateComponent(id) {
  const t = getTemplateById(id);
  return t?.component || null;
}
