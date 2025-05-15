const NewsModel = require('../../models/admin/newsModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/news');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const newsController = {
    fetchAllNews: async (req, res) => {
        try {
            const news = await NewsModel.getAllNews();
            res.status(200).json({ message: 'News fetched successfully', news });
        } catch (error) {
            console.error('Error fetching news:', error);
            res.status(500).json({ message: 'Failed to fetch news' });
        }
    },


    fetchNewsById: async (req, res) => {
        const { id } = req.params;
        try {
            const news = await NewsModel.getNewsById(id);
            if (!news) {
                return res.status(404).json({ message: 'News not found' });
            }
            res.status(200).json({ message: 'News fetched successfully', news });
        } catch (error) {
            console.error('Error fetching news by ID:', error);
            res.status(500).json({ message: 'Failed to fetch news by ID' });
        }
    },

    addNews: async (req, res) => {
        upload.single('news_image')(req, res, async (err) => {
            if (err instanceof multer.MulterError || err) {
                return res.status(400).json({ message: err.message || 'Error uploading image' });
            }

            const { title, publish_date, news_desc, category, sub_category, author, news_type, news_package, created_by } = req.body;

            if (!title || !req.file || !publish_date || !news_desc || !category || !sub_category || !author || !news_type || !news_package || !created_by) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const newsData = {
                title,
                news_image: req.file.originalname,
                publish_date,
                news_desc,
                category,
                sub_category,
                author,
                news_type,
                news_package,
                created_by
            };

            try {
                await NewsModel.addNews(newsData);
                res.status(201).json({ message: 'News added successfully' });
            } catch (error) {
                console.error('Error adding news:', error);
                res.status(500).json({ message: 'Failed to add news' });
            }
        });
    },

    deleteNews: async (req, res) => {
        const { id } = req.params;
        try {
            await NewsModel.deleteNewsById(id);
            res.status(200).json({ message: 'News deleted successfully' });
        } catch (error) {
            console.error('Error deleting news:', error);
            res.status(500).json({ message: 'Failed to delete news' });
        }
    },

    editNews: async (req, res) => {
        upload.single('news_image')(req, res, async (err) => {
            if (err instanceof multer.MulterError || err) {
                return res.status(400).json({ message: err.message || 'Error uploading image' });
            }

            const {
                id,
                title,
                publish_date,
                news_desc,
                category,
                sub_category,
                author,
                news_type,
                news_package,
                created_by
            } = req.body;

            if (!title || !publish_date || !news_desc || !category || !sub_category || !author || !news_type || !news_package || !created_by) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const updatedData = {
                id,
                title,
                news_image: req.file ? req.file.originalname : null,
                publish_date,
                news_desc,
                category,
                sub_category,
                author,
                news_type,
                news_package,
                created_by
            };

            try {
                await NewsModel.updateNewsById(updatedData);
                res.status(200).json({ message: 'News updated successfully' });
            } catch (error) {
                console.error('Error updating news:', error);
                res.status(500).json({ message: 'Failed to update news' });
            }
        });
    },

    fetchNewsPackages: async (req, res) => {
        try {
            const packages = await NewsModel.getAllNewsPackages();
            res.status(200).json(packages);
        } catch (error) {
            console.error('Error fetching packages:', error);
            res.status(500).json({ message: 'Failed to fetch packages' });
        }
    },

    fetchCategories: async (req, res) => {
        try {
            const categories = await NewsModel.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ message: 'Failed to fetch categories' });
        }
    },

    fetchSubCategories: async (req, res) => {
        try {
            const subs = await NewsModel.getAllSubCategories();
            res.status(200).json(subs);
        } catch (error) {
            console.error('Error fetching sub-categories:', error);
            res.status(500).json({ message: 'Failed to fetch sub-categories' });
        }
    },

    fetchNewsTypes: async (req, res) => {
        try {
            const types = await NewsModel.getAllNewsTypes();
            res.status(200).json(types);
        } catch (error) {
            console.error('Error fetching news types:', error);
            res.status(500).json({ message: 'Failed to fetch news types' });
        }
    }
};

module.exports = newsController;
