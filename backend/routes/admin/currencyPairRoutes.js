const express = require('express');
const router = express.Router();
const currencyPairController = require('../../controllers/admin/currencyPairController');

router.get('/currency_pair_view', currencyPairController.fetchAllCurrencyPair);

router.post('/add_currency_pair', currencyPairController.currencyPairAdd);

router.put('/currency_pair_edit/:id', currencyPairController.currencyPairEdit); 

router.delete('/currency_pair_delete/:id', currencyPairController.deleteCurrencyPair);

module.exports = router;


