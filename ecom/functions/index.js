const functions = require("firebase-functions");
var conekta = require("conekta");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.conektaPayment = functions.https.onCall((data) => {
  functions.logger.log("info", data);
  conekta.api_key = "9YxqfRnx4sMQDnRsqdYn";
  conekta.locale = "es";

  return new Promise((resolve, reject) => {
    conekta.Order.create({
      currency: "MXN",
      customer_info: {
        name: "Jul Ceballos",
        phone: "+5215555555555",
        email: "jul@conekta.io",
      },
      line_items: [
        {
          name: "Box of Cohiba S1s",
          unit_price: 35000,
          quantity: 1,
        },
      ],
      charges: [
        {
          payment_method: {
            type: "card",
            token_id: "tok_test_visa_4242",
          },
        },
      ],
    })
      .then(function (result) {
        resolve(result.toObject());
      })
      .catch(function (error) {
        functions.logger.log("error", error);
        reject(new Error("Error: something goes wrong ! " + error));
      });
  });
});
