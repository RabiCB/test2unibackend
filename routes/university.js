const express = require("express");
const { prisma } = require("../lib/prima");
const router = express.Router();

const allowedSortFields = [
  "name",
  "ranking",
  "tuitionMin",
  "tuitionMax",
  "acceptanceRate",
  "studentCount",
  "applicationDeadline",
];

// GET all universities with pagination + sorting
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const sortField = allowedSortFields.includes(req.query.sortField)
      ? req.query.sortField
      : "name";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const [universities, total] = await Promise.all([
      prisma.universities.findMany({
        skip,
        take: limit,
        orderBy: {
          [sortField]: sortOrder,
        },
      }),
      prisma.universities.count(),
    ]);

    res.json({
      universities,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching universities:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/search", async (req, res) => {
  try {
    const { q } = req.query; 
    if (!q) {
      return res.status(400).json({ message: "Missing search query" });
    }

    const universities = await prisma.universities.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive", 
        },
      },
      orderBy: { name: "asc" },
      take: 20, 
    });

    res.json({ universities });
  } catch (error) {
    console.error("Error searching universities:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single university by slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const university = await prisma.universities.findUnique({
      where: { slug },
    });

    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    res.json({ university });
  } catch (error) {
    console.error("Error fetching university:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
