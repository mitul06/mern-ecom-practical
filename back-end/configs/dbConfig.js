const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.set("runValidators", true);
mongoose.set("debug", true);

const dbConfig = async (dbUrl) => {
  try {
    const dbOption = {
      dbName: "practical",
    };

    await mongoose.connect(dbUrl, dbOption);
    console.log("db connected --->", dbUrl);
  } catch (error) {
    console.log("error in db", error.message);
  }
};

module.exports = { dbConfig };
