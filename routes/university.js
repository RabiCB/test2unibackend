
const express = require("express");
const router = express.Router();


let sampleUniversities = [
  {
    id: 1,
    name: "Stanford University",
    slug: "stanford-university",
    country: "United States",
    city: "Stanford, CA",
    ranking: 3,
    tuitionRange: [65000, 66000],
    acceptanceRate: 4.0,
    studentCount: 18446,
    establishedYear: 1885,
    description:
      "A leading research university known for its entrepreneurial character and excellence in engineering, business, and liberal arts.",
    programs: ["Computer Science", "Engineering", "Business", "Medicine"],
    applicationDeadline: "January 2, 2025",
    requirements: { gpa: 3.9, sat: [1440, 1570], toefl: 100, ielts: 7.0 },
    website: "https://www.stanford.edu",
    bookmarked: false,
    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Stanfordquad.jpg?width=1200",
    ],
  },
  {
    id: 2,
    name: "University of Oxford",
    slug: "university-of-oxford",
    country: "United Kingdom",
    city: "Oxford",
    ranking: 1,
    tuitionRange: [35000, 45000],
    acceptanceRate: 16.0,
    studentCount: 24000,
    establishedYear: 1096,
    description:
      "The oldest university in the English-speaking world, renowned for its academic excellence and historic traditions.",
    programs: ["Law", "Medicine", "Arts & Humanities", "Social Sciences"],
    applicationDeadline: "October 15, 2024",
    requirements: { gpa: 3.8, sat: [1400, 1500], toefl: 110, ielts: 7.5 },
    website: "https://www.ox.ac.uk",
    bookmarked: true,
    images: [
      "https://commons.wikimedia.org/wiki/Special:FilePath/Radcliffe%20Camera.jpg?width=1200",
    ],
  },
];


function generateSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}


router.get("/", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedUniversities = sampleUniversities.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sampleUniversities.length / limit);

    res.json({
      page,
      totalPages,
      totalUniversities: sampleUniversities.length,
      universities: paginatedUniversities,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const university = sampleUniversities.find(
      (u) => u.id === parseInt(req.params.id)
    );
    if (!university) return res.status(404).json({ message: "University not found" });
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/slug/:slug", (req, res) => {
  try {
    const university = sampleUniversities.find((u) => u.slug === req.params.slug);
    if (!university) return res.status(404).json({ message: "University not found" });
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.post("/", (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const newUniversity = {
      id: Date.now(),
      ...req.body,
      slug: generateSlug(name),
    };

    sampleUniversities.push(newUniversity);
    res.status(201).json(newUniversity);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.put("/:id", (req, res) => {
  try {
    const universityIndex = sampleUniversities.findIndex(
      (u) => u.id === parseInt(req.params.id)
    );
    if (universityIndex === -1) return res.status(404).json({ message: "University not found" });

    const updatedUniversity = {
      ...sampleUniversities[universityIndex],
      ...req.body,
    };

    if (req.body.name) updatedUniversity.slug = generateSlug(req.body.name);

    sampleUniversities[universityIndex] = updatedUniversity;
    res.json(updatedUniversity);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.delete("/:id", (req, res) => {
  try {
    const universityIndex = sampleUniversities.findIndex(
      (u) => u.id === parseInt(req.params.id)
    );
    if (universityIndex === -1) return res.status(404).json({ message: "University not found" });

    const deletedUniversity = sampleUniversities.splice(universityIndex, 1);
    res.json({ message: "University deleted", university: deletedUniversity[0] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
