import mongoose from 'mongoose';


const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category:{type:String},
        stock:{type:String},
        img:{type:String},
    },
    { timestamps: true }
);

export const Product = mongoose.model('Products', productSchema);

