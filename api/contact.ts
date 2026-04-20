import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import {
  getContactAdminEmailTemplate,
  getContactUserEmailTemplate,
} from "../src/utils/emailTemplates.js";

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, phone, country, state, city, message } = req.body || {};

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "Name, email, phone, and message are required" });
  }

  try {
    const replyTo = process.env.EMAIL_REPLY_TO || "info@originbi.com";
    const bccAddresses = process.env.EMAIL_BCC ? [process.env.EMAIL_BCC] : [];

    const adminEmailParams = {
      Source: `"${process.env.EMAIL_SEND_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      Destination: {
        ToAddresses: [process.env.ADMIN_EMAIL || "info@originbi.com"],
        CcAddresses: process.env.EMAIL_CC ? [process.env.EMAIL_CC] : [],
        BccAddresses: bccAddresses,
      },
      ReplyToAddresses: [replyTo],
      Message: {
        Subject: { Data: `New Contact Form Submission from ${name}` },
        Body: {
          Html: {
            Data: getContactAdminEmailTemplate(name, email, phone, country, state, city, message),
          },
        },
      },
    };

    const userEmailParams = {
      Source: `"${process.env.EMAIL_SEND_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      Destination: { ToAddresses: [email] },
      ReplyToAddresses: [replyTo],
      Message: {
        Subject: { Data: "Thank you for contacting Origin BI MindWorks" },
        Body: {
          Html: {
            Data: getContactUserEmailTemplate(name, email, phone, country, state, city, message),
          },
        },
      },
    };

    await Promise.all([
      sesClient.send(new SendEmailCommand(adminEmailParams)),
      sesClient.send(new SendEmailCommand(userEmailParams)),
    ]);

    return res.json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending email via SES:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
