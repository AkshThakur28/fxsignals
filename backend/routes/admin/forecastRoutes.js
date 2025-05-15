const express = require('express');
const router = express.Router();
const forecastController = require('../../controllers/admin/forecastController');

router.get('/forecast_view', forecastController.fetchAllForecasts);

router.post('/add_forecast', forecastController.addForecast);

router.put('/forecast_edit/:id', forecastController.editForecast);

router.delete('/forecast_delete/:id', forecastController.deleteForecast);

module.exports = router;
