const NewsTypeModel = require('../../models/admin/newsTypeModel');

const newsTypeController = {
fetchAllNewsType: async (req, res) => {
        try {
        const newsType = await NewsTypeModel.getAllNewsType();
        res.status(200).json({ message: 'News Type data fetched successfully', newsType });
        } catch (error) {
        console.error('Error fetching news type data:', error);
        res.status(500).json({ message: 'Failed to fetch news type data' });
        }
    },

newsTypeAdd: async (req, res) => {
        const { news_type_name } = req.body;
    
        if (!news_type_name) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const newsTypeData = {
            news_type_name
        };
        try {
            await NewsTypeModel.addNewsType(newsTypeData);
            res.status(201).json({ message: 'News Type data added successfully' });
        } catch (error) {
            console.error('Error adding news type data:', error);
            res.status(500).json({ message: 'Failed to add news type data' });
        }
    },

newsTypeEdit: async (req, res) => {
        const { id } = req.params; 
        const { news_type_name } = req.body;
        if (!news_type_name) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            news_type_name
        };

        try {
            await NewsTypeModel.updateNewsTypeById(id, updatedData);
            res.status(200).json({ message: 'News Type data updated successfully' });
        } catch (error) {
            console.error('Error updating news type data:', error);
            res.status(500).json({ message: 'Failed to update news type data' });
        }
    },

deleteNewsType: async (req, res) => {
        const { id } = req.params; 
        try {
        await NewsTypeModel.deleteNewsTypeById(id);
        res.status(200).json({ message: 'News Type data deleted successfully' });
        } catch (error) {
        console.error('Error deleting news type data:', error);
        res.status(500).json({ message: 'Failed to delete news type data' });
        }
    },
}

module.exports = newsTypeController;