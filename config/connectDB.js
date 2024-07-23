const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected successfully: ${MONGO_URI}`);
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
