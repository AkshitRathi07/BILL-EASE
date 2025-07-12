const { Ref } = require("git");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  CustomerName: { type: String },
  PhoneNumber: { type: Number },
  Address: { type: String },
  Mode: { type: String },
  // Token: { type: String },
  // this links the customer by the grocery store manager credentials
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
},{ timestamps: true });

exports.customerModel = mongoose.model("customerModel", CustomerSchema);
