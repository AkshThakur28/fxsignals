const CurrencyPairModel = require('../../models/admin/currencyPairModel');

const currencyPairController = {
fetchAllCurrencyPair: async (req, res) => {
        try {
        const currencyPair = await CurrencyPairModel.getAllCurrencyPair();
        res.status(200).json({ message: 'Currency pair fetched successfully', currencyPair });
        } catch (error) {
        console.error('Error fetching currency pair:', error);
        res.status(500).json({ message: 'Failed to fetch currency pair' });
        }
    },

currencyPairAdd: async (req, res) => {
        const { pair_category, pair_name } = req.body;
    
        if (!pair_category || !pair_name) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const currencyPairData = {
            pair_category, 
            pair_name
        };
        try {
            await CurrencyPairModel.addCurrencyPair(currencyPairData);
            res.status(201).json({ message: 'Currency pair added successfully' });
        } catch (error) {
            console.error('Error adding currency pair:', error);
            res.status(500).json({ message: 'Failed to add currency pair' });
        }
    },

currencyPairEdit: async (req, res) => {
        const { id } = req.params; 
        const { pair_category, pair_name } = req.body;
        if (!pair_category || !pair_name) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            pair_category, 
            pair_name
        };

        try {
            await CurrencyPairModel.updateCurrencyPairById(id, updatedData);
            res.status(200).json({ message: 'Currency pair updated successfully' });
        } catch (error) {
            console.error('Error updating currency pair:', error);
            res.status(500).json({ message: 'Failed to update currency pair' });
        }
    },

deleteCurrencyPair: async (req, res) => {
        const { id } = req.params; 
        try {
        await CurrencyPairModel.deleteCurrencyPairById(id);
        res.status(200).json({ message: 'Currency pair deleted successfully' });
        } catch (error) {
        console.error('Error deleting currency pair:', error);
        res.status(500).json({ message: 'Failed to delete currency pair' });
        }
    },
}

module.exports = currencyPairController;