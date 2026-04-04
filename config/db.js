const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected To MongoDB: ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`.bgRed.white);

    // 🔥 VERY IMPORTANT → stop server if DB fails
    process.exit(1);
  }
};

module.exports = connectDB;
