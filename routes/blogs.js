const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const blogs = await prisma.blogs.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await prisma.blogs.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, content, author, comments } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newBlog = await prisma.blogs.create({
      data: {
        title,
        content,
        author,
        comments: comments || null, // optional
      },
    });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error.message);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// ✅ PUT /api/blogs/:id → update blog
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, comments } = req.body;

    const updatedBlog = await prisma.blogs.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
        author,
        comments,
      },
    });

    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// ✅ DELETE /api/blogs/:id → delete blog
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.blogs.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error.message);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;
