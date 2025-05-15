const db = require('../../config/db');

const AuthorPricingModel = {
getAllAuthorPricing: async () => {
    try {
      const [authorPricing] = await db.promise().query('SELECT * FROM author_pricing');
    return authorPricing;
    } catch (error) {
    throw new Error('Error fetching author pricing: ' + error.message);
    }
},

addAuthorPricing: async ({ name, description, price }) => {
    try {
    await db.promise().query(
        'INSERT INTO author_pricing (name, description, price) VALUES (?, ?, ?)',
        [name, description, price]
    );
    } catch (error) {
    throw new Error('Error adding author pricing: ' + error.message);
    }
},

updateAuthorPricingById: async (id, updatedData) => {
    try {
    const { name, description, price } = updatedData;

    await db.promise().query(
        `UPDATE author_pricing SET name = ?, description = ?, price = ? WHERE id = ?`,
        [name, description, price, id]
    );
    } catch (error) {
    throw new Error('Error updating author pricing by ID: ' + error.message);
    }
},

deleteAuthorPricingById: async (id) => {
    try {
    await db.promise().query('DELETE FROM author_pricing WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting author pricing by ID: ' + error.message);
    }
},

}

module.exports = AuthorPricingModel;