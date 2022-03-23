const {
  addItem,
  getItemFindById,
  getItem,
  deleteItemFindById,
} = require("../Service/lost_items_service");

const addLostItem = (req, res) => {
  req.body.imageUrl = "http://localhost:3000/upload/" + req.file.filename;
  req.body.userId = req.user._id;

  const promise = addItem(req.body);

  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getLostItemFındById = (req, res) => {
  console.log(req);
  var promise = getItemFindById(req.params.userId);

  promise
    .then((user) => {
      res.json(user);
    })
    .catch((e) => {
      res.json(e);
    });
};

const getLostItems = (req, res) => {
  var promise = getItem();
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deleteLostItemsById = (req, res) => {
  var promise = deleteItemFindById(req.params.lost_item_id);

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
