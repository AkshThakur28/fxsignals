const AnalysisModel = require('../../models/admin/analysisModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'uploads/');  
},
filename: (req, file, cb) => {

    cb(null, file.originalname);  
}
});

const upload = multer({ storage: storage });

const analysisController = {
fetchAllAnalysis: async (req, res) => {
    try {
    const analysis = await AnalysisModel.getAllAnalysis();
    res.status(200).json({ message: 'Analysis data fetched successfully', analysis });
    } catch (error) {
    console.error('Error fetching analysis data:', error);
    res.status(500).json({ message: 'Failed to fetch analysis data' });
    }
},

addAnalysis: async (req, res) => {
    upload.single('analysis_image')(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
    }

    const { date, heading, description, author, type, created_by } = req.body;

    if (!date || !heading || !description || !req.file || !author || !type || !created_by) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const analysisData = {
        date,
        heading,
        analysis_image: req.file.originalname,  
        description,
        author,
        type,
        created_by
    };

    try {
        await AnalysisModel.addAnalysis(analysisData);
        res.status(201).json({ message: 'Analysis data added successfully' });
    } catch (error) {
        console.error('Error adding analysis data:', error);
        res.status(500).json({ message: 'Failed to add analysis data' });
    }
    });
},

editAnalysis: async (req, res) => {
    const { id } = req.params;
    upload.single('analysis_image')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading image' });
        }

        const { date, heading, description, author, type, created_by } = req.body;

        if (!heading || !description || !author || !type || !created_by) {
            return res.status(400).json({ message: 'All fields are required except image.' });
        }

        try {
            const existingAnalysis = await AnalysisModel.getAnalysisById(id);
            if (!existingAnalysis) {
                return res.status(404).json({ message: 'Analysis data not found.' });
            }

            const updatedData = {
                date: date || existingAnalysis.date, 
                heading,
                analysis_image: req.file ? req.file.originalname : existingAnalysis.analysis_image, 
                description,
                author,
                type,
                created_by
            };

            await AnalysisModel.updateAnalysisById(id, updatedData);
            res.status(200).json({ message: 'Analysis data updated successfully.' });
        } catch (error) {
            console.error('Error updating analysis data:', error);
            res.status(500).json({ message: 'Failed to update analysis data' });
        }
    });
},

deleteAnalysis: async (req, res) => {
    const { id } = req.params; 
    try {
    await AnalysisModel.deleteAnalysisById(id);
    res.status(200).json({ message: 'Analysis data deleted successfully' });
    } catch (error) {
    console.error('Error deleting analysis data:', error);
    res.status(500).json({ message: 'Failed to delete analysis data' });
    }
},

};

module.exports = analysisController;
