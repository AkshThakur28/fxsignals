const SignalManagerProfileModel = require('../../models/admin/signalManagerProfileModel');
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

const signalManagerProfileController = {
fetchAllSignalManagerProfile: async (req, res) => {
    try {
    const signalManagerProfile = await SignalManagerProfileModel.getAllSignalManagerProfile();
    res.status(200).json({ message: 'Signal manager profile fetched successfully', signalManagerProfile });
    } catch (error) {
    console.error('Error fetching signal manager profile:', error);
    res.status(500).json({ message: 'Failed to fetch signal manager profile' });
    }
},

addSignalManagerProfile: async (req, res) => {
    upload.single('signal_manager_profile_image')(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
    }

    const { signal_manager_id, username, email, mobile_no, linkedin, facebook, instagram, twitter, about } = req.body;

    if (!signal_manager_id || !username || !email || !req.file || !mobile_no || !linkedin || !facebook || !instagram || !twitter || !about) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const signalManagerProfileData = {
        signal_manager_id,
        username,
        signal_manager_profile_image: req.file.originalname,  
        email,
        mobile_no,
        linkedin,
        facebook,
        instagram,
        twitter,
        about
    };

    try {
        await SignalManagerProfileModel.addSignalManagerProfile(signalManagerProfileData);
        res.status(201).json({ message: 'Signal manager profile added successfully' });
    } catch (error) {
        console.error('Error adding signal manager profile:', error);
        res.status(500).json({ message: 'Failed to add signal manager profile' });
    }
    });
},

editSignalManagerProfile: async (req, res) => {
    const { id } = req.params;
    upload.single('signal_manager_profile_image')(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
    }

    const { signal_manager_id, username, email, mobile_no, linkedin, facebook, instagram, twitter, about } = req.body;

    if (!signal_manager_id || !username || !email || !req.file || !mobile_no || !linkedin || !facebook || !instagram || !twitter || !about) {
        return res.status(400).json({ message: 'All fields are required except image.' });
    }

    try {
        const existingSignalManagerProfile = await SignalManagerProfileModel.getSignalManagerProfileById(id);
        if (!existingSignalManagerProfile) {
        return res.status(404).json({ message: 'Signal manager profile not found.' });
        }

        const updatedData = {
        signal_manager_id,
        username,
        signal_manager_profile_image: req.file ? req.file.originalname : existingSignalManagerProfile.signal_manager_profile_image, 
        email,
        mobile_no,
        linkedin,
        facebook,
        instagram,
        twitter,
        about
        };

        await SignalManagerProfileModel.updateSignalManagerProfileById(id, updatedData);
        res.status(200).json({ message: 'Signal manager profile updated successfully.' });
    } catch (error) {
        console.error('Error updating signal manager profile:', error);
        res.status(500).json({ message: 'Failed to update signal manager profile' });
    }
    });
},

deleteSignalManagerProfile: async (req, res) => {
    const { id } = req.params; 
    try {
    await SignalManagerProfileModel.deleteSignalManagerProfileById(id);
    res.status(200).json({ message: 'Signal manager profile deleted successfully' });
    } catch (error) {
    console.error('Error deleting signal manager profile:', error);
    res.status(500).json({ message: 'Failed to delete signal manager profile' });
    }
},

};

module.exports = signalManagerProfileController;
