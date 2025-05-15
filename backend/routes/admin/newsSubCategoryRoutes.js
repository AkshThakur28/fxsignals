const express = require('express');
const router = express.Router();
const newsSubCategoryController = require('../../controllers/admin/newsSubCategoryController');

router.get('/news_sub_category_view', newsSubCategoryController.fetchAllNewsSubCategory);

router.post('/add_news_sub_category', newsSubCategoryController.newsSubCategoryAdd);

router.put('/news_sub_category_edit/:id', newsSubCategoryController.newsSubCategoryEdit); 

router.delete('/news_sub_category_delete/:id', newsSubCategoryController.deleteNewsSubCategory);

module.exports = router;


