const EnquiryModel = require('../../models/admin/enquiryModel');

const enquiryController = {
fetchAllEnquiry: async (req, res) => {
        try {
        const enquiry = await EnquiryModel.getAllEnquiry();
        res.status(200).json({ message: 'Enquiry fetched successfully', enquiry });
        } catch (error) {
        console.error('Error fetching enquiry:', error);
        res.status(500).json({ message: 'Failed to fetch enquiry' });
        }
    },

enquiryAdd: async (req, res) => {
        const { user_id, message } = req.body;
    
        if (!user_id || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const enquiryData = {
            user_id, 
            message
        };
        try {
            await EnquiryModel.addEnquiry(enquiryData);
            res.status(201).json({ message: 'Enquiry added successfully' });
        } catch (error) {
            console.error('Error adding enquiry:', error);
            res.status(500).json({ message: 'Failed to add enquiry' });
        }
    },

enquiryEdit: async (req, res) => {
        const { id } = req.params; 
        const { user_id, message } = req.body;

        if (!user_id || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            user_id, 
            message
        };

        try {
            await EnquiryModel.updateEnquiryById(id, updatedData);
            res.status(200).json({ message: 'Enquiry updated successfully' });
        } catch (error) {
            console.error('Error updating enquiry:', error);
            res.status(500).json({ message: 'Failed to update enquiry' });
        }
    },

deleteEnquiry: async (req, res) => {
        const { id } = req.params; 
        try {
        await EnquiryModel.deleteEnquiryById(id);
        res.status(200).json({ message: 'Enquiry deleted successfully' });
        } catch (error) {
        console.error('Error deleting enquiry:', error);
        res.status(500).json({ message: 'Failed to delete enquiry' });
        }
    },
}

module.exports = enquiryController;