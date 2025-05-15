const AuthorPricingModel = require('../../models/admin/authorPricingModel');

const authorPricingController = {
fetchAllAuthorPricing: async (req, res) => {
        try {
        const authorPricing = await AuthorPricingModel.getAllAuthorPricing();
        res.status(200).json({ message: 'Author pricing fetched successfully', authorPricing });
        } catch (error) {
        console.error('Error fetching author pricing:', error);
        res.status(500).json({ message: 'Failed to fetch author pricing' });
        }
    },

authorPricingAdd: async (req, res) => {
        const { name, description, price } = req.body;
    
        if (!name || !description || !price) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const authorPricingData = {
            name, 
            description, 
            price
        };
        try {
            await AuthorPricingModel.addAuthorPricing(authorPricingData);
            res.status(201).json({ message: 'Author pricing added successfully' });
        } catch (error) {
            console.error('Error adding author pricing:', error);
            res.status(500).json({ message: 'Failed to add author pricing' });
        }
    },

authorPricingEdit: async (req, res) => {
        const { id } = req.params; 
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            name, 
            description, 
            price
        };

        try {
            await AuthorPricingModel.updateAuthorPricingById(id, updatedData);
            res.status(200).json({ message: 'Author pricing updated successfully' });
        } catch (error) {
            console.error('Error updating author pricing:', error);
            res.status(500).json({ message: 'Failed to update author pricing' });
        }
    },

deleteAuthorPricing: async (req, res) => {
        const { id } = req.params; 
        try {
        await AuthorPricingModel.deleteAuthorPricingById(id);
        res.status(200).json({ message: 'Author pricing deleted successfully' });
        } catch (error) {
        console.error('Error deleting author pricing:', error);
        res.status(500).json({ message: 'Failed to delete author pricing' });
        }
    },
}

module.exports = authorPricingController;