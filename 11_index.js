const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// TEMP STORAGE
let users = [];

// EMAIL SETUP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
  user: "amithakur62500@gmail.com",
  pass: "lcxn yhdj ojmy akxg"
}
});

// REGISTER API
app.post("/register", async (req, res) => {
  // 1. We now grab 'name' along with email and password
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });

  // 2. We use the 'name' dynamically in the email text
  const mailOptions = {
    from: "amithakur62500@gmail.com", 
    to: email, // This dynamically sends to whatever email the user typed
    subject: "Registration Successful - Jammu University",
    text: `Dear ${name},\n\nWelcome to Jammu University! You have successfully registered your student account with the email: ${email}.\n\nYou can now sign in to the portal.\n\nBest Regards,\nUniversity Administration`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("MAIL ERROR:", err); 
      return res.status(500).send("Email failed");
    }
    console.log("MAIL SENT:", info.response);
    res.send(`Successfully registered ${name}! Welcome email sent.`);
  });
});

// LOGIN API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).send("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send("Wrong password");

  const token = jwt.sign({ email }, "secretkey");

  res.send({ message: "Login success", token });
});

// SERVER START
app.listen(5000, () => {
  console.log("Server running on port 5000");
});