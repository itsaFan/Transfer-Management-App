const express = require("express");
const { createTransfer, approveTransferReq, rejectTransferReq, getAllTransfers, softDeleteTransferReq, adminGetAllTransfers } = require("../controllers/transferController");
const { verifyJWT } = require("../middlewares/verify");
const { checkRole } = require("../middlewares/checkRole");
const { body } = require("express-validator");

const router = express.Router();

router.post("/add", body("amount").trim(), verifyJWT, createTransfer);
router.put("/approve/:transferId", verifyJWT, checkRole(["approver", "admin"]), approveTransferReq);
router.put("/reject/:transferId", verifyJWT, checkRole(["approver"]), rejectTransferReq);
router.get("/", getAllTransfers);

//admin area
router.put("/soft-delete/:transferId", verifyJWT, checkRole(["admin"]), softDeleteTransferReq);
router.get("/admin/transfer-lists", verifyJWT, checkRole(["admin"]), adminGetAllTransfers)

module.exports = router;
