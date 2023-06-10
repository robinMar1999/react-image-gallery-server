import mongoose from "mongoose";

const {Schema, model} = mongoose

const imageSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  }
})

const Image = model('image', imageSchema)

export default Image;