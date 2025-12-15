import { Product } from "../model/product.js"

//create product
export const createProduct = async (req, res) => {
    try{
        const {name, description, price, category, stock, img} = req.body
        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            img
        })
        res.status(201).json({success:true, 
            message: "Product created successfully",
            product: newProduct
        })
    } catch (error) { 
        console.error(error)
        res.status(500).json({
            success:false, 
            message: "Server Error", error})
    }
}

//get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            success:true,
            message: "Products retrieved successfully",
            products
        })
    } catch (error) {
        res.status(500).json({
            success:false, 
            message: "Server Error", error})
    }
}

// Get product by id
export const getProductById = async (req, res) => {
    try {
        const  productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({
            success:true,
            message: "Product retrieved successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success:false, 
            message: "Server Error", error})
    }
}

// update product
export const updateProductById = async (req, res) => {
    let productId = req.params.id;
    const { name, description, price, category, stock, img } = req.body
    try {
        let product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" })
            // update only updated fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        product.img = img || product.img;
        await product.save();
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProductById = async (req, res) => {
    const productId = req.params.id
    try {
       const product = await Product.findById(productId)
        if (!product) return res.status(404).json({message: "Product not found"})
            await product.deleteOne()
        res.status(200).json({message: "Product deleted successfully"})
}    catch (error) {
        res.status(500).json({message:error.message})
 }}