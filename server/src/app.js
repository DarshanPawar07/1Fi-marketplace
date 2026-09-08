import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://1-fi-marketplace-gamma.vercel.app/",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "1Fi Marketplace API is running",
  });
});

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("API Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;