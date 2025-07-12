const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
  ItemName: { type: String, required: true },
  BrandName: { type: String },
  Quantity: { type: Number, required: true },
  Unit: { type: String, required: true },
  Mrp: { type: Number },
  ExpiryDate: { type: Date, required: true },
  Category: { type: String, required: true },
  Notes: { type: String },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},{ timestamps: true });

exports.Item = mongoose.model("Item", ItemSchema);
