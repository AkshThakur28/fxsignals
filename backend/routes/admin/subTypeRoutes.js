const express = require('express');
const router = express.Router();
const subTypeController = require('../../controllers/admin/subTypeController');

router.get('/sub_type_view', subTypeController.fetchAllSubType);

router.post('/add_sub_type', subTypeController.subTypeAdd);

router.put('/sub_type_edit/:id', subTypeController.subTypeEdit); 

router.delete('/sub_type_delete/:id', subTypeController.deleteSubType);

module.exports = router;


