const db = require('../../config/db');

const ForecastModel = {
getAllForecasts: async () => {
        try {
            const [forecasts] = await db.promise().query('SELECT * FROM forecast');
            return forecasts;
        } catch (error) {
            throw new Error('Error fetching forecasts: ' + error.message);
        }
    },

addForecast: async (forecastData) => {
        try {
            const { forecast_name, forecast_image, description, forecast_type } = forecastData;

            await db.promise().query(
                `INSERT INTO forecast (forecast_name, forecast_image, description, forecast_type)
                VALUES (?, ?, ?, ?)`,
                [forecast_name, forecast_image, description, forecast_type]
            );
        } catch (error) {
            throw new Error('Error inserting forecast: ' + error.message);
        }
    },

getForecastById: async (id) => {
        try {
            const [result] = await db.promise().query('SELECT * FROM forecast WHERE id = ?', [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw new Error('Error fetching forecast by ID: ' + error.message);
        }
    },

updateForecastById: async (id, updatedData) => {
        const { forecast_name, forecast_image, description, forecast_type } = updatedData;

        try {
            await db.promise().query(
                `UPDATE forecast 
                SET forecast_name = ?, forecast_image = ?, description = ?, forecast_type = ?
                WHERE id = ?`,
                [forecast_name, forecast_image, description, forecast_type, id]
            );
        } catch (error) {
            throw new Error('Error updating forecast: ' + error.message);
        }
    },

deleteForecastById: async (id) => {
        try {
            await db.promise().query('DELETE FROM forecast WHERE id = ?', [id]);
        } catch (error) {
            throw new Error('Error deleting forecast: ' + error.message);
        }
    }
};

module.exports = ForecastModel;
