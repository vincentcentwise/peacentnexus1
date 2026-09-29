import express from "express";

const router = express.Router();


// GET /api/health
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Peacent Nexus API is running"
  });
});


export default router;