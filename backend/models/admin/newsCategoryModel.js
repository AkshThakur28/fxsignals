const db = require('../../config/db');

const NewsCategoryModel = {
getAllNewsCategory: async () => {
    try {
      const [newsCategory] = await db.promise().query('SELECT * FROM news_category');
    return newsCategory;
    } catch (error) {
    throw new Error('Error fetching news category: ' + error.message);
    }
},

addNewsCategory: async ({ name}) => {
    try {
    await db.promise().query(
        'INSERT INTO news_category (name) VALUES (?)',
        [name]
    );
    } catch (error) {
    throw new Error('Error adding news category: ' + error.message);
    }
},

updateNewsCategoryById: async (id, updatedData) => {
    try {
    const { name } = updatedData;

    await db.promise().query(
        `UPDATE news_category SET name = ? WHERE id = ?`,
        [name, id]
    );
    } catch (error) {
    throw new Error('Error updating news category by ID: ' + error.message);
    }
},

deleteNewsCategoryById: async (id) => {
    try {
    await db.promise().query('DELETE FROM news_category WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting news category by ID: ' + error.message);
    }
},

}

module.exports = NewsCategoryModel;