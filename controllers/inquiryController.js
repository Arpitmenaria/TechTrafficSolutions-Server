// controllers/inquiryController.js
const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');

exports.submitInquiry = async (req, res) => {
  const { name, email, service, message } = req.body;

  try {
    const inquiry = await Inquiry.create({ name, email, service, message });

    // Send Email to Admin
    const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS
  }
});


    const mailOptions = {
      from: `"Tech Traffic Solutions" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Inquiry from ${name}`,
      html: `<h3>New Service Inquiry</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Service:</strong> ${service}</p>
             <p><strong>Message:</strong> ${message}</p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, msg: 'Inquiry submitted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch inquiries' });
  }
};
