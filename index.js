
const express = require("express");
const universityRoutes = require("./routes/universityRoutes");

const app = express();
app.use(express.json());


app.use("/api/universities", universityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
