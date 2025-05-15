const db = require('../../config/db');

const SubTypeModel = {
getAllSubType: async () => {
    try {
      const [subType] = await db.promise().query('SELECT * FROM sub_type');
    return subType;
    } catch (error) {
    throw new Error('Error fetching sub type data: ' + error.message);
    }
},

addSubType: async ({ sub_type_name }) => {
    try {
    await db.promise().query(
        'INSERT INTO sub_type (sub_type_name) VALUES (?)',
        [sub_type_name]
    );
    } catch (error) {
    throw new Error('Error adding sub type data: ' + error.message);
    }
},

updateSubTypeById: async (id, updatedData) => {
    try {
    const { sub_type_name } = updatedData;

    await db.promise().query(
        `UPDATE sub_type SET sub_type_name = ? WHERE id = ?`,
        [sub_type_name, id]
    );
    } catch (error) {
    throw new Error('Error updating sub type data by ID: ' + error.message);
    }
},

deleteSubTypeById: async (id) => {
    try {
    await db.promise().query('DELETE FROM sub_type WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting sub type data by ID: ' + error.message);
    }
},

}

module.exports = SubTypeModel;