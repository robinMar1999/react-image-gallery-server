import mongoose from "mongoose"; 
import logger from "../utils/logger.js";

const connectDB = () => {
  mongoose.connect(process.env.MONGO_SECRET_KEY)
  .then(res => {
    logger.debug("MongoDB Connected...")
  }).catch(err => { 
    logger.error(err.message)
    process.exit(0)
  })
}

export default connectDB;

