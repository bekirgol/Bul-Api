const FoundItemModel = require("../models/Found_Item");
const addItem = (data) => {
  const item = new FoundItemModel(data);
  return item.save();
};

const getItem = () => {
  return FoundItemModel.find({}).populate({
    path: "userId",
    select: "name lastName",
  });
};

const getItemFindById = (id) => {
  return FoundItemModel.find({ userId: id }).populate({
    path: "userId",
    select: "name lastName",
  });
};

const deleteItemFindById = (id) => {
  return FoundItemModel.findByIdAndRemove(id);
};

module.exports = {
  addItem,
  getItem,
  getItemFindById,
  deleteItemFindById,
};
