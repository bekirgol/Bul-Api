const UserModel = require("../models/User");
const hash = require("../Scripts/Utils/helper");
const userService = require("../Service/user_service");

const register = (req, res) => {
  req.body.password = hash.passwordToHash(req.body.password);

  const promise = userService.addUser(req.body);

  promise
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send("Kullanıcı Mevcut" + err);
    });
};

const login = (req, res) => {
  req.body.password = hash.passwordToHash(req.body.password);

  var promise = userService.loginUser(req.body);
  promise
    .then((user) => {
      if (!user) return res.status(500).send("e-mail ya da parola yanlış.");

      user = {
        ...user.toObject(),
        tokens: {
          acces_token: hash.generateAccesToken(user),
          refresh_token: hash.generateRefreshToken(user),
        },
      };

      delete user.password;
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
  // UserModel.findOne({ mail }, (err, user) => {
  //   if (err) {
  //     throw err;
  //   }

  //   if (!user) {
  //     res.status(500).send("Kullanıcı bulunamadı, Lütfen kayıt olun.");
  //   } else {
  //     bcryptjs
  //       .compare(password, user.password)
  //       .then((result) => {
  //         if (!result) {
  //           res
  //             .status(500)
  //             .send("Lütfen parolanızı doğru girdiğinizden emin olunuz.");
  //         } else {
  //           const payload = {
  //             mail,
  //           };

  //           const token = jwt.sign(payload, req.app.get("api_secret_key"));

  //           res.json({
  //             status: "succes",
  //             token: token,
  //             user: user,
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         res.json(err);
  //       });
  //   }
  // });
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
