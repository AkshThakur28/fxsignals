const express = require('express');
const router = express.Router();
const pricingController = require('../../controllers/admin/pricingController');

router.get('/pricing_view', pricingController.fetchAllPricing);

router.post('/add_pricing', pricingController.pricingAdd);

router.put('/pricing_edit/:id', pricingController.pricingEdit); 

router.delete('/pricing_delete/:id', pricingController.deletePricing);

module.exports = router;