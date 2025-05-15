const express = require('express');
const router = express.Router();
const marketPrimerController = require('../../controllers/admin/marketPrimerController');

router.get('/market_primer_view', marketPrimerController.fetchAllMarketPrimers);

router.post('/add_market_primer', marketPrimerController.addMarketPrimer);

router.put('/market_primer_edit/:id', marketPrimerController.editMarketPrimer);

router.delete('/market_primer_delete/:id', marketPrimerController.deleteMarketPrimer);

module.exports = router;
