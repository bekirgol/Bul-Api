const lostItemModel = require("../models/Lost_Item");

const addLostItem = (req, res) => {
  const lostItem = new lostItemModel({
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId,
    imageUrl: "http://localhost:3000/upload/" + req.file.filename,
    category: req.body.category,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });

  var promise = lostItem.save();

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getLostItemFındById = (req, res) => {
  var promise = lostItemModel.find({ userId: req.params.userId });

  promise
    .then((user) => {
      res.json(user);
    })
    .catch((e) => {
      res.json(e);
    });
};

const getLostItems = (req, res) => {
  var promise = lostItemModel.find({});

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteLostItemsById = (req, res) => {
  var promise = lostItemModel.findByIdAndRemove(req.params.lost_item_id);

  promise
    .then((data) => {
      res.json({
        status: "Succes",
        message: "Lost goods deleted",
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  addLostItem,
  getLostItemFındById,
  getLostItems,
  deleteLostItemsById,
};
