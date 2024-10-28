import mongoose from "mongoose";

// Connection URI
const uri = "mongodb://localhost:27017/ClothingStore";

// Function to connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

connectToDatabase(); // Call the function to connect

// User schema definition
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String, // or Number if you want
        default: null,
      },
});

// User model creation
const userModel = mongoose.model("User", userSchema);

export default userModel;
