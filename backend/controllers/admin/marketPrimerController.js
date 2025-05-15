const MarketPrimerModel = require('../../models/admin/marketPrimerModel');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage });
const singleUpload = upload.single('pdf');

const marketPrimerController = {
    fetchAllMarketPrimers: async (req, res) => {
        try {
            const marketPrimers = await MarketPrimerModel.getAllMarketPrimers();
            res.status(200).json({ message: 'Market primers fetched successfully', marketPrimers });
        } catch (error) {
            console.error('Error fetching market primers:', error);
            res.status(500).json({ message: 'Failed to fetch market primers' });
        }
    },

    addMarketPrimer: async (req, res) => {
        singleUpload(req, res, async (err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).json({ message: 'Error uploading file: ' + err.message });
            }

            const { date } = req.body;

            if (!date || !req.file) {
                return res.status(400).json({ message: 'Date and PDF file are required.' });
            }

            const marketPrimerData = {
                date,
                pdf: req.file.originalname
            };

            try {
                await MarketPrimerModel.addMarketPrimer(marketPrimerData);
                res.status(201).json({ message: 'Market primer added successfully' });
            } catch (error) {
                console.error('Error adding market primer:', error);
                res.status(500).json({ message: 'Failed to add market primer' });
            }
        });
    },

    editMarketPrimer: async (req, res) => {
        const { id } = req.params;
        singleUpload(req, res, async (err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).json({ message: 'Error uploading file: ' + err.message });
            }

            const { date } = req.body;

            if (!date) {
                return res.status(400).json({ message: 'Date is required.' });
            }

            try {
                const existingPrimer = await MarketPrimerModel.getMarketPrimerById(id);
                if (!existingPrimer) {
                    return res.status(404).json({ message: 'Market primer not found.' });
                }

                const updatedData = {
                    date,
                    pdf: req.file ? req.file.originalname : existingPrimer.pdf
                };

                await MarketPrimerModel.updateMarketPrimerById(id, updatedData);
                res.status(200).json({ message: 'Market primer updated successfully.' });
            } catch (error) {
                console.error('Error updating market primer:', error);
                res.status(500).json({ message: 'Failed to update market primer' });
            }
        });
    },

    deleteMarketPrimer: async (req, res) => {
        const { id } = req.params;
        try {
            await MarketPrimerModel.deleteMarketPrimerById(id);
            res.status(200).json({ message: 'Market primer deleted successfully' });
        } catch (error) {
            console.error('Error deleting market primer:', error);
            res.status(500).json({ message: 'Failed to delete market primer' });
        }
    }
};

module.exports = marketPrimerController;
