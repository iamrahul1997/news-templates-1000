import Article from "../models/Article.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import slugify from "slugify";

// Upload single file (featuredImage)
async function uploadSingleFile(file) {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "articles/featured",
      resource_type: "auto",
    });
    fs.unlinkSync(file.path);
    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    try {
      fs.unlinkSync(file.path);
    } catch {}
    return null;
  }
}

// Upload multiple files (contentMedia)
async function uploadMultipleFiles(files) {
  const uploaded = [];
  for (const file of files) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "articles/content",
        resource_type: "auto",
      });
      uploaded.push({
        url: result.secure_url,
        type: file.mimetype.startsWith("video") ? "video" : "image",
      });
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    } finally {
      try {
        fs.unlinkSync(file.path);
      } catch {}
    }
  }
  return uploaded;
}

//GET ALL ARTICLES WITH PAGINATION
export async function getAllArticles(req, res) {
  try {
    const page = parseInt(req.query.page) || 1; // default page 1
    const limit = parseInt(req.query.limit) || 10; // default 10 items per page
    const skip = (page - 1) * limit;

    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments();

    res.status(200).json({
      message: "Articles fetched successfully",
      articles,
      page,
      totalPages: Math.ceil(total / limit),
      totalArticles: total,
    });
  } catch (error) {
    console.error("Error in getAllArticles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// GET BY SLUG
export async function getArticleBySlug(req, res) {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug });
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.status(200).json({ message: "Article fetched successfully", article });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ------------------- CREATE ARTICLE -------------------
export async function createArticle(req, res) {
  try {
    const { title, content, excerpt, category, section, author } = req.body;

    if (!title || !content)
      return res
        .status(400)
        .json({ message: "Title and content are required" });

    const slug = slugify(title, { lower: true, strict: true });
    const existing = await Article.findOne({ slug });
    if (existing)
      return res
        .status(400)
        .json({ message: "Article with this title already exists" });

    let featuredImage = "";
    let contentMedia = [];

    if (req.files?.featuredImage?.[0]) {
      featuredImage = await uploadSingleFile(req.files.featuredImage[0]);
    }

    if (req.files?.contentMedia?.length) {
      contentMedia = await uploadMultipleFiles(req.files.contentMedia);
    }

    const newArticle = new Article({
      title,
      slug,
      content,
      excerpt,
      category,
      section,
      featuredImage,
      contentMedia,
      author, // <-- author added
    });

    const savedArticle = await newArticle.save();
    res
      .status(201)
      .json({ message: "Article created successfully", article: savedArticle });
  } catch (error) {
    console.error("Error in createArticle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ------------------- UPDATE ARTICLE -------------------
export async function updateArticle(req, res) {
  try {
    const { id } = req.params;
    const { title, content, excerpt, category, section, author } = req.body;

    const article = await Article.findById(id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    if (title) {
      article.title = title;
      article.slug = slugify(title, { lower: true, strict: true });
    }
    if (content) article.content = content;
    if (excerpt) article.excerpt = excerpt;
    if (category) article.category = category;
    if (section) article.section = section;
    if (author) article.author = author; // <-- author updated

    if (req.files?.featuredImage?.[0]) {
      article.featuredImage = await uploadSingleFile(
        req.files.featuredImage[0]
      );
    }

    if (req.files?.contentMedia?.length) {
      const newMedia = await uploadMultipleFiles(req.files.contentMedia);
      article.contentMedia.push(...newMedia);
    }

    await article.save();
    res.status(200).json({ message: "Article updated successfully", article });
  } catch (error) {
    console.error("Error in updateArticle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// DELETE
export async function deleteArticle(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Article.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Article not found" });
    res
      .status(200)
      .json({ message: "Article deleted successfully", article: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
