import mongoose from "mongoose";
import slugify from "slugify";

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
  },
  { _id: false }
);

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true },
    category: { type: String, trim: true },
    section: { type: String, trim: true },
    featuredImage: { type: String, default: "" },
    contentMedia: [mediaSchema],
    published: { type: Boolean, default: true },
    author: { type: String, trim: true },
  },
  { timestamps: true }
);

articleSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
