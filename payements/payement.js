const pyementHistorySchema = require("../Schema/payementhistroy");
const accountCreateSchema = require("../Schema/accountcreate");
const nodemailer = require("nodemailer");

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "Gmail", // or another SMTP provider like Outlook, etc
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your password
  },
});

const addPayementHistory = async (req, res) => {
  try {
    const { userId, plan, amountPaid, paymentMethod, transactionId } = req.body;

    // Validate the userId
    const user = await accountCreateSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new payment history entry
    const paymentHistory = new pyementHistorySchema({
      userId,
      plan,
      amountPaid,
      paymentMethod,
      transactionId,
    });

    await paymentHistory.save();

    // Send Email Notification
    const mailOptions = {
      from: '"Payment System"', // Sender address
      to: process.env.Payement_Admin_Mail, // Admin Email(s) (you can add multiple separated by commas)
      subject: "New Payment Received",
      html: `
               <div style="max-width:600px;margin:20px auto;padding:20px;border:1px solid #e0e0e0;border-radius:10px;background-color:#f9f9f9;font-family:Arial,sans-serif;">
  <div style="text-align:center;margin-bottom:20px;">
    <h2 style="color:#4CAF50;">🎉 New Payment Received!</h2>
    <p style="color:#555;">Payment details are listed below:</p>
  </div>

  <table style="width:100%;border-collapse:collapse;">
    <tbody>
      <tr>
        <td style="padding:10px 0;font-weight:bold;color:#333;">User:</td>
        <td style="padding:10px 0;color:#555;">${
          user.userName || user.Email
        }</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:10px 0;font-weight:bold;color:#333;">Plan:</td>
        <td style="padding:10px 0;color:#555;">${plan}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;font-weight:bold;color:#333;">Amount Paid:</td>
        <td style="padding:10px 0;color:#555;">$${amountPaid}</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:10px 0;font-weight:bold;color:#333;">Payment Method:</td>
        <td style="padding:10px 0;color:#555;">${paymentMethod}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;font-weight:bold;color:#333;">Transaction ID:</td>
        <td style="padding:10px 0;color:#555;">${transactionId}</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:10px 0;font-weight:bold;color:#333;">Date:</td>
        <td style="padding:10px 0;color:#555;">${new Date().toLocaleString()}</td>
      </tr>
    </tbody>
  </table>

  <div style="margin-top:30px;text-align:center;">
    <p style="font-size:14px;color:#888;">Thank you for using our services!</p>
  </div>
  <div style="text-align:center;margin-top:20px;">
    <p style="font-size:12px;color:#888;">Active this Account As soon As possibal</p>
</div>

            `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: `Payment added successfully and email sent. ${process.env.Payement_Admin_Mail}`,
      paymentHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addPayementHistory;
