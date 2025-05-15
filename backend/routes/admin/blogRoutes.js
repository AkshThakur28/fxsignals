const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/admin/blogController');

router.get('/blog_view', blogController.fetchAllBlog);

router.post('/add_blog', blogController.blogAdd);

router.put('/blog_edit/:id', blogController.blogEdit); 

router.delete('/blog_delete/:id', blogController.deleteBlog);

module.exports = router;