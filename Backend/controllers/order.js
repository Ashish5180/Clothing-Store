import Order from '../models/orderModal.js'; // Ensure this path is correct
import nodemailer from 'nodemailer'; // Import nodemailer

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail as the email service
  auth: {
    user: 'ashish.y8750@gmail.com', // Your Gmail address
    pass: 'upzg gbhz lpka wljd ', // Your Gmail password or app password
  },
});

export const createOrder = async (req, res) => {
  const { userId, userName, products, address, paymentMethod, totalAmount } = req.body;

  if (!userId || !userName || !products || !address || !paymentMethod || totalAmount == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newOrder = new Order({
      userId,
      userName,
      products,
      address,
      paymentMethod,
      totalAmount,
    });

    const savedOrder = await newOrder.save();

    // Prepare email details
    const mailOptions = {
      from: 'ashish.y8750@gmail.com', // Sender address
      to: 'theashish.y@gmail.com', // Recipient address (your email)
      subject: 'New Order Created', // Subject of the email
      text: `New order details:\n\nUser: ${userName}\nProducts: ${JSON.stringify(products)}\nAddress: ${address}\nPayment Method: ${paymentMethod}\nTotal Amount: $${totalAmount}`, // Body of the email
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
