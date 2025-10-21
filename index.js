const express = require("express");
const cors = require("cors");
const universityRoutes = require("./routes/university");
const blogRoute = require("./routes/blogs");
const readAloudRoutes = require("./routes/readaloud");
const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173","http://localhost:3000","https://test2uni.com","https://test2uniadmin.vercel.app"],

  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use("/api/readaloud", readAloudRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/blogs", blogRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
