const db = require('../../config/db');

const AuthorModel = {
getAllAuthor: async () => {
    try {
      const [author] = await db.promise().query('SELECT * FROM author');
    return author;
    } catch (error) {
    throw new Error('Error fetching author: ' + error.message);
    }
},

addAuthor: async (authorData) => {
    try {
    const { username, firstname, lastname, mobile_no, email, hashedPassword, profile_image, role_name, sample_article, status, linkedin } = authorData;

    const result = await db.promise().query(
        `INSERT INTO author (username, firstname, lastname, mobile_no, email, password, profile_image, role_name, sample_article, status, linkedin)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [username, firstname, lastname, mobile_no, email, hashedPassword, profile_image, role_name, sample_article, status, linkedin]
    );

    return result;
    } catch (error) {
    throw new Error('Error inserting author: ' + error.message);
    }
},

getAuthorById: async (id) => {
    try {
      const [result] = await db.promise().query('SELECT * FROM author WHERE id = ?', [id]);
    return result.length > 0 ? result[0] : null;
    } catch (error) {
    throw new Error('Error fetching author by ID: ' + error.message);
    }
},


updateAuthorById: async (id, updatedData) => {
    const { username, firstname, lastname, mobile_no, email, hashedPassword, profile_image, role_name, sample_article, status, linkedin } = updatedData;

    try {
    await db.promise().query(
        `UPDATE author SET username = ?, firstname = ?, lastname = ?, mobile_no = ?, email = ?, password = ?, profile_image = ?, role_name = ?, sample_article = ?, status = ?, linkedin = ? WHERE id = ?`,
        [username, firstname, lastname, mobile_no, email, hashedPassword, profile_image, role_name, sample_article, status, linkedin, id]
    );
    } catch (error) {
    throw new Error('Error updating author by ID: ' + error.message);
    }
},  

deleteAuthorById: async (id) => {
    try {
    await db.promise().query('DELETE FROM author WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting author by ID: ' + error.message);
    }
},

}

module.exports = AuthorModel;
