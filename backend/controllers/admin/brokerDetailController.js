const BrokerDetailModel = require('../../models/admin/brokerDetailModel');

const brokerDetailController = {
fetchAllBrokerDetail: async (req, res) => {
        try {
        const brokerDetail = await BrokerDetailModel.getAllBrokerDetail();
        res.status(200).json({ message: 'Broker detail fetched successfully', brokerDetail });
        } catch (error) {
        console.error('Error fetching broker detail:', error);
        res.status(500).json({ message: 'Failed to fetch broker detail' });
        }
    },

brokerDetailAdd: async (req, res) => {
        const { broker_id, broker_email, broker_contact, about } = req.body;
    
        if (!broker_id || !broker_email || !broker_contact || !about) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const brokerDetailData = {
            broker_id, 
            broker_email, 
            broker_contact, 
            about
        };
        try {
            await BrokerDetailModel.addBrokerDetail(brokerDetailData);
            res.status(201).json({ message: 'Broker detail added successfully' });
        } catch (error) {
            console.error('Error adding broker detail:', error);
            res.status(500).json({ message: 'Failed to add broker detail' });
        }
    },

brokerDetailEdit: async (req, res) => {
        const { id } = req.params; 
        const { broker_id, broker_email, broker_contact, about } = req.body;
        if (!broker_id || !broker_email || !broker_contact || !about) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            broker_id, 
            broker_email, 
            broker_contact, 
            about
        };

        try {
            await BrokerDetailModel.updateBrokerDetailById(id, updatedData);
            res.status(200).json({ message: 'Broker detail updated successfully' });
        } catch (error) {
            console.error('Error updating broker detail:', error);
            res.status(500).json({ message: 'Failed to update broker detail' });
        }
    },

deleteBrokerDetail: async (req, res) => {
        const { id } = req.params; 
        try {
        await BrokerDetailModel.deleteBrokerDetailById(id);
        res.status(200).json({ message: 'Broker detail deleted successfully' });
        } catch (error) {
        console.error('Error deleting broker detail:', error);
        res.status(500).json({ message: 'Failed to delete broker detail' });
        }
    },
}

module.exports = brokerDetailController;