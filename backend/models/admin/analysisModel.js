const db = require('../../config/db');

const AnalysisModel = {
    getAllAnalysis: async () => {
    try {
      const [analysis] = await db.promise().query('SELECT * FROM analysis');
    return analysis;
    } catch (error) {
    throw new Error('Error fetching analysis data: ' + error.message);
    }
},

addAnalysis: async (analysisData) => {
    try {
    const { date, heading, description, author, analysis_image, type, created_by } = analysisData;

    const result = await db.promise().query(
        `INSERT INTO analysis ( \`date\`, heading, description, author, analysis_image, type, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [date, heading, description, author, analysis_image, type, created_by]
    );

    return result;
    } catch (error) {
    throw new Error('Error inserting analysis data: ' + error.message);
    }
},

getAnalysisById: async (id) => {
    try {
      const [result] = await db.promise().query('SELECT * FROM analysis WHERE id = ?', [id]);
    return result.length > 0 ? result[0] : null;
    } catch (error) {
    throw new Error('Error fetching analysis data by ID: ' + error.message);
    }
},


updateAnalysisById: async (id, updatedData) => {
    const { date, heading, description, author, analysis_image, type, created_by } = updatedData;

    try {
        await db.promise().query(
            `UPDATE analysis SET \`date\` = ?, heading = ?, description = ?, author = ?, analysis_image = ?, type = ?, created_by = ? WHERE id = ?`,
            [date, heading, description, author, analysis_image, type, created_by, id]
        );        
    } catch (error) {
    throw new Error('Error updating analysis data by ID: ' + error.message);
    }
},  

deleteAnalysisById: async (id) => {
    try {
    await db.promise().query('DELETE FROM analysis WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting analysis data by ID: ' + error.message);
    }
},

}

module.exports = AnalysisModel;
