const express = require('express');
const router = express.Router();
const authorRoleController = require('../../controllers/admin/authorRoleController');

router.get('/author_role_view', authorRoleController.fetchAllAuthorRole);

router.post('/add_author_role', authorRoleController.authorRoleAdd);

router.put('/author_role_edit/:id', authorRoleController.authorRoleEdit); 

router.delete('/author_role_delete/:id', authorRoleController.deleteAuthorRole);

module.exports = router;


