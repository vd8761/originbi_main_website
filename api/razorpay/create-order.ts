import type { VercelRequest, VercelResponse } from "@vercel/node";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { token } = req.body || {};

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
}
