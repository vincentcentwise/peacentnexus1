import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: allowedOrigins
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Peacent Nexus API"
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/inquiries", contactRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

export default app;