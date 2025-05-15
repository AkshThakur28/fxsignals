const db = require('../../config/db');

const CurrencyPairModel = {
getAllCurrencyPair: async () => {
    try {
      const [currencyPair] = await db.promise().query('SELECT * FROM currency_pair');
    return currencyPair;
    } catch (error) {
    throw new Error('Error fetching currency pair: ' + error.message);
    }
},

addCurrencyPair: async ({ pair_category, pair_name }) => {
    try {
    await db.promise().query(
        'INSERT INTO currency_pair (pair_category, pair_name) VALUES (?, ?)',
        [pair_category, pair_name]
    );
    } catch (error) {
    throw new Error('Error adding currency pair: ' + error.message);
    }
},

updateCurrencyPairById: async (id, updatedData) => {
    try {
    const { pair_category, pair_name } = updatedData;

    await db.promise().query(
        `UPDATE currency_pair SET pair_category = ?, pair_name = ? WHERE id = ?`,
        [pair_category, pair_name, id]
    );
    } catch (error) {
    throw new Error('Error updating currency pair by ID: ' + error.message);
    }
},

deleteCurrencyPairById: async (id) => {
    try {
    await db.promise().query('DELETE FROM currency_pair WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting currency pair by ID: ' + error.message);
    }
},

}

module.exports = CurrencyPairModel;