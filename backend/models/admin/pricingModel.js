const db = require('../../config/db');

const PricingModel = {
    getAllPricing: async () => {
    try {
      const [pricing] = await db.promise().query('SELECT * FROM pricing');
    return pricing;
    } catch (error) {
    throw new Error('Error fetching pricing: ' + error.message);
    }
},

addPricing: async ({ name, description, price}) => {
    try {
    await db.promise().query(
        'INSERT INTO pricing (name, description, price) VALUES (?, ?, ?)',
        [name, description, price]
    );
    } catch (error) {
    throw new Error('Error adding pricing: ' + error.message);
    }
},

updatePricingById: async (id, updatedData) => {
    try {
    const { name, description, price } = updatedData;

    await db.promise().query(
        `UPDATE pricing SET name = ?, description = ?, price = ? WHERE id = ?`,
        [name, description, price, id]
    );
    } catch (error) {
    throw new Error('Error updating pricing by ID: ' + error.message);
    }
},

deletePricingById: async (id) => {
    try {
    await db.promise().query('DELETE FROM pricing WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting pricing by ID: ' + error.message);
    }
},

}

module.exports = PricingModel;