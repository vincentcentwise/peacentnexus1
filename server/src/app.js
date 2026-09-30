import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import healthRoutes from "./routes/health.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// --- API ROUTES ---
app.use("/api/health", healthRoutes);
app.use("/api/inquiries", contactRoutes);

// Keep this for testing API directly
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Peacent Nexus API"
  });
});

// --- FRONTEND ---
// dist is at ../../dist from server/src/app.js
const distPath = path.join(__dirname, "../../dist");
app.use(express.static(distPath));

// --- FALLBACK ---
// If it's /api/* and not found, return JSON 404
// If it's frontend route, return index.html
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Final catch-all for unknown API routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

export default app;