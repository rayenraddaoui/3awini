const express = require("express");
const router = express.Router();

const {
  createWorkRequest,
  getMyWorkRequests
} = require("../controllers/workRequestController");

const {
  verifyToken
} = require("../middlewares/authMiddleware");

router.post(
  "/",
  verifyToken,
  createWorkRequest
);

router.get(
  "/my",
  verifyToken,
  getMyWorkRequests
);

module.exports = router;