import express from "express";
import { StatusCodes } from "http-status-codes";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/productController.js'
const Router = express.Router();

Router.get('/',getAllProducts)
Router.get('/:id',getProductById)
Router.post('/',createProduct)
Router.put('/:id',updateProduct)
Router.delete('/:id', deleteProduct)

export const productRouter = Router

