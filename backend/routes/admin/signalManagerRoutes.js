const express = require('express');
const router = express.Router();
const signalManagerController = require('../../controllers/admin/signalManagerController');

router.get('/signal_manager_view', signalManagerController.fetchAllSignalManagers);

router.post('/add_signal_manager', signalManagerController.addSignalManager);

router.put('/signal_manager_edit/:id', signalManagerController.editSignalManager); 

router.delete('/signal_manager_delete/:id', signalManagerController.deleteSignalManager);

module.exports = router;


