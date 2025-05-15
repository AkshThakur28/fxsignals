const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/userController');

router.get('/users_view', userController.users_view);

router.post('/users_add', userController.users_add);

router.get('/users_roles', userController.users_roles);

router.get('/user/:id', userController.getUserById);

router.put('/users_edit', userController.users_edit); 

router.delete('/users_delete', userController.users_delete);


module.exports = router;
