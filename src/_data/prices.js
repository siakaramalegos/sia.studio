const api_key =
  process.env.NODE_ENV === "development"
    ? process.env.STRIPE_TEST_KEY
    : process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(api_key);

// One product can have multiple prices but for my use case, it's 1:1 so this works without having to massage the data
// TODO: add Expanding data docs link
async function getPrices() {
  const response = await stripe.prices.list({
    expand: ["data.product"],
  });
  return response.data;
}

module.exports = async function () {
  return await getPrices();
};
