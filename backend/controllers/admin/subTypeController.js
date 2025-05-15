const SubTypeModel = require('../../models/admin/subTypeModel');

const subTypeController = {
fetchAllSubType: async (req, res) => {
        try {
        const subType = await SubTypeModel.getAllSubType();
        res.status(200).json({ message: 'Sub Type data fetched successfully', subType });
        } catch (error) {
        console.error('Error fetching sub type data:', error);
        res.status(500).json({ message: 'Failed to fetch sub type data' });
        }
    },

subTypeAdd: async (req, res) => {
        const { sub_type_name } = req.body;
    
        if (!sub_type_name) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const subTypeData = {
            sub_type_name
        };
        try {
            await SubTypeModel.addSubType(subTypeData);
            res.status(201).json({ message: 'Sub Type data added successfully' });
        } catch (error) {
            console.error('Error adding sub type data:', error);
            res.status(500).json({ message: 'Failed to add sub type data' });
        }
    },

subTypeEdit: async (req, res) => {
        const { id } = req.params; 
        const { sub_type_name } = req.body;
        if (!sub_type_name) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            sub_type_name
        };

        try {
            await SubTypeModel.updateSubTypeById(id, updatedData);
            res.status(200).json({ message: 'Sub Type data updated successfully' });
        } catch (error) {
            console.error('Error updating sub type data:', error);
            res.status(500).json({ message: 'Failed to update sub type data' });
        }
    },

deleteSubType: async (req, res) => {
        const { id } = req.params; 
        try {
        await SubTypeModel.deleteSubTypeById(id);
        res.status(200).json({ message: 'Sub Type data deleted successfully' });
        } catch (error) {
        console.error('Error deleting sub type data:', error);
        res.status(500).json({ message: 'Failed to delete sub type data' });
        }
    },
}

module.exports = subTypeController;