const express = require('express');
const router = express.Router();
const signalManagerProfileController = require('../../controllers/admin/signalManagerProfileController');

router.get('/signal_manager_profile_view', signalManagerProfileController.fetchAllSignalManagerProfile);

router.post('/add_signal_manager_profile', signalManagerProfileController.addSignalManagerProfile);

router.put('/signal_manager_profile_edit/:id', signalManagerProfileController.editSignalManagerProfile);

router.delete('/signal_manager_profile_delete/:id', signalManagerProfileController.deleteSignalManagerProfile);

module.exports = router;
