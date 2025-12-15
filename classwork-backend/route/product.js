import express from "express";
import { createProduct ,deleteProduct,getAllProducts, updateProduct} from "../controller/product.js";


const ProductRouter = express.Router()
ProductRouter.post('/register', createProduct)
ProductRouter.get('/', getAllProducts)
ProductRouter.delete('/delete/:id', deleteProduct)
ProductRouter.put('/update/:id', updateProduct)
export default ProductRouter
