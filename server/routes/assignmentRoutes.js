// routes/assignments.js
const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// Create an assignment
router.post('/assignments', async (req, res) => {
    const { userId, assetId, assignmentDate } = req.body;
    try {
        const newAssignment = new Assignment({ userId, assetId, assignmentDate});
        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Get a specific assignment by ID
router.get("/assignments/:id", async (req, res) => {
  const assetId = req.params.id;
  try {
    const details = await Asset.findOne({ assetId: assetId });
    if (!details) {
      return res.status(404).send("Asset not found");
    }
    res.json(details);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get all assignments
router.get('/assignments', async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an assignment
router.put('/:id', async (req, res) => {
    const { userId, assetId, assignmentDate } = req.body;
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

        assignment.userId = userId || assignment.userId;
        assignment.assetId = assetId || assignment.assetId;
        assignment.assignmentDate = assignmentDate || assignment.assignmentDate;
        

        const updatedAssignment = await assignment.save();
        res.json(updatedAssignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an assignment
router.delete('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

        await assignment.remove();
        res.json({ message: 'Assignment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Fetch assigned assets for the logged-in user
// router.get('/assigned-assets', verifyToken, async (req, res) => {
//     try {
//         const userId = req.user.id; // Assuming the user ID is stored in req.user.id by the auth middleware
//         const assignments = await Assignment.find({ userId });
//         res.json(assignments);
//     } catch (error) {
//         console.error('Error fetching assigned assets:', error);
//         res.status(500).json({ error: 'Error fetching assigned assets' });
//     }
// });

module.exports = router;