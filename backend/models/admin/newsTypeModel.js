const db = require('../../config/db');

const NewsTypeModel = {
getAllNewsType: async () => {
    try {
      const [newsType] = await db.promise().query('SELECT * FROM news_type');
    return newsType;
    } catch (error) {
    throw new Error('Error fetching news type data: ' + error.message);
    }
},

addNewsType: async ({ news_type_name }) => {
    try {
    await db.promise().query(
        'INSERT INTO news_type (news_type_name) VALUES (?)',
        [news_type_name]
    );
    } catch (error) {
    throw new Error('Error adding news type data: ' + error.message);
    }
},

updateNewsTypeById: async (id, updatedData) => {
    try {
    const { news_type_name } = updatedData;

    await db.promise().query(
        `UPDATE news_type SET news_type_name = ? WHERE id = ?`,
        [news_type_name, id]
    );
    } catch (error) {
    throw new Error('Error updating news type data by ID: ' + error.message);
    }
},

deleteNewsTypeById: async (id) => {
    try {
    await db.promise().query('DELETE FROM news_type WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting news type data by ID: ' + error.message);
    }
},

}

module.exports = NewsTypeModel;