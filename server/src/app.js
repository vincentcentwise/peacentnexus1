import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import healthRoutes from "./routes/health.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// API routes
app.use("/api/health", healthRoutes);
app.use("/api/inquiries", contactRoutes);

app.get("/api", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to Peacent Nexus API" });
});

// --- FIND DIST FOLDER AUTOMATICALLY ---
const possibleDistPaths = [
  path.join(__dirname, "../../dist"),        // /dist
  path.join(__dirname, "../dist"),           // server/dist
  path.join(__dirname, "../../client/dist"),// client/dist
  path.join(__dirname, "../../../dist")
];

let distPath = null;
for (const p of possibleDistPaths) {
  if (fs.existsSync(p)) {
    distPath = p;
    console.log(`Found frontend dist at: ${distPath}`);
    break;
  }
}

if (distPath) {
  app.use(express.static(distPath));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  console.error("WARNING: Could not find dist folder! Checked:", possibleDistPaths);
}

export default app;