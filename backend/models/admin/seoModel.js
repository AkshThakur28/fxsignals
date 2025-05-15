const db = require('../../config/db');

const SeoModel = {
getAllSeo: async () => {
    try {
      const [seo] = await db.promise().query('SELECT * FROM seo');
    return seo;
    } catch (error) {
    throw new Error('Error fetching SEO data: ' + error.message);
    }
},

addSeo: async ({ page_name, url, keywords, title, meta_description }) => {
    try {
    await db.promise().query(
        'INSERT INTO seo (page_name, url, keywords, title, meta_description) VALUES (?, ?, ?, ?, ?)',
        [page_name, url, keywords, title, meta_description]
    );
    } catch (error) {
    throw new Error('Error adding SEO data: ' + error.message);
    }
},

updateSeoById: async (id, updatedData) => {
    try {
    const { page_name, url, keywords, title, meta_description } = updatedData;

    await db.promise().query(
        `UPDATE seo SET page_name = ?, url = ?, keywords = ?, title = ?, meta_description = ? WHERE id = ?`,
        [page_name, url, keywords, title, meta_description, id]
    );
    } catch (error) {
    throw new Error('Error updating SEO data by ID: ' + error.message);
    }
},

deleteSeoById: async (id) => {
    try {
    await db.promise().query('DELETE FROM seo WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting SEO data by ID: ' + error.message);
    }
},

}

module.exports = SeoModel;