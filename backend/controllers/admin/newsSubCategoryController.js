const NewsSubCategoryModel = require('../../models/admin/newsSubCategoryModel');

const newsSubCategoryController = {
    fetchAllNewsSubCategory: async (req, res) => {
        try {
        const newsSubCategory = await NewsSubCategoryModel.getAllNewsSubCategory();
        res.status(200).json({ message: 'News Category fetched successfully', newsSubCategory });
        } catch (error) {
        console.error('Error fetching news sub category:', error);
        res.status(500).json({ message: 'Failed to fetch news sub category' });
        }
    },

    newsSubCategoryAdd: async (req, res) => {
        const { name} = req.body;
    
        if (!name ) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        await NewsSubCategoryModel.addNewsSubCategory({
            name
        });
        res.status(201).json({ message: 'News Sub Category added successfully.' });
    },

    newsSubCategoryEdit: async (req, res) => {
        const { id } = req.params; 
        const {name} = req.body;
        if (!name) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            name
        };

        try {
            await NewsSubCategoryModel.updateNewsSubCategoryById(id, updatedData);
            res.status(200).json({ message: 'News Sub Category updated successfully' });
        } catch (error) {
            console.error('Error updating news sub category:', error);
            res.status(500).json({ message: 'Failed to update news sub category' });
        }
    },

    deleteNewsSubCategory: async (req, res) => {
        const { id } = req.params; 
        try {
        await NewsSubCategoryModel.deleteNewsSubCategoryById(id);
        res.status(200).json({ message: 'News Sub category deleted successfully' });
        } catch (error) {
        console.error('Error deleting news sub category:', error);
        res.status(500).json({ message: 'Failed to delete news sub category' });
        }
    },
}

module.exports = newsSubCategoryController;