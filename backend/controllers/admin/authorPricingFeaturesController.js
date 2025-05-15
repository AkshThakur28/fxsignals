const AuthorPricingFeaturesModel = require('../../models/admin/authorPricingFeaturesModel');

const authorPricingFeaturesController = {
fetchAllAuthorPricingFeatures: async (req, res) => {
        try {
        const authorPricingFeatures = await AuthorPricingFeaturesModel.getAllAuthorPricingFeatures();
        res.status(200).json({ message: 'Author pricing features fetched successfully', authorPricingFeatures });
        } catch (error) {
        console.error('Error fetching author pricing features:', error);
        res.status(500).json({ message: 'Failed to fetch author pricing features' });
        }
    },

authorPricingFeaturesAdd: async (req, res) => {
        const { pricing_id, features, features_available } = req.body;
    
        if (!pricing_id || !features || !features_available) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const authorPricingFeaturesData = {
            pricing_id, 
            features, 
            features_available
        };
        try {
            await AuthorPricingFeaturesModel.addAuthorPricingFeatures(authorPricingFeaturesData);
            res.status(201).json({ message: 'Author pricing features added successfully' });
        } catch (error) {
            console.error('Error adding author pricing features:', error);
            res.status(500).json({ message: 'Failed to add author pricing features' });
        }
    },

authorPricingFeaturesEdit: async (req, res) => {
        const { id } = req.params; 
        const { pricing_id, features, features_available } = req.body;
        if (!pricing_id || !features || !features_available) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            pricing_id, 
            features, 
            features_available
        };

        try {
            await AuthorPricingFeaturesModel.updateAuthorPricingFeaturesById(id, updatedData);
            res.status(200).json({ message: 'Author pricing features updated successfully' });
        } catch (error) {
            console.error('Error updating author pricing features:', error);
            res.status(500).json({ message: 'Failed to update author pricing features' });
        }
    },

deleteAuthorPricingFeatures: async (req, res) => {
        const { id } = req.params; 
        try {
        await AuthorPricingFeaturesModel.deleteAuthorPricingFeaturesById(id);
        res.status(200).json({ message: 'Author pricing features deleted successfully' });
        } catch (error) {
        console.error('Error deleting author pricing features:', error);
        res.status(500).json({ message: 'Failed to delete author pricing features' });
        }
    },
}

module.exports = authorPricingFeaturesController;