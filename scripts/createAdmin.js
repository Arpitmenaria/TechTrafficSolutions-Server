// scripts/createAdmin.js

const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

// Load environment variables
dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const existing = await Admin.findOne({ email: 'admin@techtrafficsolutions.com' });
    if (existing) {
      console.log('Admin already exists');
    } else {
      await Admin.create({
        email: 'admin@techtrafficsolutions.com',
        password: 'Admin@123' // You can change this
      });
      console.log('✅ Admin user created successfully');
    }
    process.exit();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
