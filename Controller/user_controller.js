const UserModel = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { name, lastName, mail, password } = req.body;

  bcryptjs.hash(password, 10).then((hash) => {
    const user = new UserModel({
      name,
      lastName,
      mail,
      password: hash,
    });

    const promise = user.save();

    promise
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(500).send("Kullanıcı Mevcut");
      });
  });
};

const login = (req, res) => {
  const { mail, password } = req.body;
  UserModel.findOne({ mail }, (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      res.status(500).send("Kullanıcı bulunamadı, Lütfen kayıt olun.");
    } else {
      bcryptjs
        .compare(password, user.password)
        .then((result) => {
          if (!result) {
            res
              .status(500)
              .send("Lütfen parolanızı doğru girdiğinizden emin olunuz.");
          } else {
            const payload = {
              mail,
            };

            const token = jwt.sign(payload, req.app.get("api_secret_key"));

            res.json({
              status: "succes",
              token: token,
              user: user,
            });
          }
        })
        .catch((err) => {
          res.json(err);
        });
    }
  });
};

const deleteUserFindById = (req, res) => {
  var promise = UserModel.findByIdAndDelete(req.params.user_id);

  promise
    .then((data) => {
      res.json({
        status: "Succes",
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

const getUsers = (req, res, next) => {
  const promise = UserModel.aggregate([
    {
      $lookup: {
        from: "lostgoods",
        localField: "_id",
        foreignField: "userId",
        as: "lost_items",
      },
    },
    {
      $unwind: {
        path: "$lost_items",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "founditems",
        localField: "_id",
        foreignField: "userId",
        as: "found_items",
      },
    },
    {
      $unwind: {
        path: "$found_items",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          lastName: "$lastName",
          mail: "$mail",
          password: "$password",
        },
        lost_items: {
          $push: "$lost_items",
        },
        found_items: {
          $push: "$found_items",
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        lastName: "$_id.lastName",
        mail: "$_id.mail",
        password: "$_id.password",
        lost_items: "$lost_items",
        found_items: "$found_items",
      },
    },
  ]);

  promise
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  register,
  login,
  deleteUserFindById,
  getUsers,
};
