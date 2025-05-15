const express = require('express');
const router = express.Router();
const seoController = require('../../controllers/admin/seoController');

router.get('/seo_view', seoController.fetchAllSeo);

router.post('/add_seo', seoController.seoAdd);

router.put('/seo_edit/:id', seoController.seoEdit); 

router.delete('/seo_delete/:id', seoController.deleteSeo);

module.exports = router;


