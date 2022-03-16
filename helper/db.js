const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://admin:bekir.112233@cluster0.b1pfe.mongodb.net/bul-db?retryWrites=true&w=majority"
  );

  mongoose.connection.on("open", () => {
    console.log("MongoDB: Connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error" + err);
  });

  mongoose.Promise = global.Promise;
};
