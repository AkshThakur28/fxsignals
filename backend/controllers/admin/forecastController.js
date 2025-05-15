const ForecastModel = require('../../models/admin/forecastModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'uploads/');  
},
filename: (req, file, cb) => {

    cb(null, file.originalname);  
}
});

const upload = multer({ storage: storage });

const forecastController = {
    fetchAllForecasts: async (req, res) => {
    try {
    const forecast = await ForecastModel.getAllForecasts();
    res.status(200).json({ message: 'Forecast fetched successfully', forecast });
    } catch (error) {
    console.error('Error fetching forecast :', error);
    res.status(500).json({ message: 'Failed to fetch forecast' });
    }
},

addForecast: async (req, res) => {
    upload.single('forecast_image')(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
    }

    const { forecast_name, description, forecast_type } = req.body;

    if (!forecast_name || !description || !forecast_type || !req.file) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const forecastData = {
        forecast_name,
        description,
        forecast_image: req.file.originalname,  
        forecast_type
    };

    try {
        await ForecastModel.addForecast(forecastData);
        res.status(201).json({ message: 'Forecast added successfully' });
    } catch (error) {
        console.error('Error adding forecast:', error);
        res.status(500).json({ message: 'Failed to add forecast' });
    }
    });
},

editForecast: async (req, res) => {
    const { id } = req.params;
    upload.single('forecast_image')(req, res, async (err) => {
    if (err) {
        return res.status(500).json({ message: 'Error uploading image' });
    }

    const { forecast_name, description, forecast_type } = req.body;

    if (!forecast_name || !description || !forecast_type) {
        return res.status(400).json({ message: 'All fields are required except image.' });
    }

    try {
        const existingForecast = await ForecastModel.getForecastById(id);
        if (!existingForecast) {
        return res.status(404).json({ message: 'Forecast not found.' });
        }

        const updatedData = {
        forecast_name,
        description,
        forecast_image: req.file ? req.file.originalname : existingForecast.forecast_image, 
        forecast_type
        };

        await ForecastModel.updateForecastById(id, updatedData);
        res.status(200).json({ message: 'Forecast updated successfully.' });
    } catch (error) {
        console.error('Error updating forecast:', error);
        res.status(500).json({ message: 'Failed to update forecast' });
    }
    });
},

deleteForecast: async (req, res) => {
    const { id } = req.params; 
    try {
    await ForecastModel.deleteForecastById(id);
    res.status(200).json({ message: 'Forecast deleted successfully' });
    } catch (error) {
    console.error('Error deleting forecast:', error);
    res.status(500).json({ message: 'Failed to delete forecast' });
    }
},

};

module.exports = forecastController;
