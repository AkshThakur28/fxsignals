const express = require('express');
const router = express.Router();
const brokerController = require('../../controllers/admin/brokerController');

router.get('/broker_view', brokerController.fetchAllBroker);

router.post('/add_broker', brokerController.addBroker);

router.put('/broker_edit/:id', brokerController.editBroker);

router.delete('/broker_delete/:id', brokerController.deleteBroker);

module.exports = router;
