const functions = require('firebase-functions');
var stripe = require('stripe')('sk_test_51GyfsTKeb3cwlfRwNFalBo32hS59a9qxS2tEgsJCKTOSHz4CGyryIZgX63Sd1nFItd9m33XY0zb1ApfOvmswaLRI00CHcvFiZC');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

    exports.CheckoutSession = functions.https.onRequest((request, response) => {

        stripe.checkout.sessions.create(
            {
                success_url: 'https://example.com/success',
                cancel_url: 'https://example.com/cancel',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: 'price_H5ggYwtDq4fbrJ',
                        quantity: 2,
                    },
                ],
                mode: 'payment',
            },
            function(err, session) {
                // asynchronously called
                response.send(session);
            }
            );

});
