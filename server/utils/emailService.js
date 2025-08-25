const nodemailer = require("nodemailer")

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Send welcome email
const sendWelcomeEmail = async (user) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Welcome to DonateLink - Seva Sahayog Foundation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Welcome to DonateLink!</h2>
          <p>Dear ${user.name},</p>
          <p>Thank you for joining DonateLink, the donation matching platform by Seva Sahayog Foundation.</p>
          <p>Your account has been created successfully as a <strong>${user.role}</strong>.</p>
          <p>You can now:</p>
          <ul>
            ${
              user.role === "donor"
                ? "<li>List items you want to donate</li><li>Browse donation requests from receivers</li>"
                : "<li>Post requests for items you need</li><li>Browse available donations</li>"
            }
            <li>Connect with other users through our messaging system</li>
            <li>Track your donation impact</li>
          </ul>
          <p>Together, we can make a difference in our communities!</p>
          <p>Best regards,<br>The DonateLink Team</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("Welcome email sent to:", user.email)
  } catch (error) {
    console.error("Error sending welcome email:", error)
  }
}

// Send notification email
const sendNotificationEmail = async (user, subject, message) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `DonateLink - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">DonateLink Notification</h2>
          <p>Dear ${user.name},</p>
          <p>${message}</p>
          <p>Visit your dashboard to take action.</p>
          <p>Best regards,<br>The DonateLink Team</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("Notification email sent to:", user.email)
  } catch (error) {
    console.error("Error sending notification email:", error)
  }
}

module.exports = {
  sendWelcomeEmail,
  sendNotificationEmail,
}
