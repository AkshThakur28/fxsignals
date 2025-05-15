const express = require('express');
const router = express.Router();
const authorPricingController = require('../../controllers/admin/authorPricingController');

router.get('/author_pricing_view', authorPricingController.fetchAllAuthorPricing);

router.post('/add_author_pricing', authorPricingController.authorPricingAdd);

router.put('/author_pricing_edit/:id', authorPricingController.authorPricingEdit); 

router.delete('/author_pricing_delete/:id', authorPricingController.deleteAuthorPricing);

module.exports = router;


