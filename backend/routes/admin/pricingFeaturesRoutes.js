const express = require('express');
const router = express.Router();
const pricingFeaturesController = require('../../controllers/admin/pricingFeaturesController');

router.get('/pricing_features_view', pricingFeaturesController.fetchAllPricingFeatures);

router.post('/add_pricing_features', pricingFeaturesController.pricingFeaturesAdd);

router.put('/pricing_features_edit/:id', pricingFeaturesController.pricingFeaturesEdit); 

router.delete('/pricing_features_delete/:id', pricingFeaturesController.deletePricingFeatures);

module.exports = router;