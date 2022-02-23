const environment = process.env.CONTEXT
const api_key = environment !== "production"
  ? process.env.STRIPE_TEST_KEY
  : process.env.STRIPE_SECRET_KEY
const stripe = require("stripe")(api_key)

// One product can have multiple prices but in my case it's 1:1 so this is the easiest way to pull in products
async function getPrices() {
  const response = await stripe.prices.list({
    expand: ["data.product"],
  })
  return response.data.filter(price => price.active)
}

// TODO: catch errors
module.exports = async function () {
  return await getPrices()
}
