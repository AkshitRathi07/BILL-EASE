const model = require("../Model/ItemsModel");
const ItemsModel = model.Item;

exports.AddItem = async (req, res) => {
  try {
    const { ItemName,Quantity, BrandName, Unit, Mrp, ExpiryDate, Category, Notes , managerId} =
      req.body;

    if (!ItemName && !Mrp && !Category) {
      console.log("please fill the inputs properly");
      return;
    }

    const id = req.user._id;
    const item = await new ItemsModel({
      ItemName,
      BrandName,
      Quantity,
      Unit,
      Mrp,
      ExpiryDate,
      Category,
      Notes,
      managerId : id
    });
    res
      .status(200)
      .json({ success: true, message: "item created successfully", item });
    item.save();
  } catch (error) {
    console.log(error);
  }
};

exports.GetItem = async (req, res) => {
  try {
    const id = req.user._id;
    const itemList = await ItemsModel.find({managerId : id});
    res
      .status(200)
      .json({ message: "Your List are DownBelow", success: true, itemList });
  } catch (error) {
    console.log(error);
  }
};
