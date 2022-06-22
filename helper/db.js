const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "your-database-acces-uri"
  );

  mongoose.connection.on("open", () => {
    console.log("MongoDB: Connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error" + err);
  });

  mongoose.Promise = global.Promise;
};
