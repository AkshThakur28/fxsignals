const db = require('../../config/db');

const BrokerDetailModel = {
getAllBrokerDetail: async () => {
    try {
      const [brokerDetail] = await db.promise().query('SELECT * FROM broker_detail');
    return brokerDetail;
    } catch (error) {
    throw new Error('Error fetching broker detail: ' + error.message);
    }
},

addBrokerDetail: async ({ broker_id, broker_email, broker_contact, about }) => {
    try {
    await db.promise().query(
        'INSERT INTO broker_detail (broker_id, broker_email, broker_contact, about) VALUES (?, ?, ?, ?)',
        [broker_id, broker_email, broker_contact, about]
    );
    } catch (error) {
    throw new Error('Error adding broker detail: ' + error.message);
    }
},

updateBrokerDetailById: async (id, updatedData) => {
    try {
    const { broker_id, broker_email, broker_contact, about } = updatedData;

    await db.promise().query(
        `UPDATE broker_detail SET broker_id = ?, broker_email = ?, broker_contact = ?, about = ? WHERE id = ?`,
        [broker_id, broker_email, broker_contact, about, id]
    );
    } catch (error) {
    throw new Error('Error updating broker detail by ID: ' + error.message);
    }
},

deleteBrokerDetailById: async (id) => {
    try {
    await db.promise().query('DELETE FROM broker_detail WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting broker detail by ID: ' + error.message);
    }
},

}

module.exports = BrokerDetailModel;