const AuthorRoleModel = require('../../models/admin/authorRoleModel');

const authorRoleController = {
fetchAllAuthorRole: async (req, res) => {
        try {
        const authorRole = await AuthorRoleModel.getAllAuthorRole();
        res.status(200).json({ message: 'Author role fetched successfully', authorRole });
        } catch (error) {
        console.error('Error fetching author role:', error);
        res.status(500).json({ message: 'Failed to fetch author role' });
        }
    },

authorRoleAdd: async (req, res) => {
        const { author_role } = req.body;
    
        if (!author_role) {
        return res.status(400).json({ message: 'All fields are required.' });
        }

        const authorRoleData = {
            author_role
        };
        try {
            await AuthorRoleModel.addAuthorRole(authorRoleData);
            res.status(201).json({ message: 'Author role added successfully' });
        } catch (error) {
            console.error('Error adding author role:', error);
            res.status(500).json({ message: 'Failed to add author role' });
        }
    },

authorRoleEdit: async (req, res) => {
        const { id } = req.params; 
        const { author_role } = req.body;
        if (!author_role) {
        return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const updatedData = {
            author_role
        };

        try {
            await AuthorRoleModel.updateAuthorRoleById(id, updatedData);
            res.status(200).json({ message: 'Author role updated successfully' });
        } catch (error) {
            console.error('Error updating author role:', error);
            res.status(500).json({ message: 'Failed to update author role' });
        }
    },

deleteAuthorRole: async (req, res) => {
        const { id } = req.params; 
        try {
        await AuthorRoleModel.deleteAuthorRoleById(id);
        res.status(200).json({ message: 'Author role deleted successfully' });
        } catch (error) {
        console.error('Error deleting author role:', error);
        res.status(500).json({ message: 'Failed to delete author role' });
        }
    },
}

module.exports = authorRoleController;