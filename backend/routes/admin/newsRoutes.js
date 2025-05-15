const express = require('express');
const router = express.Router();
const newsController = require('../../controllers/admin/newsController');

router.get('/news_view', newsController.fetchAllNews);

router.get('/news_detail/:id', newsController.fetchNewsById);

router.post('/add_news', newsController.addNews);

router.delete('/news_delete/:id', newsController.deleteNews);

router.put('/news_edit/:id', newsController.editNews);

router.get('/news-packages', newsController.fetchNewsPackages);

router.get('/categories', newsController.fetchCategories);

router.get('/sub-categories', newsController.fetchSubCategories);

router.get('/news-types', newsController.fetchNewsTypes);

module.exports = router;
