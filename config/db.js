import mongoose from "mongoose"; 
import logger from "../utils/logger.js";
import secrets from "./secrets.js";


const connectDB = () => {
  mongoose.connect(secrets.mongoUri)
  .then(res => {
    logger.debug("MongoDB Connected...")
  }).catch(err => {
    logger.error(err.message)
    process.exit(0)
  })
}

export default connectDB;

