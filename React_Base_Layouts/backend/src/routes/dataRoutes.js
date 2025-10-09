import express from "express";
import {
  createArticle,
  getAllArticles,
  updateArticle,
  deleteArticle,
  getArticleBySlug,
} from "../controllers/articleController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Middleware for validation
const validateArticle = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "Title and content are required" });
  next();
};

// Get all articles with optional pagination
// Frontend can send: /articles?page=1&limit=10
router.get("/", getAllArticles);

// Get single article by slug
router.get("/:slug", getArticleBySlug);

// Create new article (featured + multiple content media)
router.post(
  "/",
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "contentMedia", maxCount: 10 },
  ]),
  validateArticle,
  createArticle
);

// Update article
router.put(
  "/:id",
  upload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "contentMedia", maxCount: 10 },
  ]),
  validateArticle,
  updateArticle
);

// Delete article
router.delete("/:id", deleteArticle);

export default router;
