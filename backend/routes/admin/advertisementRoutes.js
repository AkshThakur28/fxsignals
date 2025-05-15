const express = require('express');
const router = express.Router();
const advertisementController = require('../../controllers/admin/advertisementController');

router.get('/advertisement_view', advertisementController.fetchAllAdvertisement);

router.post('/add_advertisement', advertisementController.advertisementAdd);

router.put('/advertisement_edit/:id', advertisementController.advertisementEdit); 

router.delete('/advertisement_delete/:id', advertisementController.deleteAdvertisement);

module.exports = router;