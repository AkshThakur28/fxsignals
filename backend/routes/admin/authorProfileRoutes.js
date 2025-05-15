const express = require('express');
const router = express.Router();
const authorProfileController = require('../../controllers/admin/authorProfileController');

router.get('/author_profile_view', authorProfileController.fetchAllAuthorProfile);

router.post('/add_author_profile', authorProfileController.addAuthorProfile);

router.put('/author_profile_edit/:id', authorProfileController.editAuthorProfile);

router.delete('/author_profile_delete/:id', authorProfileController.deleteAuthorProfile);

module.exports = router;
