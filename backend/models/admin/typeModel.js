const db = require('../../config/db');

const TypeModel = {
getAllType: async () => {
    try {
      const [type] = await db.promise().query('SELECT * FROM type');
    return type;
    } catch (error) {
    throw new Error('Error fetching type data: ' + error.message);
    }
},

addType: async ({ type_name }) => {
    try {
    await db.promise().query(
        'INSERT INTO type (type_name) VALUES (?)',
        [type_name]
    );
    } catch (error) {
    throw new Error('Error adding type data: ' + error.message);
    }
},

updateTypeById: async (id, updatedData) => {
    try {
    const { type_name } = updatedData;

    await db.promise().query(
        `UPDATE type SET type_name = ? WHERE id = ?`,
        [type_name, id]
    );
    } catch (error) {
    throw new Error('Error updating type data by ID: ' + error.message);
    }
},

deleteTypeById: async (id) => {
    try {
    await db.promise().query('DELETE FROM type WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting type data by ID: ' + error.message);
    }
},

}

module.exports = TypeModel;