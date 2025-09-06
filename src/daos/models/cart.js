import mongoose from "mongoose"

const Schema = mongoose.Schema

const CartSchema = new Schema({
  products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

CartSchema.pre("find", function(next) {
    this.populate("products.product");
    next();
})



export default mongoose.model("Cart", CartSchema)