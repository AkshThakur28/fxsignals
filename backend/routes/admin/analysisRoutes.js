const express = require('express');
const router = express.Router();
const analysisController = require('../../controllers/admin/analysisController');

router.get('/analysis_view', analysisController.fetchAllAnalysis);

router.post('/add_analysis', analysisController.addAnalysis);

router.put('/analysis_edit/:id', analysisController.editAnalysis);

router.delete('/analysis_delete/:id', analysisController.deleteAnalysis);

module.exports = router;
