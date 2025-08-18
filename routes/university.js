// server/routes/universityRoutes.js
import express from "express";

const router = express.Router();

// Demo data (replace with DB later)
let sampleUniversities = [
  {
    id: 1,
    name: "Stanford University",
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


router.get("/", (req, res) => {
  res.json(sampleUniversities);
});


router.get("/:id", (req, res) => {
  const uni = sampleUniversities.find(
    (u) => u.id === parseInt(req.params.id)
  );
  if (!uni) return res.status(404).json({ message: "University not found" });
  res.json(uni);
});


router.post("/", (req, res) => {
  const newUniversity = { id: Date.now(), ...req.body };
  sampleUniversities.push(newUniversity);
  res.status(201).json(newUniversity);
});

router.put("/:id", (req, res) => {
  const index = sampleUniversities.findIndex(
    (u) => u.id === parseInt(req.params.id)
  );
  if (index === -1)
    return res.status(404).json({ message: "University not found" });

  sampleUniversities[index] = {
    ...sampleUniversities[index],
    ...req.body,
  };
  res.json(sampleUniversities[index]);
});


router.delete("/:id", (req, res) => {
  const index = sampleUniversities.findIndex(
    (u) => u.id === parseInt(req.params.id)
  );
  if (index === -1)
    return res.status(404).json({ message: "University not found" });

  const deleted = sampleUniversities.splice(index, 1);
  res.json({ message: "University deleted", deleted });
});

export default router;
