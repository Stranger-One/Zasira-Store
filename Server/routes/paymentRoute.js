import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/PaymentModel.js";

const router = express.Router();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/order", (req, res) => {
  const { amount } = req.body;
  console.log("Received body:", req.body);

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const options = {
      amount: Number(amount * 100), // convert to paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error("Razorpay error:", error);
        return res
          .status(500)
          .json({ message: "Something Went Wrong!", error });
      }
      console.log("Order created:", order);
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.error("Catch block error:", error);
    res.status(500).json({ message: "Internal Server Error!", error });
  }
});

router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    if (isAuthentic) {
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      await payment.save();

      res.json({
        message: "Payement Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

export default router;
