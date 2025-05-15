const AuthorProfileModel = require('../../models/admin/authorProfileModel');
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

const authorProfileController = {
fetchAllAuthorProfile: async (req, res) => {
    try {
    const authorProfile = await AuthorProfileModel.getAllAuthorProfile();
    res.status(200).json({ message: 'Author profile fetched successfully', authorProfile });
    } catch (error) {
    console.error('Error fetching author profile:', error);
    res.status(500).json({ message: 'Failed to fetch author profile' });
    }
},

addAuthorProfile: async (req, res) => {
    upload.single('author_profile_image')(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
    }

    const { author_id, linkedin, facebook, twitter, instagram, about, username, email, mobile_no } = req.body;

    if (!author_id || !linkedin || !facebook || !req.file || !twitter || !instagram || !about || !username || !email || !mobile_no) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const authorProfileData = {
        author_id,
        author_profile_image: req.file.originalname,
        linkedin,
        facebook,
        twitter,
        instagram,
        about,
        username,
        email,
        mobile_no
    };

    try {
        await AuthorProfileModel.addAuthorProfile(authorProfileData);
        res.status(201).json({ message: 'Author profile added successfully' });
    } catch (error) {
        console.error('Error adding author profile:', error);
        res.status(500).json({ message: 'Failed to add author profile' });
    }
    });
},

editAuthorProfile: async (req, res) => {
    const { id } = req.params;
    upload.single('author_profile_image')(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
    }

    const { author_id, linkedin, facebook, twitter, instagram, about, username, email, mobile_no } = req.body;

    if (!author_id || !linkedin || !facebook || !req.file || !twitter || !instagram || !about || !username || !email || !mobile_no) {
        return res.status(400).json({ message: 'All fields are required except image.' });
    }

    try {
        const existingAuthorProfile = await AuthorProfileModel.getAuthorProfileById(id);
        if (!existingAuthorProfile) {
        return res.status(404).json({ message: 'Author profile not found.' });
        }

        const updatedData = {
        author_id,
        author_profile_image: req.file ? req.file.originalname : existingAuthorProfile.author_profile_image, 
        linkedin,
        facebook,
        twitter,
        instagram,
        about,
        username,
        email,
        mobile_no
        };

        await AuthorProfileModel.updateAuthorProfileById(id, updatedData);
        res.status(200).json({ message: 'Author profile updated successfully.' });
    } catch (error) {
        console.error('Error updating author profile:', error);
        res.status(500).json({ message: 'Failed to update author profile' });
    }
    });
},

deleteAuthorProfile: async (req, res) => {
    const { id } = req.params; 
    try {
    await AuthorProfileModel.deleteAuthorProfileById(id);
    res.status(200).json({ message: 'Author profile deleted successfully' });
    } catch (error) {
    console.error('Error deleting author profile:', error);
    res.status(500).json({ message: 'Failed to delete author profile' });
    }
},

};

module.exports = authorProfileController;
