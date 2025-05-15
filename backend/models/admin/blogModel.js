const db = require('../../config/db');

const BlogModel = {
getAllBlog: async () => {
    try {
      const [blogs] = await db.promise().query('SELECT * FROM blog');
    return blogs;
    } catch (error) {
    throw new Error('Error fetching blog: ' + error.message);
    }
},

addBlog: async (data) => {
    const { blog_name, blog_image, blog_category, blog_date, blog_desc, long_desc, created_by, slug, seo_keywords, meta_description } = data;

    try {
    await db.promise().query(
        `INSERT INTO blog 
        (blog_name, blog_image, blog_category, blog_date, blog_desc, long_desc, created_by, slug, seo_keywords, meta_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [ blog_name, blog_image, blog_category, blog_date, blog_desc, long_desc, created_by, slug, seo_keywords, meta_description ]
    );
    } catch (error) {
    throw new Error('Error adding blog: ' + error.message);
    }
},

updateBlogById: async (id, data) => {
    const { blog_name, blog_image, blog_category, blog_date, blog_desc, long_desc, created_by, slug, seo_keywords, meta_description } = data;

    try {
    await db.promise().query(
        `UPDATE blog SET blog_name = ?, blog_image = ?, blog_category = ?, blog_date = ?, blog_desc = ?, long_desc = ?, created_by = ?, slug = ?, seo_keywords = ?, meta_description = ? WHERE id = ?`,
        [blog_name,blog_image,blog_category,blog_date,blog_desc,long_desc,created_by,slug,seo_keywords,meta_description,id]
    );
    } catch (error) {
    throw new Error('Error updating blog: ' + error.message);
    }
},

deleteBlogById: async (id) => {
    try {
    await db.promise().query('DELETE FROM blog WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting blog: ' + error.message);
    }
}
};

module.exports = BlogModel;
