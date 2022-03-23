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
  req.body.imageUrl = "http://localhost:3000/upload/" + req.file.filename;
  req.body.userId = req.user._id;

  var promise = Service.addItem(req.body);

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
