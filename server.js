// This test secret API key is a placeholder. Don't include personal details in requests with this key.
// To see your test secret API key embedded in code samples, sign in to your Stripe account.
// You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51S2f3rLNlxAWz3IqBzCqrf9KOneFhwSx51xLjKKOtg0Cnkdi5i2v0J2WvtDUHsjYNs7qH2aUIEGKuBWBC3VSbC4R00uZ6MuIEW');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const priceId = process.env.STRIPE_PRICE_ID;
  
  if (!priceId || priceId === 'price_REPLACE_ME') {
    return res.status(500).json({
      error: 'Please set STRIPE_PRICE_ID environment variable with a valid Stripe Price ID'
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));