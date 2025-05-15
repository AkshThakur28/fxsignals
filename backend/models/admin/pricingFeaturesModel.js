const db = require('../../config/db');

const PricingFeaturesModel = {
    getAllPricingFeatures: async () => {
    try {
      const [pricing_features] = await db.promise().query('SELECT * FROM pricing_features');
    return pricing_features;
    } catch (error) {
    throw new Error('Error fetching pricing features: ' + error.message);
    }
},

addPricingFeatures: async ({ pricing_id, features, features_available}) => {
    try {
    await db.promise().query(
        'INSERT INTO pricing_features (pricing_id, features, features_available) VALUES (?, ?, ?)',
        [pricing_id, features, features_available]
    );
    } catch (error) {
    throw new Error('Error adding pricing features: ' + error.message);
    }
},

updatePricingFeaturesById: async (id, updatedData) => {
    try {
    const { pricing_id, features, features_available } = updatedData;

    await db.promise().query(
        `UPDATE pricing_features SET pricing_id = ?, features = ?, features_available = ? WHERE id = ?`,
        [pricing_id, features, features_available, id]
    );
    } catch (error) {
    throw new Error('Error updating pricing features by ID: ' + error.message);
    }
},

deletePricingFeaturesById: async (id) => {
    try {
    await db.promise().query('DELETE FROM pricing_features WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting pricing features by ID: ' + error.message);
    }
},

}

module.exports = PricingFeaturesModel;