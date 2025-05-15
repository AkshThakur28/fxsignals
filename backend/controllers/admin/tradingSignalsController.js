const TradingSignalsModel = require('../../models/admin/tradingSignalsModel');

const tradingSignalsController = {
fetchAllTradingSignals: async (req, res) => {
        try {
        const tradingSignals = await TradingSignalsModel.getAllTradingSignals();
        res.status(200).json({ message: 'Trading signals fetched successfully', tradingSignals });
        } catch (error) {
        console.error('Error fetching trading signals:', error);
        res.status(500).json({ message: 'Failed to fetch trading signals' });
        }
    },

tradingSignalsAdd: async (req, res) => {
        const { entry_point, package, date, category, sub_category, action, status, stop_loss, take_profit, created_by } = req.body;
    
        if (!entry_point || !package || !date || !category || !sub_category || !action || !status || !stop_loss || !take_profit || !created_by) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const tradingSignalsData = {
            entry_point, package, date, category, sub_category, action, status, stop_loss, take_profit, created_by
        };
        try {
            await TradingSignalsModel.addTradingSignals(tradingSignalsData);
            res.status(201).json({ message: 'Trading signals added successfully' });
        } catch (error) {
            console.error('Error adding trading signals:', error);
            res.status(500).json({ message: 'Failed to add trading signals' });
        }
    },

tradingSignalsEdit: async (req, res) => {
        const { id } = req.params; 
        const { entry_point, package, date, category, sub_category, action, status, stop_loss, take_profit, created_by } = req.body;

        if (!entry_point || !package || !date || !category || !sub_category || !action || !status || !stop_loss || !take_profit || !created_by) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            entry_point, package, date, category, sub_category, action, status, stop_loss, take_profit, created_by
        };

        try {
            await TradingSignalsModel.updateTradingSignalsById(id, updatedData);
            res.status(200).json({ message: 'Trading signals updated successfully' });
        } catch (error) {
            console.error('Error updating trading signals:', error);
            res.status(500).json({ message: 'Failed to update trading signals' });
        }
    },

deleteTradingSignals: async (req, res) => {
        const { id } = req.params; 
        try {
        await TradingSignalsModel.deleteTradingSignalsById(id);
        res.status(200).json({ message: 'Trading signals deleted successfully' });
        } catch (error) {
        console.error('Error deleting trading signals:', error);
        res.status(500).json({ message: 'Failed to delete trading signals' });
        }
    },
}

module.exports = tradingSignalsController;