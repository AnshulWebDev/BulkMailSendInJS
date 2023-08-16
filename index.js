const nodemailer = require("nodemailer");//nodemailer package
const xlsx = require("xlsx");//xlsx package

// Read the Excel file
const workbook = xlsx.readFile("email_list.xlsx"); // Update the file name
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Extract email addresses and other data from the Excel file
const emailData = xlsx.utils.sheet_to_json(worksheet);

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "abc@xyz.com", //update with your mail
    pass: "Pa$$Wd",//update with your appPassword
  },
});

// Send bulk emails
async function sendBulkEmails() {
  for (const data of emailData) {
    const mailOptions = {
      from: "abc@xyz.com", // Update with your email
      to: data.email, // Extracted from Excel
      subject: `Exciting Sponsored Post Opportunity ${data.Name}`,//change this according to your need
      text: "Enter Your Body message"};

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${data.email}: ${info.response}`);
    } catch (error) {
      console.error(`Error sending email to ${data.email}: ${error.message}`);
    }
  }
}

sendBulkEmails();
