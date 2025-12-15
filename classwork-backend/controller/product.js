
import{  product } from "../Model/product.js"
// create product
export const createProduct = async(req, res) =>{
    try {
        const{ name, price, description, image, category} = req.body
        const newProduct = await product.create({
            name,
            price,
            description,
            image,
            category,

        })
        res.status(201).json({
            success:true,
            message:"product created successful",
            product:newProduct
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success:false,
            message:"server Error", error})
    }
}

// update product

export const updateProduct = async (req, res) => {
    let productId = req.params.id
    const {name, price, description, image, category
    } = req.body
try {
    let Product = await product.findById(productId)
        if (!Product) return res.status(404).json
       ({message:"product Not Found"})

       //Update only provided fields
       product.name = name || product.name;
       product.price = price || product.price;
       product.description = description || product.description;
       product.image = image || product.image;
       product.category = category || product.category;
       await product.save()
    res.status(200).json({
        message:"product Successfully updated",
        product:{
            id:product._id,
            name:product.name,
            price:product.price,
            description:product.description,
            image:product.image,
            category:product.category,
            
        }
    })
    
} catch (error) {
         res.status(500).json({message:error.message})
    }
}

// get all products

export const getAllProducts = async(req, res) => {
    try {
        let Product = await product.find()
        res.status(200).json({success:true,Product})

    } catch (error) {
res.status(500).json({success:false,
    message:"server error",error
})
    }
}

   
export const getProductById = async (req, res) =>{
    
    try {
        const productId = req.params.id
        const product = await product.findById(productId)
    if(!product) return res.status(404).json({message:"product not found"})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
   }


   // delete product 

   

export const deleteProduct = async (req, res) =>{
    const productId = req.params.id

    try {
        const Product  = await product.findById(productId)
        if(!Product) return res.status(404).json({
            message:"product doesnt exist"})
            await Product.deleteOne()
    res.status(200).json({message:"product deleted Successfully",})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}