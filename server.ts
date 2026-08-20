import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";
import { getContactAdminEmailTemplate, getContactUserEmailTemplate } from "./src/utils/emailTemplates.js";

import fs from 'fs';

// Try loading .env.local first, then fallback to .env
if (fs.existsSync(path.resolve(process.cwd(), '.env.local'))) {
    dotenv.config({ path: '.env.local', override: true });
} else {
    dotenv.config();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 5000;

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
    const { name, email, phone, country, state, city, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "Name, email, phone, and message are required" });
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
              Data: getContactAdminEmailTemplate(name, email, phone, country, state, city, message),
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
              Data: getContactUserEmailTemplate(name, email, phone, country, state, city, message),
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

  // Razorpay Order Creation Route
  app.post("/api/razorpay/create-order", async (req, res) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ error: "Missing authentication token" });
      }

      let decodedPayload: any;
      try {
        if (!process.env.CROSS_DOMAIN_SECRET) {
          throw new Error("Server configuration error: missing CROSS_DOMAIN_SECRET");
        }
        decodedPayload = jwt.verify(token, process.env.CROSS_DOMAIN_SECRET as string);
      } catch (err: any) {
        return res.status(401).json({ error: "Invalid or expired token", details: err.message });
      }

      const { amount, name, email, phone, tier, linkedin } = decodedPayload;

      const razorpay = new Razorpay({
        key_id: process.env.VITE_RAZORPAY_KEY_ID as string,
        key_secret: process.env.RAZORPAY_KEY_SECRET as string,
      });

      const options = {
        amount: amount * 100, // in paise
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: { tier, email },
      };

      const order = await razorpay.orders.create(options);

      return res.json({
        orderId: order.id,
        amount: options.amount,
        name,
        email,
        phone,
        tier,
        linkedin
      });
    } catch (error) {
      console.error("Razorpay Order Creation Error:", error);
      return res.status(500).json({ error: "Failed to create order", details: error instanceof Error ? error.message : JSON.stringify(error) });
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
