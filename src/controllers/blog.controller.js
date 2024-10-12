import { Blog } from "../models/blog.model.js";

// Create a new Blog
const createBlog = async (req, res) => {
  const {
    title,
    content,
    metaKeywords,
    metaRobots,
    metaTitle,
    metaDescription,
    anchorTexting,
    internalLinking,
    urlEditing,
    xmlSiteMap,
    schemaMetaData,
    altImageAttributes,
    favicon,
    canonicalUrl,
    openGraph,
  } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  // Create a new blog instance
  const blog = new Blog({
    title,
    content,
    metaKeywords,
    metaRobots,
    metaTitle,
    metaDescription,
    anchorTexting,
    internalLinking,
    urlEditing,
    xmlSiteMap,
    schemaMetaData,
    altImageAttributes,
    favicon: req.files.favicon[0].filename,
    canonicalUrl,
    openGraph,
    image: req.files.image[0].filename,
  });

  try {
    // Save the blog to the database
    const newBlog = await blog.save();

    // Respond with a success message and the new blog data
    res.status(201).json({
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (err) {
    // Handle any errors that occur during the save operation
    res
      .status(500)
      .json({ message: "Error creating blog", error: err.message });
  }
};

// Get all Blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Blog by ID
const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a Blog by ID
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (req.files.image) {
    updates.image = req.files.image.filename;
  }

  if (req.files.favicon) {
    updates.favicon = req.files.favicon.filename;
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a Blog by ID
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(204).send(); // No content to send back
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
