const stripeKey = process.env.STRIPE_TEST_KEY;
// DON'T DO IN REAL LIFE - SAVE AS A SECRET ENV VAR
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST;
// "whsec_399d6b3c72677877ad521a10a0f341894e06deb279282421c38077a6bfbdd830";
// process.env.STRIPE_WEBHOOK_SECRET;
const stripe = require("stripe")(stripeKey);

const AWS = require("aws-sdk");
const S3_BUCKET = "sia-studio-downloads";

// Sendgrid
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const templateId = "d-a2083ee6711e419399ad3ecb0ec363cd";
const sgMail = require("@sendgrid/mail");
const fromEmail = "sia@sia.studio";

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
  const expirationTime = 20;

  return s3.getSignedUrl("getObject", {
    Key: filename,
    Bucket: S3_BUCKET,
    Expires: expirationTime,
  });
}

exports.handler = async function (event, context) {
  const { body, headers } = event;

  try {
    // Check that the event really came from Stripe
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      webhookSecret
    );

    if (stripeEvent.type === "checkout.session.completed") {
      const eventObject = stripeEvent.data.object;

      const items = await stripe.checkout.sessions.listLineItems(
        eventObject.id,
        { expand: ["data.price.product"] }
      );

      // The data I need for fulfillment
      const product = items.data[0]["price"]["product"];
      const filename = product.metadata.filename;
      const itemName = product.name;

      // Fulfillment
      const signedUrl = getSignedUrl(filename);

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: eventObject.customer_details.email,
        from: fromEmail, // the verified sender
        templateId,
        dynamic_template_data: {
          itemName,
          filename,
          url: signedUrl,
        },
      };

      // TODO: catch errors
      await sgMail.send(msg);
      console.log("Email sent!");
    }
  } catch (err) {
    console.error(`Stripe webhook failed with ${err}.`);
    return {
      statusCode: 400,
      body: `Webhook error: ${err}`,
    };
  }

  return {
    statusCode: 200,
  };
};
