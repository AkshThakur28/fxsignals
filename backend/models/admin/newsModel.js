const db = require('../../config/db');

const NewsModel = {
    getAllNews: async () => {
        try {
            const [news] = await db.promise().query(`
            SELECT 
            news.*, 
            news_category.name AS category_name,
            currency_pair.pair_name AS sub_category_name,
            news_type.news_type_name AS news_type_name,
            package.package_name AS news_package_name,
            users.username AS author_name
            FROM news
            LEFT JOIN news_category ON news.category = news_category.id
            LEFT JOIN currency_pair ON news.sub_category = currency_pair.id
            LEFT JOIN news_type ON news.news_type = news_type.id
            LEFT JOIN package ON news.news_package = package.id
            LEFT JOIN users ON news.created_by = users.id
            ORDER BY news.publish_date DESC, news.id DESC
        `);
            return news;
        } catch (error) {
            throw new Error('Error fetching news: ' + error.message);
        }
    },

    getNewsById: async (id) => {
        try {
            const [news] = await db.promise().query('SELECT * FROM news WHERE id = ?', [id]);
            return news[0];
        } catch (error) {
            throw new Error('Error fetching news by ID: ' + error.message);
        }
    },

    addNews: async (newsData) => {
        try {
            const { title, news_image, publish_date, news_desc, category, sub_category, author, news_type, news_package, created_by } = newsData;

            const result = await db.promise().query(
                `INSERT INTO news (title, news_image, publish_date, news_desc, category, sub_category, author, news_type, news_package, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [title, news_image, publish_date, news_desc, category, sub_category, author, news_type, news_package, created_by]
            );

            return result;
        } catch (error) {
            throw new Error('Error inserting news: ' + error.message);
        }
    },

    deleteNewsById: async (id) => {
        try {
            await db.promise().query('DELETE FROM news WHERE id = ?', [id]);
        } catch (error) {
            throw new Error('Error deleting news by ID: ' + error.message);
        }
    },

    updateNewsById: async (updatedData) => {
        try {
            const { id, title, news_image, publish_date, news_desc, category, sub_category, author, news_type, news_package, created_by } = updatedData;

            await db.promise().query(
                `UPDATE news SET title = ?, news_image = ?, publish_date = ?, news_desc = ?, category = ?, sub_category = ?, author = ?, news_type = ?, news_package = ?, created_by = ? WHERE id = ?`,
                [title, news_image, publish_date, news_desc, category, sub_category, author, news_type, news_package, created_by, id]
            );
        } catch (error) {
            throw new Error('Error updating news by ID: ' + error.message);
        }
    },

    getAllNewsPackages: async () => {
        const [rows] = await db.promise().query('SELECT * FROM package');
        return rows;
    },

    getAllCategories: async () => {
        const [rows] = await db.promise().query('SELECT * FROM news_category');
        return rows;
    },

    getAllSubCategories: async () => {
        const [rows] = await db.promise().query('SELECT * FROM currency_pair');
        return rows;
    },

    getAllNewsTypes: async () => {
        const [rows] = await db.promise().query('SELECT * FROM news_type');
        return rows;
    }
};

module.exports = NewsModel;
