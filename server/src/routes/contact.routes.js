import express from "express";
import {
  createInquiry,
  getInquiries
} from "../controllers/contact.controller.js";

const router = express.Router();


// POST /api/inquiries
router.post("/", createInquiry);


// GET /api/inquiries
router.get("/", getInquiries);


export default router;