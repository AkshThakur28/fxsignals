const db = require('../../config/db');

const ContactUsModel = {
    getAllContact: async () => {
    try {
      const [contactUs] = await db.promise().query('SELECT * FROM contact_us');
    return contactUs;
    } catch (error) {
    throw new Error('Error fetching contact us: ' + error.message);
    }
},

addContactUs: async ({ name, email, message}) => {
    try {
    await db.promise().query(
        'INSERT INTO contact_us (name, email, message) VALUES (?, ?, ?)',
        [name, email, message]
    );
    } catch (error) {
    throw new Error('Error adding contact us: ' + error.message);
    }
},

updateContactUsById: async (id, updatedData) => {
    try {
    const { name, email, message } = updatedData;

    await db.promise().query(
        `UPDATE contact_us SET name = ?, email = ?, message = ? WHERE id = ?`,
        [name, email, message, id]
    );
    } catch (error) {
    throw new Error('Error updating contact us by ID: ' + error.message);
    }
},

deleteContactUsById: async (id) => {
    try {
    await db.promise().query('DELETE FROM contact_us WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting contact us by ID: ' + error.message);
    }
},

}

module.exports = ContactUsModel;