import mongoose from "mongoose"

const Schema = mongoose.Schema

const ProductSchema = new Schema({
 title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    img: {
        type: String, 
    },
    code: {
        type: String, 
        required: true,
        unique: true
    }, 
    stock: {
        type: Number, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    status: {
        type: Boolean, 
        required: true
    }, 
})



export default mongoose.model("Product", ProductSchema)