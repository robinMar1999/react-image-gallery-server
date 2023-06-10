import express from "express";
import cors from 'cors';
import morgan from "morgan";
import logger from './utils/logger.js'
import connectDB from "./config/db.js";
import Image from "./models/image.js";
import "dotenv/config"

const app = express()

connectDB();

app.use(morgan("dev", {
  skip: (req, res) => {
    return res.statusCode < 400
  }
}))

app.use(express.json())

app.use(cors({
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}))

app.get("/images", async (req, res) => {
  try {
    const images = await Image.find()
    res.json({
      images
    })
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({
      message: "Something went wrong!"
    })
  }
})

app.post("/images", async (req, res) => {
  try {
    const image = new Image({
      ...req.body
    })
    await image.save()
    res.json({
      message: "Image added successfully",
      image
    })
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({
      message: "Something went wrong!"
    })
  }
})

app.delete("/images/:id", async (req,res) => {
  try {
    const image = await Image.findById(req.params.id)
    if(!image) {
      return res.status(404).json({
        message: 'Image not found'
      })
    }
    await image.deleteOne()
    res.status(200).json({
      message: 'Image deleted successfully'
    })
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({
      message: "Something went wrong!"
    })
  }
})

const port = process.env.PORT || 5500

app.listen(port, () => {
  logger.debug(`Server started on port ${port}`)
})