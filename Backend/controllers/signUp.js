import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import userModal from "../models/userModal.js";
const JWT_SECRET = "clothing-store"; // Replace with a strong secret key
const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt


const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    let user = await userModal.findOne({ email });

    if (user) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the user with the hashed password
    user = await userModal.create({ username, email, password: hashedPassword });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);

    // Send JWT token in a secure HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true,      // Ensures the cookie is not accessible via JavaScript
    });
    
    res.json({
        message: "Sign Up successfully",
        user: {
            id: user._id,
            email: user.email,
            name: user.username,
            token:token // Include any other user fields you want to send
            // Add other fields as necessary
        },
    });
};

export default signUp;