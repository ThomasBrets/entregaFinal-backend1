// services/emailService.js
import { transporter, emailPurchaseConfig } from "../config/nodemailer.js";

export const sendPurchaseEmailService = async (user, items, total) => {
  try {
    const mailOptions = emailPurchaseConfig(user, items, total);
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("❌ Error enviando correo:", error);
    throw new Error("Error al enviar correo de compra");
  }
};


