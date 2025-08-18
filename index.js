import express from "express";
import universityRoutes from "./routes/universityRoutes.js";

const app = express();
app.use(express.json());


app.use("/api/universities", universityRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
