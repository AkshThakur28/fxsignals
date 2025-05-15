const express = require('express');
const router = express.Router();
const authorController = require('../../controllers/admin/authorController');

router.get('/author_view', authorController.fetchAllAuthor);

router.post('/add_author', authorController.addAuthor);

router.put('/author_edit/:id', authorController.editAuthor);

router.delete('/author_delete/:id', authorController.deleteAuthor);

module.exports = router;
