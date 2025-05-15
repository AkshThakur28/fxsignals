const ImageModel = require("../../models/admin/imageModel");

const imageController = {
  addImage: async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const imageName = req.file.originalname;

    try {
      await ImageModel.saveImage(imageName);
      res.status(201).json({ message: "Image added successfully", imageName });
    } catch (error) {
      console.error("Error adding image:", error);
      res.status(500).json({ message: "Failed to add image" });
    }
  },

  upload_image_view: async (req, res) => {
    try {
      const images = await ImageModel.getAllImages();
      res.status(200).json({ message: "Images fetched successfully", images });
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ message: "Failed to fetch images" });
    }
  },

  deleteImage: async (req, res) => {
    const { id } = req.params; 

    if (!id) {
        return res.status(400).json({ message: "Image ID is required" });
    }

    try {
        await ImageModel.deleteImageById(id);
        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: "Failed to delete image" });
    }
}

};

module.exports = imageController;
