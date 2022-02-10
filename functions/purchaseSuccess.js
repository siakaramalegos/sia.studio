// FYI this full integration is not yet tested/working (was in parts before though)
const AWS = require("aws-sdk");
const S3_BUCKET = "sia-studio-downloads";
const environment = process.env.CONTEXT;

// Gotcha: AWS_ is a reserved prefix in netlify so you need to start it with something else
function getSignedUrl(filename) {
  AWS.config = new AWS.Config({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY,
    region: "us-east-1",
    signatureVersion: "v4",
  });

  const s3 = new AWS.S3();

  // 60 seconds for dev/staging or 1 week in production
  const expirationTime = environment !== "production" ? 60 : 604800

  return s3.getSignedUrl("getObject", {
    Key: filename,
    Bucket: S3_BUCKET,
    Expires: expirationTime,
  });
}

// Sendgrid
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const templateId = "d-a2083ee6711e419399ad3ecb0ec363cd";
const sgMail = require("@sendgrid/mail");
const fromEmail = "sia@sia.studio";

function sendDownloadEmail({ itemName, filename, url, userEmail }) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: userEmail,
    from: fromEmail, // the verified sender
    templateId,
    subject: "Sending with SendGrid is Fun", // TODO: delete if this is not used
    // TODO: add itemName to template for user friendly text
    dynamic_template_data: {
      itemName,
      filename,
      url,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

const environmentKeys = {
  production: {
    STRIPE_KEY: process.env.STRIPE_SECRET_KEY,
    WEBHOOK_KEY: process.env.STRIPE_WEBHOOK_SECRET,
  },
  other: {
    STRIPE_KEY: process.env.STRIPE_TEST_KEY,
    WEBHOOK_KEY: process.env.STRIPE_WEBHOOK_SECRET_TEST,
  },
};
const apiKeys =
  environment !== "production"
    ? environmentKeys.other
    : environmentKeys.production;
const stripe = require("stripe")(apiKeys.STRIPE_KEY);

console.log({apiKeys})

exports.handler = async function (event, context) {
  const { body, headers } = event;

  try {
    // 1. Check that the request is really from Stripe
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      apiKeys.WEBHOOK_KEY
    );

    // 2. Handle successful payments
    if (stripeEvent.type === "checkout.session.completed") {
      // Extract the checkout object itself from the event
      const eventObject = stripeEvent.data.object;

      const items = await stripe.checkout.sessions.listLineItems(
        eventObject.id,
        { expand: ["data.price.product"] }
      );

      // The aws digital download filename to fulfill the order
      const product = items.data[0]["price"]["product"];
      const filename = product.metadata.filename;
      const itemName = product.name;

      // Fulfilmment via aws and sendgrid ...
      const signedUrl = getSignedUrl(filename);

      // Prob needs to be async
      sendDownloadEmail({
        itemName,
        filename,
        url: signedUrl,
        userEmail: eventObject.customer_details.email,
      });
    }

    // Response sent back to stripe - everything is ok!
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};
