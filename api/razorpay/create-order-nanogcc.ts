import type { VercelRequest, VercelResponse } from "@vercel/node";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";

/**
 * Same shape as api/razorpay/create-order.ts (dosmembership), but for the
 * touchmark-nano-gcc checkout.
 *
 * Two deliberate differences from the dosmembership endpoint, both required
 * by nanogcc's own webhook contract (see ORIGINBI-INTEGRATION.md in that
 * repo):
 *
 *  - `amount` arrives already in paise, so it is NOT multiplied by 100 here
 *    the way create-order.ts does for dosmembership's rupee amounts.
 *  - the Razorpay order carries `notes.order_ref` / `notes.site` and a
 *    `receipt` equal to nanogcc's own order reference, so nanogcc's
 *    server-side Razorpay webhook (its payment guarantee, independent of
 *    this checkout page) can identify the event as its own and its cron
 *    reconciliation can search Razorpay by receipt.
 */
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

    let claims: any;
    try {
      if (!process.env.CROSS_DOMAIN_SECRET) {
        throw new Error("Server configuration error: missing CROSS_DOMAIN_SECRET");
      }
      // Pin the algorithm - without it a forged token could declare "alg":"none".
      claims = jwt.verify(token, process.env.CROSS_DOMAIN_SECRET as string, {
        algorithms: ["HS256"],
      });
    } catch (err: any) {
      return res.status(401).json({ error: "Invalid or expired token", details: err.message });
    }

    const { ref, amount, currency, name, email, phone, organization, tier } = claims;

    if (!ref || !amount) {
      return res.status(400).json({ error: "Malformed token" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.VITE_RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    const order = await razorpay.orders.create({
      amount,                        // already paise - do not multiply
      currency: currency || "INR",
      receipt: ref,                  // nanogcc's own order reference
      notes: {
        order_ref: ref,
        site: "nanogcc",             // lets nanogcc's webhook ignore dosmembership's traffic on the same account
        tier: tier || "",
        email: email || "",
      },
    });

    return res.json({
      orderId: order.id,
      ref,
      amount,
      currency: currency || "INR",
      name,
      email,
      phone,
      organization,
      tier,
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error (nanogcc):", error);
    return res.status(500).json({
      error: "Failed to create order",
      details: error instanceof Error ? error.message : JSON.stringify(error),
    });
  }
}
