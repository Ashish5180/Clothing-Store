import express from "express";
import signUp from "./controllers/signUp.js";
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors package
import addressRoute from "./routes/address.js";
import authRoutes from "./routes/login.js";
import orderRoutes from "./routes/order.js";
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "https://clothing-store-sand.vercel.app",
    credentials: true, // Allows cookies to be sent with requests
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Server is running");
})

// Signup route with password hashing and sending JWT token in cookie
app.post("/signup", signUp);



app.use("/api", addressRoute);
app.use('/api/orders', orderRoutes);

app.use(authRoutes);





















// Server
app.listen(5000, () => console.log(`Server is running on port 5000`));
