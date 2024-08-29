require('dotenv').config();
const express = require('express');
const router = express.Router();
const Stripe = require('stripe')('sk_test_51P4n8CSFPT5T34uN4WmuyaH7nCPFIPxXDMJeYFwBIQtBDBLyAykK612fUpFgj5Zk8TUiz7u9FVLxEl9RRRG4L8TQ00IgB64NPB');

router.post('/stripe', async (req, res) => {
  const data = req.body;

  try {
    const lineItems = await Promise.all(
      data.map(async (item) => {
        return {
          price_data: {
            currency: 'INR',
            product_data: {
              name: item.name.toUpperCase(),
            },
            unit_amount: item.price * 100,
          },
          quantity: item.Qty,
        };
      })
    );

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: 'http://localhost:3000/products',
      cancel_url: 'http://localhost:3000/cart',
    });

    res.json({ url: session.url, success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
