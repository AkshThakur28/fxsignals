const express = require('express');
const router = express.Router();
const newsCategoryController = require('../../controllers/admin/newsCategoryController');

router.get('/news_category_view', newsCategoryController.fetchAllNewsCategory);

router.post('/add_news_category', newsCategoryController.newsCategoryAdd);

router.put('/news_category_edit/:id', newsCategoryController.newsCategoryEdit); 

router.delete('/news_category_delete/:id', newsCategoryController.deleteNewsCategory);

module.exports = router;


