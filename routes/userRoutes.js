const express = require("express");
const {allUsers, getUserProfile} = require("../controllers/userControllers")
const router = express.Router();
const {protect} = require("../midlleware/authMiddleware") 

router.route('/').get(protect, allUsers);

router.post('/', getUserProfile);

module.exports = router