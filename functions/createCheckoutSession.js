const environment = process.env.CONTEXT

const apiKey = environment !== "production"
  ? process.env.STRIPE_TEST_KEY
  : process.env.STRIPE_SECRET_KEY
const stripe = require("stripe")(apiKey)

exports.handler = async function (event, context) {
  const referer = event.headers.referer
  // JSON.parse doesn't work here
  const params = new URLSearchParams(event.body)
  const price_id = params.get("price_id")

  // TODO: add try/catch
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price_id,
        quantity: 1,
      }
    ],
    mode: "payment",
    // TODO: customize thanks page with order details https://stripe.com/docs/payments/checkout/custom-success-page
    success_url: "https://sia.studio/thanks/",
    cancel_url: referer,
  })

  return {
    statusCode: 303,
    headers: {
      Location: session.url
    }
  }
}
