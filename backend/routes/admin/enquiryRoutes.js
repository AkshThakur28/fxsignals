const express = require('express');
const router = express.Router();
const enquiryController = require('../../controllers/admin/enquiryController');

router.get('/enquiry_view', enquiryController.fetchAllEnquiry);

router.post('/add_enquiry', enquiryController.enquiryAdd);

router.put('/enquiry_edit/:id', enquiryController.enquiryEdit); 

router.delete('/enquiry_delete/:id', enquiryController.deleteEnquiry);

module.exports = router;


