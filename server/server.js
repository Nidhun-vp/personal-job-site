require("dotenv").config(); 
const express   = require("express");
const mongoose  = require("mongoose");
const cors      = require("cors");
const jobRoutes = require("./Routes/jobs");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);

const PORT       = process.env.PORT || 5000;
const MONGO_URL  = process.env.MONGO_URI;
// change these url
app.use(cors({
  origin: "https://your-frontend.vercel.app", // change this
  methods: ["GET", "POST"],
}));

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error(" MongoDB connection failed:", error.message);
  });
