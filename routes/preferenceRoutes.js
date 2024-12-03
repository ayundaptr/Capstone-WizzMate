const express = require("express");
const {
  addPreference,
  getPreferences,
  addUserPreference,
  getUserPreferences,
} = require("../services/preferenceService");

const router = express.Router();
router.post("/add-preference", async (req, res) => {
  try {
    const preferenceId = await addPreference(req.body.category);
    res.json({ success: true, preferenceId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const preferences = await getPreferences();
    res.json({ success: true, preferences });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.post("/add-user-preference", async (req, res) => {
  try {
    const { userId, preferenceId } = req.body;
    const message = await addUserPreference(userId, preferenceId);
    res.json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.get("/user/:userId", async (req, res) => {
  try {
    const userPreferences = await getUserPreferences(req.params.userId);
    res.json({ success: true, userPreferences });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
