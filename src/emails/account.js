const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  try {
    sgMail.send({
      to: email,
      from: "mike.fa96@gmail.com",
      subject: "Thanks for joining in!",
      text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
    });
  } catch (e) {
    console.log(e.message);
  }
};

const sendCancelEmail = (email, name) => {
  try {
    sgMail.send({
      to: email,
      from: "mike.fa96@gmail.com",
      subject: "Goodbye and Thanks!",
      text: `Thanks ${name}. We hope we see you soon`,
    });
  } catch (e) {
    console.log(e.message);
  }
};

exports.sendWelcomeEmail = sendWelcomeEmail;

exports.sendCancelEmail = sendCancelEmail;
