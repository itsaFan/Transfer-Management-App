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

const getTransferReqByBoolean = async (isDeleted) => {
  return TransferRequest.find({ isDeleted });
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

const softDeleteTransferReq = async (transferId) => {
  try {
    const transId = { _id: transferId };
    const deleteStatus = { $set: { isDeleted: true } };

    const result = await TransferRequest.updateOne(transId, deleteStatus);

    return result;
  } catch (error) {
    console.error("Error when trying to soft delete transfer request", error);
    throw error;
  }
};

const getTransferRequestsByDateRange = async (startDate, endDate) => {
  const startISODate = new Date(startDate).toISOString();
  const endISODate = new Date(endDate).toISOString();

  return TransferRequest.find({
    createdAt: {
      $gte: startISODate,
      $lte: endISODate,
    },
  });
};

const getTransferRequestsByStatus = async (statuses) => {
  return TransferRequest.find({
    status: { $in: statuses },
  });
};

module.exports = { 
  createTransferRequest, 
  getTransferRequests, 
  getTransferReqById, 
  updateTransReqStatus, 
  softDeleteTransferReq, 
  getTransferReqByBoolean, 
  getTransferRequestsByDateRange, 
  getTransferRequestsByStatus 
};
