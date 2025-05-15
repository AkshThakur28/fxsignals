const ContactUsModel = require('../../models/admin/contactUsModel');

const contactUsController = {
    fetchAllContact: async (req, res) => {
        try {
        const contactUs = await ContactUsModel.getAllContact();
        res.status(200).json({ message: 'Contact us data fetched successfully', contactUs });
        } catch (error) {
        console.error('Error fetching contact us data:', error);
        res.status(500).json({ message: 'Failed to fetch contact us data' });
        }
    },

    contactUsAdd: async (req, res) => {
        const { name, email, message } = req.body;
    
        if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        await ContactUsModel.addContactUs({name, email, message});
        res.status(201).json({ message: 'Contact us data added successfully.' });
    },

    contactUsEdit: async (req, res) => {
        const { id } = req.params; 
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const updatedData = { name, email, message };
        try {
            await ContactUsModel.updateContactUsById(id, updatedData);
            res.status(200).json({ message: 'Contact us updated successfully' });
        } catch (error) {
            console.error('Error updating contact us:', error);
            res.status(500).json({ message: 'Failed to update contact us' });
        }
    },

    deletecontactUs: async (req, res) => {
        const { id } = req.params; 
        try {
        await ContactUsModel.deleteContactUsById(id);
        res.status(200).json({ message: 'Contact us deleted successfully' });
        } catch (error) {
        console.error('Error deleting contact us:', error);
        res.status(500).json({ message: 'Failed to delete contact us' });
        }
    },
}

module.exports = contactUsController;