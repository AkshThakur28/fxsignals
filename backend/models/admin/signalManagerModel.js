const db = require('../../config/db');

const SignalManagerModel = {
getAllSignalManagers: async () => {
        try {
            const [managers] = await db.promise().query('SELECT * FROM signal_manager');
            return managers;
        } catch (error) {
            throw new Error('Error fetching signal managers: ' + error.message);
        }
    },

addSignalManager: async (managerData) => {
        try {
            const {
                username,
                firstname,
                lastname,
                profile_image,
                sample_chart,
                password,
                confirm_password,
                email,
                mobile_no,
                status,
                linkedin
            } = managerData;

            await db.promise().query(
                `INSERT INTO signal_manager 
                (username, firstname, lastname, profile_image, sample_chart, password, confirm_password, email, mobile_no, status, linkedin)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [username, firstname, lastname, profile_image, sample_chart, password, confirm_password, email, mobile_no, status, linkedin]
            );
        } catch (error) {
            throw new Error('Error inserting signal manager: ' + error.message);
        }
    },

getSignalManagerById: async (id) => {
        try {
            const [result] = await db.promise().query('SELECT * FROM signal_manager WHERE id = ?', [id]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            throw new Error('Error fetching signal manager by ID: ' + error.message);
        }
    },

updateSignalManagerById: async (id, updatedData) => {
        const {
            username,
            firstname,
            lastname,
            profile_image,
            sample_chart,
            password,
            email,
            mobile_no,
            status,
            linkedin
        } = updatedData;

        try {
            await db.promise().query(
                `UPDATE signal_manager 
                SET username = ?, firstname = ?, lastname = ?, profile_image = ?, sample_chart = ?, password = ?, email = ?, mobile_no = ?, status = ?, linkedin = ?
                WHERE id = ?`,
                [username, firstname, lastname, profile_image, sample_chart, password, email, mobile_no, status, linkedin, id]
            );
        } catch (error) {
            throw new Error('Error updating signal manager: ' + error.message);
        }
    },

deleteSignalManagerById: async (id) => {
        try {
            await db.promise().query('DELETE FROM signal_manager WHERE id = ?', [id]);
        } catch (error) {
            throw new Error('Error deleting signal manager: ' + error.message);
        }
    }
};

module.exports = SignalManagerModel;
