const prisma = require("../config/prismaClient");

/* ===============================
   GET COURSES (PAGINATION + FILTER)
================================ */
exports.getCourses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      status,
      level,
      sort = "students_desc",
    } = req.query;

    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    const where = {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
                { level: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        category ? { category } : {},
        status ? { status } : {},
        level ? { level } : {},
      ],
    };

    let orderBy = {};
    if (sort === "students_desc") orderBy = { students: "desc" };
    if (sort === "students_asc") orderBy = { students: "asc" };
    if (sort === "lessons_desc") orderBy = { lessons: "desc" };
    if (sort === "lessons_asc") orderBy = { lessons: "asc" };
    if (sort === "created_desc") orderBy = { createdAt: "desc" };
    if (sort === "created_asc") orderBy = { createdAt: "asc" };

    const [items, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      prisma.course.count({ where }),
    ]);

    res.json({ items, total });
  } catch (err) {
    console.error("getCourses error:", err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

/* ===============================
   CREATE COURSE (LEVEL + PRICE SAFE)
================================ */
exports.createCourse = async (req, res) => {
  try {
    let {
      title,
      description,
      category,
      level,
      lessons,
      students,
      price,
      status,
    } = req.body;

    if (!title || !category || !level) {
      return res
        .status(400)
        .json({ message: "title, category and level are required" });
    }

    // 🔐 RULE 1: Beginner is always FREE
    if (level === "Beginner") {
      price = 0;
    }

    // 🔐 RULE 2: Paid courses must have valid price
    if (level !== "Beginner" && Number(price) < 0) {
      return res
        .status(400)
        .json({ message: "Paid course must have valid price" });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description: description || null,
        category,
        level,
        lessons: Number(lessons) || 0,
        students: Number(students) || 0,
        price: Number(price) || 0,
        status: status || "Draft",
        lastUpdatedBy: req.user?.id || "admin",
      },
    });

    res.json(course);
  } catch (err) {
    console.error("createCourse error:", err);
    res.status(500).json({ message: "Failed to create course" });
  }
};

/* ===============================
   UPDATE COURSE (LEVEL + PRICE SAFE)
================================ */
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    let { level, price } = req.body;

    // 🔐 RULE 1: Beginner → force FREE
    if (level === "Beginner") {
      price = 0;
    }

    // 🔐 RULE 2: Paid courses must have price
    if (level && level !== "Beginner" && price !== undefined && Number(price) < 0) {
      return res
        .status(400)
        .json({ message: "Paid course must have valid price" });
    }

    const updated = await prisma.course.update({
      where: { id },
      data: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        level,
        lessons:
          req.body.lessons !== undefined
            ? Number(req.body.lessons)
            : undefined,
        students:
          req.body.students !== undefined
            ? Number(req.body.students)
            : undefined,
        price:
          price !== undefined
            ? Number(price)
            : undefined,
        status: req.body.status,
        lastUpdatedBy: req.user?.id || "admin",
      },
    });

    res.json(updated);
  } catch (err) {
    console.error("updateCourse error:", err);
    res.status(500).json({ message: "Failed to update course" });
  }
};

/* ===============================
   DELETE COURSE
================================ */
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    console.error("deleteCourse error:", err);
    res.status(500).json({ message: "Failed to delete course" });
  }
};

/* ===============================
   BULK DELETE
================================ */
exports.bulkDeleteCourses = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "ids array required" });
    }

    await prisma.course.deleteMany({
      where: { id: { in: ids } },
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("bulkDeleteCourses error:", err);
    res.status(500).json({ message: "Bulk delete failed" });
  }
};

/* ===============================
   TOGGLE STATUS
================================ */
exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const course = await prisma.course.update({
      where: { id },
      data: { status },
    });

    res.json(course);
  } catch (err) {
    console.error("toggleStatus error:", err);
    res.status(500).json({ message: "Status update failed" });
  }
};
