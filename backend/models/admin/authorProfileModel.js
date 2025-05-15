const db = require('../../config/db');

const AuthorProfileModel = {
    getAllAuthorProfile: async () => {
    try {
      const [authorProfile] = await db.promise().query('SELECT * FROM author_profile');
    return authorProfile;
    } catch (error) {
    throw new Error('Error fetching author profile: ' + error.message);
    }
},

addAuthorProfile: async (authorProfileData) => {
    try {
    const { author_id, author_profile_image, linkedin, facebook, twitter, instagram, about, username, email, mobile_no } = authorProfileData;

    const result = await db.promise().query(
        `INSERT INTO author_profile (author_id, author_profile_image, linkedin, facebook, twitter, instagram, about, username, email, mobile_no)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [author_id, author_profile_image, linkedin, facebook, twitter, instagram, about, username, email, mobile_no]
    );

    return result;
    } catch (error) {
    throw new Error('Error inserting author profile: ' + error.message);
    }
},

getAuthorProfileById: async (id) => {
    try {
      const [result] = await db.promise().query('SELECT * FROM author_profile WHERE id = ?', [id]);
    return result.length > 0 ? result[0] : null;
    } catch (error) {
    throw new Error('Error fetching author profile by ID: ' + error.message);
    }
},


updateAuthorProfileById: async (id, updatedData) => {
    const { author_id, author_profile_image, linkedin, facebook, twitter, instagram, about, username, email, mobile_no } = updatedData;

    try {
    await db.promise().query(
        `UPDATE author_profile SET author_id = ?, author_profile_image = ?, linkedin = ?, facebook = ?, twitter = ?, instagram = ?, about = ?, username = ?, email = ?, mobile_no = ? WHERE id = ?`,
        [author_id, author_profile_image, linkedin, facebook, twitter, instagram, about, username, email, mobile_no, id]
    );
    } catch (error) {
    throw new Error('Error updating author profile by ID: ' + error.message);
    }
},  

deleteAuthorProfileById: async (id) => {
    try {
    await db.promise().query('DELETE FROM author_profile WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting author profile by ID: ' + error.message);
    }
},

}

module.exports = AuthorProfileModel;
