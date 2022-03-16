const FoundItemModel = require("../models/Found_Item");
exports.getFountItems = (req, res) => {
  var promise = FoundItemModel.find({});

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.addFoundItems = (req, res) => {
  const foundItem = FoundItemModel({
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId,
    imageUrl: "http://localhost:3000/upload/" + req.file.filename,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    category: req.body.category,
  });

  var promise = foundItem.save();

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getFoundItemsFindById = (req, res) => {
  var promise = FoundItemModel.find({ userId: req.params.userId });

  promise
    .then((user) => {
      res.json(user);
    })
    .catch((e) => {
      res.json(e);
    });
};

exports.deleteFoundItemsFindById = (req, res) => {
  var promise = FoundItemModel.findByIdAndRemove(req.params.found_item_id);

  promise
    .then((data) => {
      res.json({
        status: "Succes",
        message: "Item deleted",
      });
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
};