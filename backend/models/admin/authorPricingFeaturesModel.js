const db = require('../../config/db');

const AuthorPricingFeaturesModel = {
getAllAuthorPricingFeatures: async () => {
    try {
      const [authorPricingFeatures] = await db.promise().query('SELECT * FROM author_pricing_features');
    return authorPricingFeatures;
    } catch (error) {
    throw new Error('Error fetching author pricing features: ' + error.message);
    }
},

addAuthorPricingFeatures: async ({ pricing_id, features, features_available }) => {
    try {
    await db.promise().query(
        'INSERT INTO author_pricing_features (pricing_id, features, features_available) VALUES (?, ?, ?)',
        [pricing_id, features, features_available]
    );
    } catch (error) {
    throw new Error('Error adding author pricing features: ' + error.message);
    }
},

updateAuthorPricingFeaturesById: async (id, updatedData) => {
    try {
    const { pricing_id, features, features_available } = updatedData;

    await db.promise().query(
        `UPDATE author_pricing_features SET pricing_id = ?, features = ?, features_available = ? WHERE id = ?`,
        [pricing_id, features, features_available, id]
    );
    } catch (error) {
    throw new Error('Error updating author pricing features by ID: ' + error.message);
    }
},

deleteAuthorPricingFeaturesById: async (id) => {
    try {
    await db.promise().query('DELETE FROM author_pricing_features WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting author pricing features by ID: ' + error.message);
    }
},

}

module.exports = AuthorPricingFeaturesModel;