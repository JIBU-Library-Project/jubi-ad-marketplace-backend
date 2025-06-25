const nodemailer = require("nodemailer");
require("dotenv").config();

// transporter
const sendEmail = async (email, name, role) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const vendorTemplate = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Welcome to JUBI Market, ${name}!</h2>
    <p>We're thrilled to have your business onboard 🎉.</p>

    <p>As a vendor, you can now:</p>
    <ul>
      <li>Create and manage ads for your products or services</li>
      <li>Reach thousands of potential customers</li>
      <li>Boost your brand's visibility with ease</li>
    </ul>

    <a href="https://jubimarket.com/login" style="
      display: inline-block;
      background-color: rgb(44, 224, 74);
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 15px;">
      Access Your Vendor Dashboard
    </a>

    <p style="margin-top: 20px;">
      Start posting your ads today and grow your business on JUBI Market.
    </p>

    <p>Cheers,<br/>The JUBI Market Team</p>
  </div>
`;
    const regularUserTemplate = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Hi ${name}, welcome to JUBI Market!</h2>
    <p>We're excited to have you join our community 🎉.</p>

    <p>With your account, you can now:</p>
    <ul>
      <li>Browse and explore listings in different categories</li>
      <li>Connect with trusted vendors and sellers near you</li>
    </ul>

    <a href="https://jubimarket.com/login" style="
      display: inline-block;
      background-color:rgb(44, 224, 74);
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 15px;">
      Log In to Get Started
    </a>

    <p style="margin-top: 20px;">
      JUBI Market is your space to discover, trade, and thrive. Let’s get started!
    </p>

    <p>Best,<br/>The JUBI Market Team</p>
  </div>
`;

    // Email details
    const mailOptions = {
      from: `JUBI MARKET  <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to JUBI Market!",
      html: role === "user" ? regularUserTemplate : vendorTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", info);
    return {
      success: true,
      info,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = sendEmail;
