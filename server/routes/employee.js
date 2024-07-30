const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const userDB = require('../models/AdminUser');
const verifyToken = require('../middleware/authMiddleware');

// GET: Fetch assigned assets for a specific employee
router.get('/assigned-assets/employee/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`Fetching assigned assets for user ID: ${id}`);
        const assignedAssets = await Assignment.find({ userId: id });
        console.log(assignedAssets, "assignedAssets");
        res.status(200).json(assignedAssets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assigned assets', error });
    }
});



router.get('/getEmployees', verifyToken, async (req, res) => {
    try {
        const email = req.userEmail;
        console.log(email);
        const userDetails = await userDB.findOne({ email: email });
        console.log(userDetails, "userDetails");
        res.status(200).json(userDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user details', error });
    }
});

module.exports = router;
