const db = require('../../config/db');

const TradingSignalsModel = {
getAllTradingSignals: async () => {
    try {
      const [tradingSignals] = await db.promise().query('SELECT * FROM trading_signals');
    return tradingSignals;
    } catch (error) {
    throw new Error('Error fetching trading signals: ' + error.message);
    }
},

addTradingSignals: async ({ entry_point, package, date, category, sub_category, action, status, stop_loss, take_profit, created_by }) => {
    try {
    await db.promise().query(
        'INSERT INTO trading_signals (entry_point, package, date, category, sub_category, action, status, stop_loss, take_profit, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [entry_point, package, date, category, sub_category, action, status, stop_loss, take_profit, created_by]
    );
    } catch (error) {
    throw new Error('Error adding trading signals: ' + error.message);
    }
},

updateTradingSignalsById: async (id, updatedData) => {
    try {
    const { entry_point, package, date, category, sub_category, action, status, stop_loss, take_profit, created_by } = updatedData;

    await db.promise().query(
        `UPDATE trading_signals SET entry_point = ?, package = ?, date = ?, category = ?, sub_category = ?, action = ?, status = ?, stop_loss = ?, take_profit = ?, created_by = ? WHERE id = ?`,
        [entry_point, package, date, category, sub_category, action, status, stop_loss, take_profit, created_by, id]
    );
    } catch (error) {
    throw new Error('Error updating trading signals by ID: ' + error.message);
    }
},

deleteTradingSignalsById: async (id) => {
    try {
    await db.promise().query('DELETE FROM trading_signals WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting trading signals by ID: ' + error.message);
    }
},

}

module.exports = TradingSignalsModel;