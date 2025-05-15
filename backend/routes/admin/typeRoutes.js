const express = require('express');
const router = express.Router();
const typeController = require('../../controllers/admin/typeController');

router.get('/type_view', typeController.fetchAllType);

router.post('/add_type', typeController.typeAdd);

router.put('/type_edit/:id', typeController.typeEdit); 

router.delete('/type_delete/:id', typeController.deleteType);

module.exports = router;


