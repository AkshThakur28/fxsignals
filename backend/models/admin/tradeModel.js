const db = require('../../config/db');

const TradeModel = {
    getAllTrade: async () => {
    try {
      const [trade] = await db.promise().query('SELECT * FROM trade');
    return trade;
    } catch (error) {
    throw new Error('Error fetching trade data: ' + error.message);
    }
},

addTrade: async (tradeData) => {
    try {
    const { trade_type, title, description, trade_image, date, created_by, author } = tradeData;

    const result = await db.promise().query(
        `INSERT INTO trade (trade_type, title, description, trade_image, \`date\`, created_by, author)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [trade_type, title, description, trade_image, date, created_by, author]
    );

    return result;
    } catch (error) {
    throw new Error('Error inserting trade data: ' + error.message);
    }
},

getTradeById: async (id) => {
    try {
      const [result] = await db.promise().query('SELECT * FROM trade WHERE id = ?', [id]);
    return result.length > 0 ? result[0] : null;
    } catch (error) {
    throw new Error('Error fetching trade data by ID: ' + error.message);
    }
},


updateTradeById: async (id, updatedData) => {
    const { trade_type, title, trade_image, description, date, created_by, author } = updatedData;

    try {
    await db.promise().query(
        `UPDATE trade SET trade_type = ?, title = ?, description = ?, trade_image = ?, \`date\` = ?, created_by = ?, author = ? WHERE id = ?`,
        [trade_type, title, description, trade_image, date, created_by, author, id]
    );
    } catch (error) {
    throw new Error('Error updating trade data by ID: ' + error.message);
    }
},  

deleteTradeById: async (id) => {
    try {
    await db.promise().query('DELETE FROM trade WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting trade data by ID: ' + error.message);
    }
},

}

module.exports = TradeModel;
