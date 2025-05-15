const db = require('../../config/db');

const AdvertisementModel = {
getAllAdvertisement: async () => {
    try {
      const [advertisements] = await db.promise().query('SELECT * FROM advertisement');
    return advertisements;
    } catch (error) {
    throw new Error('Error fetching advertisements: ' + error.message);
    }
},

addAdvertisement: async (data) => {
    const { page_name, image1, image1url, image2, image2url, image3, image3url, image4, image4url } = data;
    try {
    await db.promise().query(
        'INSERT INTO advertisement (page_name, image1, image1url, image2, image2url, image3, image3url, image4, image4url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [page_name, image1, image1url, image2, image2url, image3, image3url, image4, image4url]
    );
    } catch (error) {
    throw new Error('Error adding advertisement: ' + error.message);
    }
},

updateAdvertisementById: async (id, data) => {
    const { page_name, image1, image1url, image2, image2url, image3, image3url, image4, image4url } = data;
    try {
    await db.promise().query(
        'UPDATE advertisement SET page_name = ?, image1 = ?, image1url = ?, image2 = ?, image2url = ?, image3 = ?, image3url = ?, image4 = ?, image4url = ? WHERE id = ?',
        [page_name, image1, image1url, image2, image2url, image3, image3url, image4, image4url, id]
    );
    } catch (error) {
    throw new Error('Error updating advertisement: ' + error.message);
    }
},

deleteAdvertisementById: async (id) => {
    try {
    await db.promise().query('DELETE FROM advertisement WHERE id = ?', [id]);
    } catch (error) {
    throw new Error('Error deleting advertisement: ' + error.message);
    }
}
};

module.exports = AdvertisementModel;
