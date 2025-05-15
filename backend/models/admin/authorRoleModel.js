const db = require('../../config/db');

const AuthorRoleModel = {
    getAllAuthorRole: async () => {
    try {
      const [authorRole] = await db.promise().query('SELECT * FROM author_role');
    return authorRole;
    } catch (error) {
    throw new Error('Error fetching author role: ' + error.message);
    }
},

addAuthorRole: async ({ author_role }) => {
    try {
    await db.promise().query(
        'INSERT INTO author_role (author_role) VALUES (?)',
        [author_role]
    );
    } catch (error) {
    throw new Error('Error adding author role: ' + error.message);
    }
},

updateAuthorRoleById: async (id, updatedData) => {
    try {
    const { author_role } = updatedData;

    await db.promise().query(
        `UPDATE author_role SET author_role = ? WHERE id = ?`,
        [author_role, id]
    );
    } catch (error) {
    throw new Error('Error updating author role by ID: ' + error.message);
    }
},

deleteAuthorRoleById: async (id) => {
    try {
    await db.promise().query('DELETE FROM author_role WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting author role by ID: ' + error.message);
    }
},

}

module.exports = AuthorRoleModel;