const express = require('express');
const router = express.Router();
const newsTypeController = require('../../controllers/admin/newsTypeController');

router.get('/news_type_view', newsTypeController.fetchAllNewsType);

router.post('/add_news_type', newsTypeController.newsTypeAdd);

router.put('/news_type_edit/:id', newsTypeController.newsTypeEdit); 

router.delete('/news_type_delete/:id', newsTypeController.deleteNewsType);

module.exports = router;


