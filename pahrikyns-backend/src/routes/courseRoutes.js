const express = require("express");
const router = express.Router();
const { getCourseBySlug } = require("../controllers/courseController");
const { checkCourseAccess } = require("../controllers/courseAccessController");
const auth = require("../middlewares/authMiddleware");

// Public route to fetch course details by slug/title
router.get("/:slug", getCourseBySlug);

// Access Check Route (Protected)
router.get("/:courseId/access", auth, checkCourseAccess);

module.exports = router;
