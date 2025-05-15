const express = require('express');
const router = express.Router();
const brokerDetailController = require('../../controllers/admin/brokerDetailController');

router.get('/broker_detail_view', brokerDetailController.fetchAllBrokerDetail);

router.post('/add_broker_detail', brokerDetailController.brokerDetailAdd);

router.put('/broker_detail_edit/:id', brokerDetailController.brokerDetailEdit); 

router.delete('/broker_detail_delete/:id', brokerDetailController.deleteBrokerDetail);

module.exports = router;


