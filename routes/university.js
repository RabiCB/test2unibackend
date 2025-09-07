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

// POST create a new university
router.post("/", async (req, res) => {
  try {
    const {
      name,
      slug,
      country,
      city,
      ranking,
      tuitionMin,
      tuitionMax,
      acceptanceRate,
      studentCount,
      description,
      programs,
      image,
      applicationDeadline,
    } = req.body;

    // Basic validation
    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" });
    }

    const newUniversity = await prisma.universities.create({
      data: {
        name,
        slug,
        country,
        city,
        ranking: ranking || null,
        tuitionMin: tuitionMin || null,
        tuitionMax: tuitionMax || null,
        acceptanceRate: acceptanceRate || null,
        studentCount: studentCount || null,
        description: description || null,
        programs: programs || null, // JSON field
        image: image || null, // string or array stored as JSON/string
        applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
      },
    });

    res.status(201).json({ university: newUniversity });
  } catch (error) {
    console.error("Error creating university:", error.message);
    if (error.code === "P2002") {
      // Prisma unique constraint failed
      return res.status(400).json({ message: "Slug must be unique" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a university by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the university exists
    const university = await prisma.universities.findUnique({
      where: { id: Number(id) },
    });

    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }

    // Delete the university
    await prisma.universities.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "University deleted successfully" });
  } catch (error) {
    console.error("Error deleting university:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
