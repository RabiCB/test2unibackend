const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { prisma } = require("../lib/prima");

const router = express.Router();
const JWT_SECRET = "xyztest2uni2024";

// === Setup Mail Transporter ===
// Replace with your real SMTP credentials or use services like SendGrid, Mailgun, Gmail App Passwords
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rollinrabin@gmail.com", // your email
    pass: 'rypz pspi bliy wyag', // your app password
  },
});

// === Helper to generate random 6-digit OTP ===
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// === Helper to send OTP via email ===
async function sendOTP(email, otp) {
  await transporter.sendMail({
    from: `Test2uni.com`,
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your verification code is: <b>${otp}</b></p><p>This OTP expires in 5 minutes.</p>`,
  });
}

// 🟢 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    const user = await prisma.user.create({
      data: { name, email, password: hashed, otp, otpExpiresAt },
    });

    await sendOTP(email, otp);

    res.status(201).json({
      message: "User registered successfully. Please verify OTP sent to your email.",
      userId: user.id,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🟣 VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ error: "Email and OTP are required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    if (user.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });

    if (new Date() > new Date(user.otpExpiresAt))
      return res.status(400).json({ error: "OTP expired" });

    // Update verification status
    await prisma.user.update({
      where: { email },
      data: { isVerified: true, otp: null, otpExpiresAt: null },
    });

    res.json({ message: "Account verified successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🟡 RESEND OTP
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { otp, otpExpiresAt },
    });

    await sendOTP(email, otp);

    res.json({ message: "New OTP sent to your email" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔵 LOGIN (only after verification)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.isVerified)
      return res.status(401).json({ error: "Please verify your email first" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
