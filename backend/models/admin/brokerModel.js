const db = require('../../config/db');

const BrokerModel = {
getAllBroker: async () => {
    try {
      const [broker] = await db.promise().query('SELECT * FROM broker');
    return broker;
    } catch (error) {
    throw new Error('Error fetching broker: ' + error.message);
    }
},

addBroker: async (brokerData) => {
    try {
    const { order_id, website_url, broker_image, rating, type, company_name, ranking, min_deposit } = brokerData;

    const result = await db.promise().query(
        `INSERT INTO broker (order_id, website_url, broker_image, rating, type, company_name, ranking, min_deposit)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [order_id, website_url, broker_image, rating, type, company_name, ranking, min_deposit]
    );

    return result;
    } catch (error) {
    throw new Error('Error inserting broker: ' + error.message);
    }
},

getBrokerById: async (id) => {
    try {
      const [result] = await db.promise().query('SELECT * FROM broker WHERE id = ?', [id]);
    return result.length > 0 ? result[0] : null;
    } catch (error) {
    throw new Error('Error fetching broker by ID: ' + error.message);
    }
},


uptypeBrokerById: async (id, updatedData) => {
    const { order_id, website_url, broker_image, rating, type, company_name, ranking, min_deposit } = updatedData;

    try {
    await db.promise().query(
        `UPDATE broker SET order_id = ?, website_url = ?, broker_image = ?, rating = ?, type = ?, company_name = ?, ranking = ?, min_deposit = ? WHERE id = ?`,
        [order_id, website_url, broker_image, rating, type, company_name, ranking, min_deposit, id]
    );
    } catch (error) {
    throw new Error('Error updating broker by ID: ' + error.message);
    }
},  

deleteBrokerById: async (id) => {
    try {
    await db.promise().query('DELETE FROM broker WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting broker by ID: ' + error.message);
    }
},

}

module.exports = BrokerModel;
