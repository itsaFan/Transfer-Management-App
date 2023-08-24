const express = require("express");
const { createTransfer, approveTransferReq, rejectTransferReq } = require("../controllers/transferController");

const router = express.Router();

router.post("/add", createTransfer);
router.put("/approve/:transferId", approveTransferReq);
router.put("/reject/:transferId", rejectTransferReq);


module.exports = router;