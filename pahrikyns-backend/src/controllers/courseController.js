const prisma = require("../config/prismaClient");

exports.getCourseBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        // Search by title (case insensitive approximation or direct match)
        // Since title might be "AWS EC2" and slug "ec2", we might need a better match.
        // For now, let's assume the slug matches the title or we search contains.
        // Ideally, we'd add a slug field to the DB.
        // But working with existing constraints:

        // Try finding exact match first (case insensitive)
        const course = await prisma.course.findFirst({
            where: {
                title: {
                    equals: slug,
                    mode: "insensitive",
                },
                status: "Published",
            },
        });

        if (!course) {
            // Fallback: Try contains if exact failed (e.g. slug "ec2", title "Amazon EC2")
            const fuzzy = await prisma.course.findFirst({
                where: {
                    title: {
                        contains: slug,
                        mode: "insensitive"
                    },
                    status: "Published",
                }
            });

            if (fuzzy) return res.json(fuzzy);

            // ⚠️ LAZY SEEDING: If course not found, create it!
            // This ensures frontend tools (like 'git', 'docker') work immediately.
            const newCourse = await prisma.course.create({
                data: {
                    title: slug.charAt(0).toUpperCase() + slug.slice(1), // Capitalize
                    description: `Learn ${slug} from scratch`,
                    category: "General",
                    level: "Beginner", // ✅ Default to Free
                    status: "Published",
                    price: 0
                }
            });

            console.log(`✅ Auto-created course: ${slug}`);
            return res.json(newCourse);
        }

        res.json(course);
    } catch (err) {
        console.error("getCourseBySlug error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
