const express = require("express");
const { createTransfer, approveTransferReq, rejectTransferReq, getAllTransfers } = require("../controllers/transferController");
const { verifyJWT } = require("../middlewares/verify");
const { checkRole } = require("../middlewares/checkRole");

const router = express.Router();

router.post("/add", verifyJWT, createTransfer);
router.put("/approve/:transferId", verifyJWT, checkRole(["approver"]), approveTransferReq);
router.put("/reject/:transferId", verifyJWT, checkRole(["approver"]), rejectTransferReq);
router.get("/", getAllTransfers);

module.exports = router;
