const PricingFeaturesModel = require('../../models/admin/pricingFeaturesModel');

const pricingFeaturesController = {
    fetchAllPricingFeatures: async (req, res) => {
        try {
        const pricingFeatures = await PricingFeaturesModel.getAllPricingFeatures();
        res.status(200).json({ message: 'Pricing features fetched successfully', pricingFeatures });
        } catch (error) {
        console.error('Error fetching pricing features:', error);
        res.status(500).json({ message: 'Failed to fetch pricing features' });
        }
    },

    pricingFeaturesAdd: async (req, res) => {
        const { pricing_id, features, features_available } = req.body;
    
        if (!pricing_id || !features || !features_available) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        await PricingFeaturesModel.addPricingFeatures({pricing_id, features, features_available});
        res.status(201).json({ message: 'Pricing features added successfully.' });
    },

    pricingFeaturesEdit: async (req, res) => {
        const { id } = req.params; 
        const { pricing_id, features, features_available } = req.body;
        if (!pricing_id || !features || !features_available) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const updatedData = { pricing_id, features, features_available };
        try {
            await PricingFeaturesModel.updatePricingFeaturesById(id, updatedData);
            res.status(200).json({ message: 'Pricing features updated successfully' });
        } catch (error) {
            console.error('Error updating pricing features:', error);
            res.status(500).json({ message: 'Failed to update pricing features' });
        }
    },

    deletePricingFeatures: async (req, res) => {
        const { id } = req.params; 
        try {
        await PricingFeaturesModel.deletePricingFeaturesById(id);
        res.status(200).json({ message: 'Pricing features deleted successfully' });
        } catch (error) {
        console.error('Error deleting pricing features:', error);
        res.status(500).json({ message: 'Failed to delete pricing features' });
        }
    },
}

module.exports = pricingFeaturesController;