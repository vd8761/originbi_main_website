import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { getContactAdminEmailTemplate, getContactUserEmailTemplate } from "./src/utils/emailTemplates.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // AWS SES Client
  const sesClient = new SESClient({
    region: process.env.AWS_REGION || "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const replyTo = process.env.EMAIL_REPLY_TO || "info@originbi.com";
      const bccAddresses = process.env.EMAIL_BCC ? [process.env.EMAIL_BCC] : [];

      // 1. Send email to Admin
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
              Data: getContactAdminEmailTemplate(name, email, message),
            },
          },
        },
      };

      // 2. Send "Thank You" email to User
      const userEmailParams = {
        Source: `"${process.env.EMAIL_SEND_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
        Destination: {
          ToAddresses: [email],
        },
        ReplyToAddresses: [replyTo],
        Message: {
          Subject: { Data: "Thank you for contacting Origin BI MindWorks" },
          Body: {
            Html: {
              Data: getContactUserEmailTemplate(name, email, message),
            },
          },
        },
      };

      await Promise.all([
        sesClient.send(new SendEmailCommand(adminEmailParams)),
        sesClient.send(new SendEmailCommand(userEmailParams)),
      ]);

      res.json({ success: true, message: "Emails sent successfully" });
    } catch (error) {
      console.error("Error sending email via SES:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
