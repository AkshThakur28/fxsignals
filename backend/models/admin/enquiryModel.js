const db = require('../../config/db');

const EnquiryModel = {
getAllEnquiry: async () => {
    try {
      const [enquiry] = await db.promise().query('SELECT * FROM enquiry');
    return enquiry;
    } catch (error) {
    throw new Error('Error fetching enquiry: ' + error.message);
    }
},

addEnquiry: async ({ user_id, message }) => {
    try {
    await db.promise().query(
        'INSERT INTO enquiry (user_id, message) VALUES (?, ?)',
        [user_id, message]
    );
    } catch (error) {
    throw new Error('Error adding enquiry: ' + error.message);
    }
},

updateEnquiryById: async (id, updatedData) => {
    try {
    const { user_id, message } = updatedData;

    await db.promise().query(
        `UPDATE enquiry SET user_id = ?, message = ? WHERE id = ?`,
        [user_id, message, id]
    );
    } catch (error) {
    throw new Error('Error updating enquiry by ID: ' + error.message);
    }
},

deleteEnquiryById: async (id) => {
    try {
    await db.promise().query('DELETE FROM enquiry WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting enquiry by ID: ' + error.message);
    }
},

}

module.exports = EnquiryModel;