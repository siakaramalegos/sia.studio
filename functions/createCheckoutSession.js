exports.handler = async function (event, context) {
  const environment = process.env.CONTEXT
  const api_key = environment !== "production"
    ? process.env.STRIPE_TEST_KEY
    : process.env.STRIPE_SECRET_KEY;

  // https://stripe.com/docs/payments/accept-a-payment?integration=checkout
  const stripe = require("stripe")(api_key);

  const referer = event.headers.referer;
  // JSON.parse doesn't work here
  const params = new URLSearchParams(event.body);
  const price_id = params.get("price_id");

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price_id,
        quantity: 1,
      },
    ],
    mode: "payment",
    // TODO: customize thanks page with order details https://stripe.com/docs/payments/checkout/custom-success-page
    success_url: "https://sia.studio/thanks",
    // go back to page that they were on
    cancel_url: referer,
  });

  return {
    statusCode: 303,
    headers: {
      Location: session.url,
    },
  };
};

// TODO:
// switch test/prod mode automatically
// handle errors - e.g., missing 'mode'
// customize thank you page https://stripe.com/docs/payments/checkout/custom-success-page
// Webhook - https://stripe.com/docs/webhooks
// Webhook signature for security https://stripe.com/docs/webhooks/signatures
