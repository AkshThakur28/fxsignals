const express = require('express');
const router = express.Router();
const contactUsController = require('../../controllers/admin/contactUsController');

router.get('/contact_us_view', contactUsController.fetchAllContact);

router.post('/add_contact_us', contactUsController.contactUsAdd);

router.put('/contact_us_edit/:id', contactUsController.contactUsEdit); 

router.delete('/contact_us_delete/:id', contactUsController.deletecontactUs);

module.exports = router;