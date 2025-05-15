const SeoModel = require('../../models/admin/seoModel');

const seoController = {
    fetchAllSeo: async (req, res) => {
        try {
        const seo = await SeoModel.getAllSeo();
        res.status(200).json({ message: 'SEO data fetched successfully', seo });
        } catch (error) {
        console.error('Error fetching SEO data:', error);
        res.status(500).json({ message: 'Failed to fetch SEO data' });
        }
    },

    seoAdd: async (req, res) => {
        const { page_name, url, keywords, title, meta_description } = req.body;
    
        if (!page_name || !url || !keywords || !title || !meta_description) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const seoData = {
            page_name,
            url,
            keywords,  
            title,
            meta_description
        };
        try {
            await SeoModel.addSeo(seoData);
            res.status(201).json({ message: 'SEO data added successfully' });
        } catch (error) {
            console.error('Error adding SEO data:', error);
            res.status(500).json({ message: 'Failed to add SEO data' });
        }
    },

    seoEdit: async (req, res) => {
        const { id } = req.params; 
        const { page_name, url, keywords, title, meta_description } = req.body;
        if (!page_name || !url || !keywords || !title || !meta_description) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            page_name,
            url,
            keywords,  
            title,
            meta_description
        };

        try {
            await SeoModel.updateSeoById(id, updatedData);
            res.status(200).json({ message: 'SEO data updated successfully' });
        } catch (error) {
            console.error('Error updating SEO data:', error);
            res.status(500).json({ message: 'Failed to update SEO data' });
        }
    },

    deleteSeo: async (req, res) => {
        const { id } = req.params; 
        try {
        await SeoModel.deleteSeoById(id);
        res.status(200).json({ message: 'SEO data deleted successfully' });
        } catch (error) {
        console.error('Error deleting SEO data:', error);
        res.status(500).json({ message: 'Failed to delete SEO data' });
        }
    },
}

module.exports = seoController;