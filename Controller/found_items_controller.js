const FoundItemModel = require("../models/Found_Item");
const Service = require("../Service/found_item_service");

const getFountItems = (req, res) => {
  var promise = Service.getItem();

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const addFoundItems = (req, res) => {
  // const foundItem = FoundItemModel({
  //   title: req.body.title,
  //   description: req.body.description,
  //   userId: req.body.userId,
  //   imageUrl: "http://localhost:3000/upload/" + req.file.filename,
  //   latitude: req.body.latitude,
  //   longitude: req.body.longitude,
  //   category: req.body.category,
  // });

  // var promise = foundItem.save();

  var promise = Service.addItem({
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId,
    imageUrl: "http://localhost:3000/upload/" + req.file.filename,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    category: req.body.category,
  });

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getFoundItemsFindById = (req, res) => {
  var promise = Service.getItemFindById(req.params.userId);

  promise
    .then((user) => {
      res.json(user);
    })
    .catch((e) => {
      res.json(e);
    });
};

const deleteFoundItemsFindById = (req, res) => {
  var promise = Service.deleteItemFindById(req.params.found_item_id);

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

module.exports = {
  getFountItems,
  addFoundItems,
  getFoundItemsFindById,
  deleteFoundItemsFindById,
};
