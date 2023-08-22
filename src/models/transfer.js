const mongoose = require("mongoose");

const transferReqSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  amount: {
    type: Number,
    required: true,
  },
});

const TransferRequest = mongoose.model("TransferRequest", transferReqSchema);
module.exports = TransferRequest;
