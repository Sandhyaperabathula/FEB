require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API Routes
app.get('/api/message', (req, res) => {
  res.json({ 
    message: "I love you more than code! Happy Valentine's Day! 💖" 
  });
});

app.post('/api/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to) {
    return res.status(400).json({ error: 'Missing "to" field' });
  }

  // Default message if not provided (for generic "Send Love" feature)
  const emailMessage = message || "Happy Valentine's Day! You are loved and appreciated. 🌹💖";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject || 'A Special Message For You ❤️',
    text: `You have a new Valentine message!\n\n${emailMessage}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffe6f2; border-radius: 10px;">
        <h1 style="color: #d63384;">${subject || 'A Special Message For You ❤️'}</h1>
        <p style="font-size: 18px; color: #333;">You have received a romantic response:</p>
        <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 5px solid #d63384; margin: 20px 0;">
          <p style="font-size: 16px; font-style: italic; margin: 0;">"${emailMessage}"</p>
        </div>
        <p style="font-size: 12px; color: #666;">Sent from your Valentine Website 🌹</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Serve static files from React frontend
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all handler for any request that doesn't match the above
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
