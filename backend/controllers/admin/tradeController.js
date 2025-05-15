const TradeModel = require('../../models/admin/tradeModel');
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

const tradeController = {
fetchAllTrade: async (req, res) => {
    try {
    const trade = await TradeModel.getAllTrade();
    res.status(200).json({ message: 'Trade data fetched successfully', trade });
    } catch (error) {
    console.error('Error fetching trade data:', error);
    res.status(500).json({ message: 'Failed to fetch trade data' });
    }
},

addTrade: async (req, res) => {
    upload.single('trade_image')(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
    }

    const { trade_type, title, description, date, created_by, author } = req.body;

    if (!trade_type || !title || !description || !req.file || !date || !created_by || !author) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const tradeData = {
        trade_type,
        title,
        trade_image: req.file.originalname,  
        description,
        date,
        created_by,
        author
    };

    try {
        await TradeModel.addTrade(tradeData);
        res.status(201).json({ message: 'Trade data added successfully' });
    } catch (error) {
        console.error('Error adding trade data:', error);
        res.status(500).json({ message: 'Failed to add trade data' });
    }
    });
},

editTrade: async (req, res) => {
    const { id } = req.params;
    upload.single('trade_image')(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
    }

    const { trade_type, title, description, date, created_by, author } = req.body;

    if (!trade_type || !title || !description || !date || !created_by || !author) {
        return res.status(400).json({ message: 'All fields are required except image.' });
    }

    try {
        const existingTrade = await TradeModel.getTradeById(id);
        if (!existingTrade) {
        return res.status(404).json({ message: 'Trade not found.' });
        }

        const updatedData = {
        trade_type,
        title,
        trade_image: req.file ? req.file.originalname : existingTrade.trade_image, 
        description,
        date,
        created_by,
        author
        };

        await TradeModel.updateTradeById(id, updatedData);
        res.status(200).json({ message: 'Trade data updated successfully.' });
    } catch (error) {
        console.error('Error updating trade data:', error);
        res.status(500).json({ message: 'Failed to update trade data' });
    }
    });
},

deleteTrade: async (req, res) => {
    const { id } = req.params; 
    try {
    await TradeModel.deleteTradeById(id);
    res.status(200).json({ message: 'Trade data deleted successfully' });
    } catch (error) {
    console.error('Error deleting trade data:', error);
    res.status(500).json({ message: 'Failed to delete trade data' });
    }
},

};

module.exports = tradeController;
