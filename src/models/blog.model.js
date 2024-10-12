import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    metaKeywords: [String],
    metaRobots: [String],
    metaTitle: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    anchorTexting: {
      type: String,
      required: true,
    },
    internalLinking: {
      type: String,
      required: true,
    },
    urlEditing: {
      type: String,
      required: true,
    },
    xmlSiteMap: {
      type: String,
      required: true,
    },
    schemaMetaData: {
      type: String,
      required: true,
    },
    openGraph: {
      type: String,
      required: true,
    },
    canonicalUrl: {
      type: String,
      required: true,
    },
    altImageAttributes: {
      type: String,
      required: true,
    },
    favicon: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export const Blog = mongoose.model("Blog", blogSchema);
