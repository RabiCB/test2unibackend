const express = require("express");
const { prisma } = require("../lib/prima");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { passage, difficulty, category } = req.body;
    if (!passage || !difficulty) {
      return res.status(400).json({ error: "Passage and difficulty are required" });
    }

    const question = await prisma.readAloudQuestion.create({
      data: { passage,  difficulty, category },
    });
    


    res.status(201).json(question);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const [questions, total] = await Promise.all([
      prisma.readAloudQuestion.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.readAloudQuestion.count(),
    ]);

    res.json({
      questions,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const question = await prisma.readAloudQuestion.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!question) return res.status(404).json({ error: "Not found" });

    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { passage, audioUrl, difficulty, category } = req.body;
    const question = await prisma.readAloudQuestion.update({
      where: { id: parseInt(req.params.id) },
      data: { passage, audioUrl, difficulty, category },
    });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await prisma.readAloudQuestion.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
