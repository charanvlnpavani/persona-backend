var express = require("express");
var router = express.Router();

/* POST users listing */
router.post("/user-details", function (req, res, next) {
  try {
    console.log("User details POST endpoint hit");
    const userDetails = req.body;
    console.log("Received user details:", userDetails);
    res
      .status(201)
      .json({ message: "User details received", data: userDetails });
  } catch (err) {
    console.error("Error in /user-details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/* GET users listing. */
router.get("/user-details", function (req, res, next) {
  try {
    console.log("User details endpoint hit");
    res.json({ message: "respond with a resource" });
  } catch (err) {
    console.error("Error in /user-details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/*  Patch users listing */
router.patch("/user-details", function (req, res, next) {
  try {
    console.log("User details PATCH endpoint hit");
    const updatedDetails = req.body;
    console.log("Received updated user details:", updatedDetails);
    res
      .status(200)
      .json({ message: "User details updated", data: updatedDetails });
  } catch (err) {
    console.error("Error in /user-details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* DELETE users listing */
router.delete("/user-details/:id", function (req, res, next) {
  try {
    console.log("User details DELETE endpoint hit");
    const userId = req.params.id;
    console.log("Deleting user with ID:", userId);
    res.status(200).json({ message: "User details deleted" });
  } catch (err) {
    console.error("Error in /user-details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
