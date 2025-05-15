const BrokerModel = require('../../models/admin/brokerModel');
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

const brokerController = {
fetchAllBroker: async (req, res) => {
    try {
    const broker = await BrokerModel.getAllBroker();
    res.status(200).json({ message: 'Broker fetched successfully', broker });
    } catch (error) {
    console.error('Error fetching broker:', error);
    res.status(500).json({ message: 'Failed to fetch broker' });
    }
},

addBroker: async (req, res) => {
    upload.single('broker_image')(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
    }

    const { order_id, website_url, rating, type, company_name, ranking, min_deposit } = req.body;

    if (!order_id || !website_url || !rating || !req.file || !type || !company_name || !ranking || !min_deposit) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const brokerData = {
        order_id,
        website_url,
        broker_image: req.file.originalname,  
        rating,
        type,
        company_name,
        ranking, 
        min_deposit
    };

    try {
        await BrokerModel.addBroker(brokerData);
        res.status(201).json({ message: 'Broker added successfully' });
    } catch (error) {
        console.error('Error adding broker:', error);
        res.status(500).json({ message: 'Failed to add broker' });
    }
    });
},

editBroker: async (req, res) => {
    const { id } = req.params;
    upload.single('broker_image')(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
    }

    const { order_id, website_url, rating, type, company_name, ranking, min_deposit } = req.body;

    if (!order_id || !website_url || !rating || !type || !company_name || !ranking || !min_deposit) {
        return res.status(400).json({ message: 'All fields are required except image.' });
    }

    try {
        const existingBroker = await BrokerModel.getBrokerById(id);
        if (!existingBroker) {
        return res.status(404).json({ message: 'Broker not found.' });
        }

        const updatedData = {
        order_id,
        website_url,
        broker_image: req.file ? req.file.originalname : existingBroker.broker_image, 
        rating,
        type,
        company_name,
        ranking, 
        min_deposit
        };

        await BrokerModel.uptypeBrokerById(id, updatedData);
        res.status(200).json({ message: 'Broker updated successfully.' });
    } catch (error) {
        console.error('Error updating broker:', error);
        res.status(500).json({ message: 'Failed to update broker' });
    }
    });
},

deleteBroker: async (req, res) => {
    const { id } = req.params; 
    try {
    await BrokerModel.deleteBrokerById(id);
    res.status(200).json({ message: 'Broker deleted successfully' });
    } catch (error) {
    console.error('Error deleting broker:', error);
    res.status(500).json({ message: 'Failed to delete broker' });
    }
},

};

module.exports = brokerController;
