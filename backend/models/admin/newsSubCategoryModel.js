const db = require('../../config/db');

const NewsSubCategoryModel = {
getAllNewsSubCategory: async () => {
    try {
      const [newsSubCategory] = await db.promise().query('SELECT * FROM news_sub_category');
    return newsSubCategory;
    } catch (error) {
    throw new Error('Error fetching news sub category: ' + error.message);
    }
},

addNewsSubCategory: async ({ name}) => {
    try {
    await db.promise().query(
        'INSERT INTO news_sub_category (name) VALUES (?)',
        [name]
    );
    } catch (error) {
    throw new Error('Error adding news sub category: ' + error.message);
    }
},

updateNewsSubCategoryById: async (id, updatedData) => {
    try {
    const { name } = updatedData;

    await db.promise().query(
        `UPDATE news_sub_category SET name = ? WHERE id = ?`,
        [name, id]
    );
    } catch (error) {
    throw new Error('Error updating news sub category by ID: ' + error.message);
    }
},

deleteNewsSubCategoryById: async (id) => {
    try {
    await db.promise().query('DELETE FROM news_sub_category WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting news sub category by ID: ' + error.message);
    }
},

}

module.exports = NewsSubCategoryModel;