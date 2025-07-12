// import { useParams } from "react-router-dom";

const model = require("../Model/AllBills");
const BillsModel = model.BillsModel;

// provide me all the bill that the specific manager creates
exports.SingleManagerAnalysis = async (req, res) => {
  const id = req.params.id;

  const ManagerData = await BillsModel.find({ user: id });
  if (!ManagerData) {
    res.status(401).json({ success: false, message: "no manager data found" });
  }

  res.status(200).json({
    success: true,
    message: "here u go sir with your data",
    ManagerData,
  });
};

exports.DailySales = async (req, res) => {
  // get the particular date from the url /sales/07july2024
  const branch_id = req.params.branchId;

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const SalesDate = await BillsModel.aggregate([
    {
      $match: {
        user: branch_id, // give the particular branch

        // date
        createdAt: { $gte: twentyFourHoursAgo },
      },
    },
    // you have all the bills whose date satisfy the given condition
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, //This is a MongoDB aggregation operator that converts a Date field ($createdAt) into a formatted string, like "2025-07-04". $dateToString turns that into: "2025-07-04"
        totalSales: { $sum: "$Mrp" },
        ordersCount: { $sum: 1 },
      },
    },
    // {
    //   $sort: { _id: 1 },
    // },
  ]);

  if(!SalesDate){
    res.status(400).json({success:false , message : "not get the values "})

  }

  res.status(200).json({
    message : "success" , success : true , SalesDate
  })
};
