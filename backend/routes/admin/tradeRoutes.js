const express = require('express');
const router = express.Router();
const tradeController = require('../../controllers/admin/tradeController');

router.get('/trade_view', tradeController.fetchAllTrade);

router.post('/add_trade', tradeController.addTrade);

router.put('/trade_edit/:id', tradeController.editTrade);

router.delete('/trade_delete/:id', tradeController.deleteTrade);

module.exports = router;
