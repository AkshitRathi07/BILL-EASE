const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const cors = require("cors");

const app = express();

app.use(cors());

// body parser
app.use(express.json());

const router = express.Router();
const ItemRouter = require("./Controller/ItemController");
const CustomerRouter = require("./Controller/CustomerController");
const AuthController = require("./Controller/AuthController");
const authMiddleware = require("./Controller/authMiddleware");
const roleController = require("./Controller/roleController");
const AnalysisController = require('./Controller/AnalysisController');
const notificationController = require('./Controller/Notification')

app.use("/api", router);

// item routes 
router.post("/NewItem", authMiddleware, ItemRouter.AddItem);
router.get("/GetItem", authMiddleware, ItemRouter.GetItem);

// customer routes 
router.post("/AddCustomer", authMiddleware, CustomerRouter.ProduceBill);
router.get("/getCustomer", authMiddleware, CustomerRouter.FetchCustomer);
router.post("/saveBill", authMiddleware, CustomerRouter.SaveBill);
router.get("/getBill", authMiddleware , CustomerRouter.getBills);
router.get('/managerList' , authMiddleware , CustomerRouter.fetchManagers)
// auth routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get('/manageRole' , authMiddleware , roleController.roleDetermine)

router.get('/ManagerAnalysis/:id' , authMiddleware , AnalysisController.SingleManagerAnalysis)
router.get('/todaySales/:branchId' , AnalysisController.DailySales);

router.post('/SendNotification',authMiddleware,notificationController.SendNotification)
// connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(String(process.env.URL));
  console.log("your connection is successful");
}

//port details

app.listen(process.env.PORT, () => {
  console.log("You are on  " + `${process.env.PORT}`);
});
