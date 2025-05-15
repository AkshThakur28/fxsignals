const express = require('express');
const router = express.Router();
const tradingSignalsController = require('../../controllers/admin/tradingSignalsController');

router.get('/trading_signals_view', tradingSignalsController.fetchAllTradingSignals);

router.post('/add_trading_signals', tradingSignalsController.tradingSignalsAdd);

router.put('/trading_signals_edit/:id', tradingSignalsController.tradingSignalsEdit); 

router.delete('/trading_signals_delete/:id', tradingSignalsController.deleteTradingSignals);

module.exports = router;


