const TransferRequest = require("../models/transfer");

const createTransferRequest = async (transferReqData) => {
  const newTransferRequest = new TransferRequest(transferReqData);
  await newTransferRequest.save();
  return newTransferRequest;
};

const getTransferRequests = async () => {
  return TransferRequest.find();
};

const getTransferReqById = async (_id) => {
  return TransferRequest.findOne({ _id });
};

const updateTransReqStatus = async (transferId, newStatus) => {
  try {
    const filter = { _id: transferId };
    const update = { status: newStatus };

    const result = await TransferRequest.updateOne(filter, update);

    if (result.nModified === 0) {
      return null;
    }

    return result;
  } catch (error) {
    console.error("Error when trying to update transfer status:", error);
    throw error;
  }
};

module.exports = { createTransferRequest, getTransferRequests, getTransferReqById, updateTransReqStatus };
