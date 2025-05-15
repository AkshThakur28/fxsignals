const AdvertisementModel = require('../../models/admin/advertisementModel');
const multer = require('multer');

const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
},
filename: (req, file, cb) => {
    cb(null, file.originalname); 
}
});

const upload = multer({ storage: storage });

const advertisementController = {
fetchAllAdvertisement: async (req, res) => {
    try {
    const advertisement = await AdvertisementModel.getAllAdvertisement();
    res.status(200).json({ message: 'Advertisements fetched successfully', advertisement });
    } catch (error) {
    console.error('Error fetching advertisements:', error);
    res.status(500).json({ message: 'Failed to fetch advertisements' });
    }
},

advertisementAdd: async (req, res) => {
    upload.fields([
    { name: 'image1' }, { name: 'image2' }, { name: 'image3' }, { name: 'image4' }
    ])(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading images', error: err });
    }

    const { page_name, image1url, image2url, image3url, image4url } = req.body;
    if (!page_name) {
        return res.status(400).json({ message: 'Page name is required.' });
    }

    const advertisementData = {
        page_name,
        image1: req.files['image1'] ? req.files['image1'][0].originalname : null,
        image1url,
        image2: req.files['image2'] ? req.files['image2'][0].originalname : null,
        image2url,
        image3: req.files['image3'] ? req.files['image3'][0].originalname : null,
        image3url,
        image4: req.files['image4'] ? req.files['image4'][0].originalname : null,
        image4url
    };

    try {
        await AdvertisementModel.addAdvertisement(advertisementData);
        res.status(201).json({ message: 'Advertisement added successfully.' });
    } catch (error) {
        console.error('Error adding advertisement:', error);
        res.status(500).json({ message: 'Failed to add advertisement.' });
    }
    });
},

advertisementEdit: async (req, res) => {
    upload.fields([
    { name: 'image1' }, { name: 'image2' }, { name: 'image3' }, { name: 'image4' }
    ])(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading images', error: err });
    }

    const { id } = req.params;
    const { page_name, image1url, image2url, image3url, image4url } = req.body;

    const updatedData = {
        page_name,
        image1: req.files['image1'] ? req.files['image1'][0].originalname : null,
        image1url,
        image2: req.files['image2'] ? req.files['image2'][0].originalname : null,
        image2url,
        image3: req.files['image3'] ? req.files['image3'][0].originalname : null,
        image3url,
        image4: req.files['image4'] ? req.files['image4'][0].originalname : null,
        image4url
    };

    try {
        await AdvertisementModel.updateAdvertisementById(id, updatedData);
        res.status(200).json({ message: 'Advertisement updated successfully.' });
    } catch (error) {
        console.error('Error updating advertisement:', error);
        res.status(500).json({ message: 'Failed to update advertisement.' });
    }
    });
},

deleteAdvertisement: async (req, res) => {
    const { id } = req.params;
    try {
    await AdvertisementModel.deleteAdvertisementById(id);
    res.status(200).json({ message: 'Advertisement deleted successfully.' });
    } catch (error) {
    console.error('Error deleting advertisement:', error);
    res.status(500).json({ message: 'Failed to delete advertisement.' });
    }
}
};

module.exports = advertisementController;
