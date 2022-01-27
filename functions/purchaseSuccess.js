// FYI this full integration is not yet tested/working (was in parts before though)
const AWS = require("aws-sdk");
const S3_BUCKET = "sia-studio-downloads";

// Gotcha: AWS_ is a reserved prefix in netlify so you need to start it with something else
function getSignedUrl(filename) {
  AWS.config = new AWS.Config({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY,
    region: "us-east-1",
    signatureVersion: "v4",
  });

  const s3 = new AWS.S3();

  return s3.getSignedUrl("getObject", {
    Key: filename,
    Bucket: S3_BUCKET,
    // Expires: 86400 * 7, // number of seconds in 1 day/24 hours * 7 = 1 week.
    Expires: 60, // 60 seconds.
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

exports.handler = async function (event, context) {
  // console.log({ event, context });
  const signedUrl = getSignedUrl(filename);

  // TODO: pass this data in from event or context or grab another way
  // Prob needs to be async
  sendDownloadEmail({
    itemName: "Mosaic coloring pages",
    filename: "MosaicMiniPackSmaller.pdf",
    url: signedUrl,
    userEmail: "info@sia.studio",
  });

  // TODO respond with Stripe webhook data - this is happening separate from the user interaction with the site
  return {
    statusCode: 200,
    body: JSON.stringify({ signedUrl }),
  };
};
