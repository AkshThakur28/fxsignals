const db = require("../../config/db");

const ImageModel = {
  getAllImages: async () => {
    try {
      const [images] = await db.promise().query("SELECT * FROM upload_image ORDER BY id DESC");
      return images;
    } catch (error) {
      throw new Error("Error fetching images: " + error.message);
    }
  },

  saveImage: async (imageName) => {
    try {
      await db
        .promise()
        .query("INSERT INTO upload_image (images) VALUES (?)", [imageName]);
    } catch (error) {
      throw new Error("Error saving image: " + error.message);
    }
  },

  deleteImageById: async (id) => {
    try {
      await db.promise().query("DELETE FROM upload_image WHERE id = ?", [id]);
    } catch (error) {
      throw new Error("Error deleting image: " + error.message);
    }
  },
};

module.exports = ImageModel;
