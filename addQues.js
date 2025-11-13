const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Adds multiple questions to the readAloudQuestion table
 * @param questionsArray Array of Question objects
 */
const addQuestions = async (questionsArray) => {
  try {
    if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
      throw new Error("Invalid questions array");
    }

    const result = await prisma.readAloudQuestion.createMany({
      data: questionsArray,
      skipDuplicates: true, // avoidss duplicate inserts if unique constraints exist
    });

    console.log(`${result.count} questions added successfully.`);
    return result;
  } catch (error) {
    console.error("Error adding questions:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

// Example usage:
const questions = [
  {
    passage: "The earth revolves around the sun in an elliptical orbit, taking approximately 365 days to complete one revolution.",
    difficulty: "easy",
    category: "science",
  },
  {
    passage: "Globalization has led to the integration of economies and cultures, resulting in both opportunities and challenges for nations.",
    difficulty: "medium",
    category: "economics",
  },
  {
    passage: "Technological advancements continue to reshape the modern workplace, emphasizing automation, data analytics, and remote collaboration.",
    difficulty: "medium",
    category: "technology",
  },
  {
    passage: "Marine ecosystems are increasingly threatened by human activities such as overfishing, pollution, and climate change.",
    difficulty: "hard",
    category: "environment",
  },
];

(async () => {
  await addQuestions(questions);
})();
