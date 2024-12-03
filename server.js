const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dataRoutes = require("./routes/dataRoutes");
const flightRoutes = require("./routes/flightRoutes");
const preferenceRoutes = require("./routes/preferenceRoutes");

const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/data", dataRoutes);
app.use("/flights", flightRoutes);
app.use("/api/preferences", preferenceRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
