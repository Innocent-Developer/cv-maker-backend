const AccountCreate = require("../Schema/accountcreate");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your password
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer connection error:", error);
  } else {
    console.log("Nodemailer is ready to send emails ✉️");
  }
});

const sendPlanEmail = async (userEmail, userName, action, newPlan) => {
  let subject = "";
  let html = "";

  if (action === "upgrade") {
    subject = "Your Plan Has Been Upgraded!";
    html = `
    <body style="margin:0; padding:0; background-color:#f4f4f7; font-family: 'Segoe UI', sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <tr>
                <td style="background: linear-gradient(90deg, #4f46e5, #3b82f6); padding: 30px; color: #ffffff; text-align: center;">
                  <h1 style="margin: 0; font-size: 28px;">🎉 Congratulations, ${userName}!</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; text-align: center; color: #333;">
                  <p style="font-size: 18px; margin: 20px 0;">
                    You've successfully upgraded to the <strong style="color: #4f46e5;">${newPlan}</strong> plan. 🚀
                  </p>
                  <p style="font-size: 16px; margin: 20px 0; color: #555;">
                    Get ready to enjoy all the amazing features and exclusive benefits waiting for you!
                  </p>
                  <a href="https://yourwebsite.com/dashboard" 
                     style="display: inline-block; margin-top: 25px; padding: 12px 25px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px;">
                     Go to Dashboard
                  </a>
                </td>
              </tr>
              <tr>
                <td style="background: #f4f4f7; padding: 20px; text-align: center; font-size: 12px; color: #aaa;">
                  <p style="margin: 0;">Thank you for choosing us ❤️</p>
                  <p style="margin: 0;">&copy; 2025 YourCompany, All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    `;
  } else if (action === "downgrade") {
    subject = "Your Plan Has Been Downgraded";
    html = `
    <body style="margin:0; padding:0; background-color:#f9fafb; font-family:'Segoe UI', sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
              <tr>
                <td style="background-color: #3b82f6; padding: 25px; text-align: center; color: #ffffff;">
                  <h1 style="margin:0; font-size:26px;">Hello, ${userName} 👋</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:30px; text-align:center; color:#374151;">
                  <p style="font-size:18px; margin-bottom:20px;">
                    Your subscription has been changed to the 
                    <strong style="color:#3b82f6;">${newPlan}</strong> plan.
                  </p>
                  <p style="font-size:16px; color:#6b7280; margin-bottom:20px;">
                    We're still here to help you make the most out of your experience.
                  </p>
                  <p style="font-size:16px; color:#6b7280; margin-bottom:30px;">
                    Thank you for staying with us!
                  </p>
                  <a href="https://yourwebsite.com/support" 
                     style="display:inline-block; padding:12px 24px; background-color:#3b82f6; color:#ffffff; text-decoration:none; border-radius:8px; font-size:16px;">
                     Contact Support
                  </a>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
                  <p style="margin:0;">&copy; 2025 YourCompany. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    `;
  } else if (action === "cancel") {
    subject = "Your Plan Has Been Canceled";
    html = `
    <body style="margin:0; padding:0; background-color:#f9fafb; font-family:'Segoe UI', sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden;">
              <tr>
                <td style="background-color: #f97316; padding: 25px; text-align: center; color: #ffffff;">
                  <h1 style="margin:0; font-size:26px;">Hi, ${userName} 🌟</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:30px; text-align:center; color:#374151;">
                  <p style="font-size:18px; margin-bottom:20px;">
                    We're sorry to see you go! Your plan has been canceled as of today.
                  </p>
                  <p style="font-size:16px; color:#6b7280; margin-bottom:20px;">
                    If you change your mind, we're always here to welcome you back with open arms.
                  </p>
                  <p style="font-size:16px; color:#6b7280; margin-bottom:30px;">
                    Take care and stay awesome! 💛
                  </p>
                  <a href="https://yourwebsite.com/renew" 
                     style="display:inline-block; padding:12px 24px; background-color:#f97316; color:#ffffff; text-decoration:none; border-radius:8px; font-size:16px;">
                     Rejoin Anytime
                  </a>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f9fafb; padding:20px; text-align:center; font-size:12px; color:#9ca3af;">
                  <p style="margin:0;">&copy; 2025 YourCompany. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    `;
  }

  try {
    await transporter.sendMail({
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject,
      html,
    });
    console.log(`Email sent to ${userEmail} for ${action} action`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const updatePlan = async (req, res) => {
  const { userId, newPlan, action } = req.body;
  // action = "upgrade", "downgrade", "cancel"

  if (!userId || !action) {
    return res.status(400).json({ message: "User ID and action are required" });
  }

  try {
    const user = await AccountCreate.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (action === "upgrade" || action === "downgrade") {
      if (!newPlan) {
        return res.status(400).json({
          message: "New plan must be specified for upgrade/downgrade",
        });
      }

      user.plan = newPlan;
      user.planStatus = "active";
      user.planStartDate = new Date();

      const oneMonthLater = new Date();
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
      user.planEndDate = oneMonthLater;
    } else if (action === "cancel") {
      user.planStatus = "canceled";
      user.planEndDate = new Date(); // cancel immediately
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await user.save();

    // Send email
    await sendPlanEmail(
      user.Email,
      user.userName || user.name || "User",
      action,
      newPlan
    );

    res.status(200).json({ message: `Plan ${action} successful`, user });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ message: "Error updating plan", error: error.message });
  }
};

module.exports = updatePlan;
