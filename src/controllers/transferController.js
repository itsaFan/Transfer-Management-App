const transferDao = require("../dao/transferDao");

const createTransfer = async (req, res) => {
  const { requester, amount } = req.body;

  try {
    const newTransferRequest = await transferDao.createTransferRequest({
      requester,
      amount,
    });

    return res.status(201).json({ message: "Transfer request successfuly created, wait for the status update" });
  } catch (error) {
    console.error("Create transfer request failed:", error);
    return res.status(500).json({ message: "Create transfer request failed because of internal server error" });
  }
};

const approveTransferReq = async (req, res) => {
  const { transferId } = req.params;

  try {
    const transferRequest = await transferDao.getTransferReqById(transferId);

    if (!transferRequest) {
      return res.status(404).json({ message: "Transfer Request not found :(" });
    }

    if (transferRequest.status === "approved") {
      return res.status(400).json({ message: "This transfer request has been approved" });
    }

    await transferDao.updateTransReqStatus(transferId, "approved");

    return res.status(200).json({ message: "Transfer Request has been successfully approved" });
  } catch (error) {
    console.error("Error in approving transfer request:", error);
    return res.status(500).json({ message: "error in approving transfer request due to internal server error" });
  }
};

const rejectTransferReq = async (req, res) => {
  const { transferId } = req.params;
  try {

    const transferRequest = await transferDao.getTransferReqById(transferId);
    if (!transferRequest) {
      return res.status(404).json({ message: "Transfer Request not found :(" });
    }

    if (transferRequest.status === "rejected") {
      return res.status(400).json({ message: "This transfer request has been rejected" });
    }

    await transferDao.updateTransReqStatus(transferId, "rejected");

    return res.status(200).json({ message: "Transfer Request has been successfully rejected" });
  } catch (error) {
    console.error("Error in approving transfer request:", error);
    return res.status(500).json({ message: "error in rejecting transfer request due to internal server error" });
  }
};

module.exports = { createTransfer, approveTransferReq, rejectTransferReq };
