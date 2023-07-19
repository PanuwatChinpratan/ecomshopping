import { stripe } from "../../../../utils/stripe";

const { validateCartItems } = require("use-shopping-cart/utilities");

export default async function handler(req, res) {
  if (req.method === "POST") {  //รับข้อมูลที่ส่งมาจาก cart(cartDetails)
    try {
      const cartDetails = req.body; // เก็บลงไปในตัวแปร
      const inventory = await stripe.products.list({
        expand: ["data.default_price"],
      });
      const products = inventory.data.map((product) => {
        const price = product.default_price;
        return {
          currency: price.currency,
          id: product.id,
          name: product.name,
          price: price.unit_amount,
          image: product.images[0],
        };
      });
      const lineItems = validateCartItems(products, cartDetails); //ตรวจสอบ cartDetails match กับ products กี่อันแล้วแสดงออกมาใน session
      const session = await stripe.checkout.sessions.create({ //สร้าง
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineItems,
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`, //สำเร็จไปหน้านี้ต่อ
        cancel_url: `${req.headers.origin}/cart`, //กลับหน้า cart
      });
      res.status(200).json(session);
    } catch (error) {
      console.log(error);
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
