import jwt from 'jsonwebtoken';
import userModel from "../models/userModal.js"; // Ensure the correct import
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET || "clothing-store"; // Use a strong secret key

const sendOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  console.log('Generated OTP:', otp); // Log the generated OTP

  // Set up Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "ashish.y8750@gmail.com", // Use environment variable
      pass: "upzg gbhz lpka wljd ", // Use environment variable
    },
  });

  const mailOptions = {
    from: "ashish.y8750@gmail.com", // Use environment variable
    to: email,
    subject: 'Your OTP for Login',
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
    
    // Store OTP temporarily in the database
    await userModel.findOneAndUpdate(
      { email },
      { otp }, // Store OTP
      { new: true }
    );
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const signIn = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      await sendOtp(email); // Send the OTP
      return res.status(200).send({ message: 'OTP sent to your email' });
    } else {
      return res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).send({ message: 'Server error' });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      console.log('Received OTP:', otp); 
      console.log('Stored OTP:', user.otp); 

      if (user.otp && user.otp.toString() === otp) {
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        // Send JWT token in a secure HTTP-only cookie
        res.cookie("token", token, {
          httpOnly: true,
        });

        // Clear the OTP after successful verification
        user.otp = null; 
        await user.save();

        return res.status(200).send({
          message: 'Login successful',
          user: {
            id: user._id,
            email: user.email,
            name: user.username,
            token: token,
          },
        });
      } else {
        return res.status(400).send({ message: 'Invalid OTP' });
      }
    } else {
      return res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).send({ message: 'Server error' });
  }
};
