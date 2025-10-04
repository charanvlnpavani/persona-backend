var express = require("express");
var router = express.Router();
var User = require("../models/user-details");

/* POST users listing */
router.post("/user-details", async function (req, res, next) {
  try {
    const userDetails = new User(req.body);
    console.log("Received user details:", req.body);
    if (!req.body.name) {
      return res.status(400).json({ error: "Name field is required" });
    }
    if (!req.body.password) {
      return res.status(400).json({ error: "Password field is required" });
    }
    if (!req.body.email) {
      return res.status(400).json({ error: "Email field is required" });
    }
    if (!req.body.phone) {
      return res.status(400).json({ error: "Phone field is required" });
    }
    if (!req.body.place) {
      return res.status(400).json({ error: "Place field is required" });
    }
    if (!req.body.bloodGroup) {
      return res.status(400).json({ error: "BloodGroup field is required" });
    }
    if (!req.body.isActive) {
      return res.status(400).json({ error: "IsActive field is required" });
    }
    if (!req.body.experience) {
      return res.status(400).json({ error: "Experience field is required" });
    }
    if (!req.body.softwareRole || req.body.softwareRole.length === 0) {
      return res.status(400).json({ error: "SoftwareRole field is required" });
    }
    if (!req.body.skills || req.body.skills.length === 0) {
      return res.status(400).json({ error: "At least one skill is required" });
    }
    res.status(201).json({ message: "User Details Successfully Stored " });
    await userDetails.save();
  } catch (err) {
    console.error("Error in /user-details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/* GET users listing. */
router.get("/user-details", async function (req, res, next) {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error in /user-details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*  Patch users listing */
router.patch("/user-details/:id", async function (req, res, next) {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    if (!req.body.name) {
      return res.status(400).json({ error: "Name field is required" });
    }
    if (!req.body.password) {
      return res.status(400).json({ error: "Password field is required" });
    }
    if (!req.body.email) {
      return res.status(400).json({ error: "Email field is required" });
    }
    if (!req.body.phone) {
      return res.status(400).json({ error: "Phone field is required" });
    }
    if (!req.body.place) {
      return res.status(400).json({ error: "Place field is required" });
    }
    if (!req.body.bloodGroup) {
      return res.status(400).json({ error: "BloodGroup field is required" });
    }
    if (!req.body.isActive) {
      return res.status(400).json({ error: "IsActive field is required" });
    }
    if (!req.body.experience) {
      return res.status(400).json({ error: "Experience field is required" });
    }
    if (!req.body.softwareRole || req.body.softwareRole.length === 0) {
      return res.status(400).json({ error: "SoftwareRole field is required" });
    }
    if (!req.body.skills || req.body.skills.length === 0) {
      return res.status(400).json({ error: "At least one skill is required" });
    }
    const updatedDetails = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedDetails, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User details updated", data: user });
  } catch (err) {
    console.error("Error in /user-details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* DELETE users listing */
router.delete("/user-details", async function (req, res, next) {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    console.log("User details DELETE endpoint hit");
    const user = await User.deleteOne({ _id: userId });
    console.log("Deleting user with ID:", user);
    res.status(200).json({ message: "User details deleted" });
  } catch (err) {
    console.error("Error in /user-details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
