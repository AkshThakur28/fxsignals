const BlogModel = require('../../models/admin/blogModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'uploads/');
},
filename: (req, file, cb) => {
    cb(null, file.originalname);
}
});

const upload = multer({ storage: storage });

const blogController = {
fetchAllBlog: async (req, res) => {
    try {
    const blog = await BlogModel.getAllBlog();
    res.status(200).json({ message: 'Blogs fetched successfully', blog });
    } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Failed to fetch blogs' });
    }
},

blogAdd: async (req, res) => {
    upload.fields([{ name: 'blog_image' }])(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading blog image', error: err });
    }

    const {
        blog_name,
        blog_category,
        blog_date = new Date(), 
        blog_desc,
        long_desc,
        created_by,
        slug,
        seo_keywords,
        meta_description
    } = req.body;

    if (!blog_name) {
        return res.status(400).json({ message: 'Blog name is required.' });
    }

    const blogData = {
        blog_name,
        blog_image: req.files['blog_image'] ? req.files['blog_image'][0].originalname : null,
        blog_category,
        blog_date,
        blog_desc,
        long_desc,
        created_by,
        slug,
        seo_keywords,
        meta_description
    };

    try {
        await BlogModel.addBlog(blogData);
        res.status(201).json({ message: 'Blog added successfully.' });
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ message: 'Failed to add blog.' });
    }
    });
},

blogEdit: async (req, res) => {
    upload.fields([{ name: 'blog_image' }])(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading blog image', error: err });
    }
    const { id } = req.params;
    const { blog_name, blog_category, blog_date, blog_desc, long_desc, created_by, slug, seo_keywords, meta_description } = req.body;

    const updatedData = {
        blog_name,
        blog_image: req.files['blog_image'] ? req.files['blog_image'][0].originalname : null,
        blog_category,
        blog_date,
        blog_desc,
        long_desc,
        created_by,
        slug,
        seo_keywords,
        meta_description
    };

    try {
        await BlogModel.updateBlogById(id, updatedData);
        res.status(200).json({ message: 'Blog updated successfully.' });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Failed to update blog.' });
    }
    });
},


deleteBlog: async (req, res) => {
    const { id } = req.params;
    try {
    await BlogModel.deleteBlogById(id);
    res.status(200).json({ message: 'Blog deleted successfully.' });
    } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Failed to delete blog.' });
    }
}
};

module.exports = blogController;
