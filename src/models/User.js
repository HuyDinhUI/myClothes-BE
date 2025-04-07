import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    image:String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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