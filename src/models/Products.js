import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  color: String,
  size: String,
  stock: Number,
  sku: String,
});

const description = new mongoose.Schema({
  intro: String,
  detail: String,
});

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: description,
    price: Number,
    categories: [String],
    brand: String,
    variants: [variantSchema],
    images: [String],
  },
  { timestamps: true }
);

export const Products = mongoose.model('Products',productSchema)
