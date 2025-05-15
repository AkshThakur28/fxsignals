const NewsCategoryModel = require('../../models/admin/newsCategoryModel');

const newsCategoryController = {
    fetchAllNewsCategory: async (req, res) => {
        try {
        const newsCategory = await NewsCategoryModel.getAllNewsCategory();
        res.status(200).json({ message: 'News Category fetched successfully', newsCategory });
        } catch (error) {
        console.error('Error fetching news category:', error);
        res.status(500).json({ message: 'Failed to fetch news category' });
        }
    },

    newsCategoryAdd: async (req, res) => {
        const { name} = req.body;
    
        if (!name ) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        await NewsCategoryModel.addNewsCategory({
            name
        });
        res.status(201).json({ message: 'News Category added successfully.' });
    },

    newsCategoryEdit: async (req, res) => {
        const { id } = req.params; 
        const {name} = req.body;
        if (!name) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            name
        };

        try {
            await NewsCategoryModel.updateNewsCategoryById(id, updatedData);
            res.status(200).json({ message: 'News Category updated successfully' });
        } catch (error) {
            console.error('Error updating news category:', error);
            res.status(500).json({ message: 'Failed to update news category' });
        }
    },

    deleteNewsCategory: async (req, res) => {
        const { id } = req.params; 
        try {
        await NewsCategoryModel.deleteNewsCategoryById(id);
        res.status(200).json({ message: 'News category deleted successfully' });
        } catch (error) {
        console.error('Error deleting news category:', error);
        res.status(500).json({ message: 'Failed to delete news category' });
        }
    },
}

module.exports = newsCategoryController;