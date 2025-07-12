const Model = require("../Model/CustomerDetails");
const Customermodel = Model.customerModel;

const model2 = require("../Model/AllBills");
const BillsModel = model2.BillsModel;


const User = require("../Model/User");
var jwt = require("jsonwebtoken");

// creating new customer
exports.ProduceBill = async (req, res) => {
  const userId = req.user._id;
  const { CustomerName, PhoneNumber, Address, Mode, user } = req.body;

  const newCustomer = new Customermodel({
    CustomerName,
    PhoneNumber,
    Address,
    Mode,
    user: userId,
  });

  newCustomer.save();
  res
    .status(200)
    .json({ success: true, message: "user created successfully", newCustomer });
};

exports.FetchCustomer = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("THE USER ID ", userId);

    const fetchedUsers = await Customermodel.find({ user: userId });
    res
      .status(200)
      .json({ message: "yes u fetched", success: true, fetchedUsers });
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.SaveBill = async (req, res) => {
  const { CustomerName, PhoneNumber, Address, Cart, Mrp, user } = req.body;

  const userId = req.user._id;
  const newBill = new BillsModel({
    CustomerName,
    PhoneNumber,
    Address,
    Cart,
    Mrp,
    user: userId,
  });

  newBill.save();
  res.status(200).json({ success: true, newBill });
};

exports.getBills = async (req, res) => {
  try {
    const user = req.user._id;
    const allBills = await BillsModel.find({ user: user });
    res.status(200).json({
      success: true,
      data: allBills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bills",
      error: error.message,
    });
  }
};


exports.fetchManagers = async (req, res) => {
  try {
    const userRole = req.user.role;

    if (userRole !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can fetch managers.",
      });
    }

    const fetchedUsers = await User.find({ role: "manager" });

    res.status(200).json({
      message: "Managers fetched successfully",
      success: true,
      fetchedUsers,
    });
  } catch (error) {
    console.error("Error fetching managers:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
