const db = require('../../config/db');

const MarketPrimerModel = {
    getAllMarketPrimers: async () => {
        try {
            const [marketPrimers] = await db.promise().query('SELECT * FROM market_primer');
            return marketPrimers;
        } catch (error) {
            throw new Error('Error fetching market primers: ' + error.message);
        }
    },

    addMarketPrimer: async (marketPrimerData) => {
        try {
            const { date, pdf } = marketPrimerData;

            await db.promise().query(
                `INSERT INTO market_primer (date, pdf) VALUES (?, ?)`,
                [date, pdf]
            );
        } catch (error) {
            throw new Error('Error inserting market primer: ' + error.message);
        }
    },

    getMarketPrimerById: async (id) => {
        try {
            const [result] = await db.promise().query('SELECT * FROM market_primer WHERE id = ?', [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw new Error('Error fetching market primer by ID: ' + error.message);
        }
    },

    updateMarketPrimerById: async (id, updatedData) => {
        const { date, pdf } = updatedData;

        try {
            await db.promise().query(
                `UPDATE market_primer SET date = ?, pdf = ? WHERE id = ?`,
                [date, pdf, id]
            );
        } catch (error) {
            throw new Error('Error updating market primer: ' + error.message);
        }
    },

    deleteMarketPrimerById: async (id) => {
        try {
            await db.promise().query('DELETE FROM market_primer WHERE id = ?', [id]);
        } catch (error) {
            throw new Error('Error deleting market primer: ' + error.message);
        }
    }
};

module.exports = MarketPrimerModel;
