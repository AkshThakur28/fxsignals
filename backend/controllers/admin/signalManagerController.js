const SignalManagerModel = require('../../models/admin/signalManagerModel');
const multer = require('multer');
const bcrypt = require('bcrypt');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });
const multiUpload = upload.fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'sample_chart', maxCount: 1 }
]);

const signalManagerController = {

fetchAllSignalManagers: async (req, res) => {
        try {
            const managers = await SignalManagerModel.getAllSignalManagers();
            res.status(200).json({ message: 'Signal Managers fetched successfully', managers });
        } catch (error) {
            console.error('Error fetching signal managers:', error);
            res.status(500).json({ message: 'Failed to fetch signal managers' });
        }
    },

addSignalManager: async (req, res) => {
        multiUpload(req, res, async (err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).json({ message: 'Error uploading files: ' + err.message });
            }

            const {
                firstname,
                lastname,
                email,
                mobile_no,
                password,
                confirm_password,
                status,
                linkedin
            } = req.body;

            if (
                !firstname || !lastname || !req.files['profile_image'] || !req.files['sample_chart'] ||
                !email || !mobile_no || !password || !confirm_password || !status || !linkedin
            ) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            if (password !== confirm_password) {
                return res.status(400).json({ message: 'Passwords do not match.' });
            }

            const username = `${firstname} ${lastname}`.trim();
            const hashedPassword = await bcrypt.hash(password, 10);

            const managerData = {
                username,
                firstname,
                lastname,
                profile_image: req.files['profile_image'][0].originalname,
                sample_chart: req.files['sample_chart'][0].originalname,
                password: hashedPassword,
                confirm_password: hashedPassword,
                email,
                mobile_no,
                status,
                linkedin
            };

            try {
                await SignalManagerModel.addSignalManager(managerData);
                res.status(201).json({ message: 'Signal Manager added successfully' });
            } catch (error) {
                console.error('Error adding signal manager:', error);
                res.status(500).json({ message: 'Failed to add signal manager' });
            }
        });
    },

editSignalManager: async (req, res) => {
        const { id } = req.params;

        multiUpload(req, res, async (err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).json({ message: 'Error uploading files: ' + err.message });
            }

            const {
                firstname,
                lastname,
                email,
                mobile_no,
                password,
                confirm_password,
                status,
                linkedin
            } = req.body;

            if (!firstname || !lastname || !email || !mobile_no || !status || !linkedin) {
                return res.status(400).json({ message: 'All fields are required except files.' });
            }

            if (password && password !== confirm_password) {
                return res.status(400).json({ message: 'Passwords do not match.' });
            }

            try {
                const existingManager = await SignalManagerModel.getSignalManagerById(id);
                if (!existingManager) {
                    return res.status(404).json({ message: 'Signal Manager not found.' });
                }

                const username = `${firstname} ${lastname}`.trim();
                const hashedPassword = password ? await bcrypt.hash(password, 10) : existingManager.password;

                const updatedData = {
                    username,
                    firstname,
                    lastname,
                    profile_image: req.files['profile_image']
                        ? req.files['profile_image'][0].originalname
                        : existingManager.profile_image,
                    sample_chart: req.files['sample_chart']
                        ? req.files['sample_chart'][0].originalname
                        : existingManager.sample_chart,
                    password: hashedPassword,
                    confirm_password: hashedPassword,
                    email,
                    mobile_no,
                    status,
                    linkedin
                };

                await SignalManagerModel.updateSignalManagerById(id, updatedData);
                res.status(200).json({ message: 'Signal Manager updated successfully' });
            } catch (error) {
                console.error('Error updating signal manager:', error);
                res.status(500).json({ message: 'Failed to update signal manager' });
            }
        });
    },

deleteSignalManager: async (req, res) => {
        const { id } = req.params;
        try {
            await SignalManagerModel.deleteSignalManagerById(id);
            res.status(200).json({ message: 'Signal Manager deleted successfully' });
        } catch (error) {
            console.error('Error deleting signal manager:', error);
            res.status(500).json({ message: 'Failed to delete signal manager' });
        }
    }
};

module.exports = signalManagerController;
