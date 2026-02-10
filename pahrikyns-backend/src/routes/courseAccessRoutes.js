const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  checkCourseAccess,
} = require("../controllers/courseAccessController");

router.get("/:courseId/access", auth, checkCourseAccess);

module.exports = router;
