const express = require("express");
const { createTransfer, approveTransferReq, rejectTransferReq, getAllTransfers } = require("../controllers/transferController");

const router = express.Router();

router.post("/add", createTransfer);
router.put("/approve/:transferId", approveTransferReq);
router.put("/reject/:transferId", rejectTransferReq);
router.get("/", getAllTransfers);

module.exports = router;
