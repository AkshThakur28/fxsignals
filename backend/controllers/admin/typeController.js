const TypeModel = require('../../models/admin/typeModel');

const typeController = {
fetchAllType: async (req, res) => {
        try {
        const type = await TypeModel.getAllType();
        res.status(200).json({ message: 'Type data fetched successfully', type });
        } catch (error) {
        console.error('Error fetching type data:', error);
        res.status(500).json({ message: 'Failed to fetch type data' });
        }
    },

typeAdd: async (req, res) => {
        const { type_name } = req.body;
    
        if (!type_name) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const typeData = {
            type_name
        };
        try {
            await TypeModel.addType(typeData);
            res.status(201).json({ message: 'Type data added successfully' });
        } catch (error) {
            console.error('Error adding type data:', error);
            res.status(500).json({ message: 'Failed to add type data' });
        }
    },

typeEdit: async (req, res) => {
        const { id } = req.params; 
        const { type_name } = req.body;
        if (!type_name) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            type_name
        };

        try {
            await TypeModel.updateTypeById(id, updatedData);
            res.status(200).json({ message: 'Type data updated successfully' });
        } catch (error) {
            console.error('Error updating type data:', error);
            res.status(500).json({ message: 'Failed to update type data' });
        }
    },

deleteType: async (req, res) => {
        const { id } = req.params; 
        try {
        await TypeModel.deleteTypeById(id);
        res.status(200).json({ message: 'Type data deleted successfully' });
        } catch (error) {
        console.error('Error deleting type data:', error);
        res.status(500).json({ message: 'Failed to delete type data' });
        }
    },
}

module.exports = typeController;