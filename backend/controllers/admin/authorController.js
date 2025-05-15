const AuthorModel = require('../../models/admin/authorModel');
const multer = require('multer');
const bcrypt = require('bcrypt');
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
const multiUpload = upload.fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'sample_article', maxCount: 1 }
]);

const authorController = {
fetchAllAuthor: async (req, res) => {
        try {
            const author = await AuthorModel.getAllAuthor();
            res.status(200).json({ message: 'Author fetched successfully', author });
        } catch (error) {
            console.error('Error fetching author:', error);
            res.status(500).json({ message: 'Failed to fetch author' });
        }
    },

addAuthor: async (req, res) => {
        multiUpload(req, res, async (err) => {
            if (err) {
                console.error('Multer error:', err);
                return res.status(500).json({ message: 'Error uploading files: ' + err.message });
            }

            const { firstname, lastname, mobile_no, email, password, confirm_password, role_name, status, linkedin } = req.body;

            if (
                !firstname || !lastname || !req.files['profile_image'] || !req.files['sample_article'] || 
                !mobile_no || !email || !password || !confirm_password || !role_name || !status || !linkedin
            ) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            if (password !== confirm_password) {
                return res.status(400).json({ message: 'Passwords do not match.' });
            }

            const username = `${firstname} ${lastname}`.trim();
            const hashedPassword = await bcrypt.hash(password, 10);

            const authorData = {
                username,
                firstname,
                lastname,
                mobile_no,
                email,
                hashedPassword,
                profile_image: req.files['profile_image'][0].originalname,
                sample_article: req.files['sample_article'][0].originalname,
                role_name,
                status,
                linkedin
            };

            try {
                await AuthorModel.addAuthor(authorData);
                res.status(201).json({ message: 'Author added successfully' });
            } catch (error) {
                console.error('Error adding author:', error);
                res.status(500).json({ message: 'Failed to add author' });
            }
        });
    },

editAuthor: async (req, res) => {
        const { id } = req.params;
    
        multiUpload(req, res, async (err) => {
            if (err) {
                console.error('Multer error:', err);
                if (err instanceof multer.MulterError) {
                    return res.status(400).json({ message: 'Multer error: ' + err.message });
                }
                return res.status(500).json({ message: 'Error uploading files.' });
            }
    
            const { firstname, lastname, mobile_no, email, password, confirm_password, role_name, status, linkedin } = req.body;
    
            if (!firstname || !lastname || !mobile_no || !email || !role_name || !status || !linkedin) {
                return res.status(400).json({ message: 'All fields are required except files.' });
            }
    
            if (password && password !== confirm_password) {
                return res.status(400).json({ message: 'Passwords do not match.' });
            }
    
            try {
                const existingAuthor = await AuthorModel.getAuthorById(id);
                if (!existingAuthor) {
                    return res.status(404).json({ message: 'Author not found.' });
                }
    
                const username = `${firstname} ${lastname}`.trim();
                const hashedPassword = password ? await bcrypt.hash(password, 10) : existingAuthor.password;
    
                const updatedData = {
                    username,
                    firstname,
                    lastname,
                    mobile_no,
                    email,
                    hashedPassword,
                    profile_image: req.files['profile_image']
                        ? req.files['profile_image'][0].originalname
                        : existingAuthor.profile_image,
                    sample_article: req.files['sample_article']
                        ? req.files['sample_article'][0].originalname
                        : existingAuthor.sample_article,
                    role_name,
                    status,
                    linkedin,
                };
    
                await AuthorModel.updateAuthorById(id, updatedData);
                res.status(200).json({ message: 'Author updated successfully.' });
            } catch (error) {
                console.error('Error updating author:', error);
                res.status(500).json({ message: 'Failed to update author.' });
            }
        });
    },
    
deleteAuthor: async (req, res) => {
        const { id } = req.params;
        try {
            await AuthorModel.deleteAuthorById(id);
            res.status(200).json({ message: 'Author deleted successfully' });
        } catch (error) {
            console.error('Error deleting author:', error);
            res.status(500).json({ message: 'Failed to delete author' });
        }
    }
};

module.exports = authorController;
