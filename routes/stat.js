
// stats.ts

const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalQuestions = await prisma.readAloudQuestion.count();
    res.json({ totalQuestionspte: totalQuestions });
  } catch (error) {
    console.error("Error fetching total questions:", error);
    res.status(500).json({ error: "Server error" });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports= router;
