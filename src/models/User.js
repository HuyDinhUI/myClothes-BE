import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    avatar:String,
    googleId:{ type: String, unique: true, sparse: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default:null},
    fullName: String,
    address: {
      street: String,
      city: String,
      postalCode: String,
      country: String
    },
    phone: String,
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  }, { timestamps: true });

  export const User = mongoose.model('Users', userSchema)