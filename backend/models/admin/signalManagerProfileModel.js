const db = require('../../config/db');

const SignalManagerProfileModel = {
getAllSignalManagerProfile: async () => {
    try {
      const [signalManagerProfile] = await db.promise().query('SELECT * FROM signal_manager_profile');
    return signalManagerProfile;
    } catch (error) {
    throw new Error('Error fetching signal manager profile: ' + error.message);
    }
},

addSignalManagerProfile: async (signalManagerProfileData) => {
    try {
    const { signal_manager_id, username, signal_manager_profile_image, email, mobile_no, linkedin, facebook, instagram, twitter, about } = signalManagerProfileData;

    const result = await db.promise().query(
        `INSERT INTO signal_manager_profile (signal_manager_id, username, signal_manager_profile_image, email, mobile_no, linkedin, facebook, instagram, twitter, about)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [signal_manager_id, username, signal_manager_profile_image, email, mobile_no, linkedin, facebook, instagram, twitter, about]
    );

    return result;
    } catch (error) {
    throw new Error('Error inserting signal manager profile: ' + error.message);
    }
},

getSignalManagerProfileById: async (id) => {
    try {
      const [result] = await db.promise().query('SELECT * FROM signal_manager_profile WHERE id = ?', [id]);
    return result.length > 0 ? result[0] : null;
    } catch (error) {
    throw new Error('Error fetching signal manager profile by ID: ' + error.message);
    }
},


updateSignalManagerProfileById: async (id, updatedData) => {
    const { signal_manager_id, username, signal_manager_profile_image, email, mobile_no, linkedin, facebook, instagram, twitter, about } = updatedData;

    try {
    await db.promise().query(
        `UPDATE signal_manager_profile SET signal_manager_id = ?, username = ?, signal_manager_profile_image = ?, email = ?, mobile_no = ?, linkedin = ?, facebook = ?, instagram = ?, twitter = ?, about = ? WHERE id = ?`,
        [signal_manager_id, username, signal_manager_profile_image, email, mobile_no, linkedin, facebook, instagram, twitter, about, id]
    );
    } catch (error) {
    throw new Error('Error updating signal manager profile by ID: ' + error.message);
    }
},  

deleteSignalManagerProfileById: async (id) => {
    try {
    await db.promise().query('DELETE FROM signal_manager_profile WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting signal manager profile by ID: ' + error.message);
    }
},

}

module.exports = SignalManagerProfileModel;
