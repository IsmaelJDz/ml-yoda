const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

/**
 * Connect app to DataBase
 */

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("😎 DataBase Online 💾");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
