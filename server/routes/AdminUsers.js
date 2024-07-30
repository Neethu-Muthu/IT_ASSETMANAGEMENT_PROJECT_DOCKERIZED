const express = require("express");
const router = express.Router();
const Asset = require("../models/AdminUser");
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");
const AdminUser = require("../models/AdminUser");

router.get("/users", verifyToken, async (req, res) => {
  try {
    const details = await AdminUser.find({});
    res.json(details);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const details = await AdminUser.findOne({ userId: userId });
    if (!details) {
      return res.status(404).send("User not found");
    }
    res.json(details);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.post("/users", async (req, res) => {
  try {
    const data = req.body;
    const result = await AdminUser.create(data);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
});

// router.post('/assets/maintenance', async (req, res) => {
//     const { assetId, assetName, location, warranty, status } = req.body;
//     try {
//         const newAsset = new Asset({
//             assetId,
//             assetName,
//             location,
//             warranty,
//             status: status || 'Repair', // Default status to 'Repair'
//         });
//         await newAsset.save();
//         res.status(201).send('Asset added for maintenance successfully');
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// });


router.put("/users/:id", async (req, res) => {
  const data = req.body;
  const userId = req.params.id;
  console.log(userId);
  console.log(data);
  try {
    const result = await AdminUser.findOneAndUpdate(
      { userId: userId },
      data,
      { new: true, runValidators: true }
    );
    if (!result) {
      return res.status(404).send("user not found");
    }
    res.json(result); // Return the updated asset
  } catch (error) {
    res.status(500).send("Server error");
  }
});


router.delete("/users/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await AdminUser.findOneAndDelete({ userId: userId });
    if (!result) {
      return res.status(404).send("Asset not found");
    }
    res.send("user deleted successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
