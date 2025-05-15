const express = require('express');
const router = express.Router();
const authorPricingFeaturesController = require('../../controllers/admin/authorPricingFeaturesController');

router.get('/author_pricing_features_view', authorPricingFeaturesController.fetchAllAuthorPricingFeatures);

router.post('/add_author_pricing_features', authorPricingFeaturesController.authorPricingFeaturesAdd);

router.put('/author_pricing_features_edit/:id', authorPricingFeaturesController.authorPricingFeaturesEdit); 

router.delete('/author_pricing_features_delete/:id', authorPricingFeaturesController.deleteAuthorPricingFeatures);

module.exports = router;


