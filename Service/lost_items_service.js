const lostItemModel = require("../models/Lost_Item");
const addItem = (lostItem) => {
  const addlostItem = new lostItemModel(lostItem);
  return addlostItem.save();
};

const getItem = () => {
  return lostItemModel.find({}).populate({
    path: "userId",
    select: "name lastName",
  });
};

const getItemFindById = (id) => {
  return lostItemModel.find({ userId: id }).populate({
    path: "userId",
    select: "name lastName",
  });
};

const deleteItemFindById = (id) => {
  return lostItemModel.findByIdAndRemove(id);
};

module.exports = {
  addItem,
  getItem,
  getItemFindById,
  deleteItemFindById,
};
