const PricingModel = require('../../models/admin/pricingModel');

const pricingController = {
    fetchAllPricing: async (req, res) => {
        try {
        const pricing = await PricingModel.getAllPricing();
        res.status(200).json({ message: 'Pricing fetched successfully', pricing });
        } catch (error) {
        console.error('Error fetching pricing:', error);
        res.status(500).json({ message: 'Failed to fetch pricing' });
        }
    },

    pricingAdd: async (req, res) => {
        const { name, description, price } = req.body;
    
        if (!name || !description || !price) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        await PricingModel.addPricing({name, description, price});
        res.status(201).json({ message: 'Pricing added successfully.' });
    },

    pricingEdit: async (req, res) => {
        const { id } = req.params; 
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const updatedData = { name, description, price };
        try {
            await PricingModel.updatePricingById(id, updatedData);
            res.status(200).json({ message: 'Pricing updated successfully' });
        } catch (error) {
            console.error('Error updating pricing:', error);
            res.status(500).json({ message: 'Failed to update pricing' });
        }
    },

    deletePricing: async (req, res) => {
        const { id } = req.params; 
        try {
        await PricingModel.deletePricingById(id);
        res.status(200).json({ message: 'Pricing deleted successfully' });
        } catch (error) {
        console.error('Error deleting pricing:', error);
        res.status(500).json({ message: 'Failed to delete pricing' });
        }
    },
}

module.exports = pricingController;