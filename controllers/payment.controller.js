const Stripe = require("stripe")
const stripe = new Stripe('sk_test_...');

exports.makePayment = async (req,res) => {
    const customer = await stripe.customers.create({
      email: req.body.email,
      source: req.body.token,
      name: req.body.name,

    })
    .then((customer) => {
        return stripe.charges.create({
            amount: req.body.amount, 
            description: req.body.desc,
            currency: req.body.currency,
            customer: customer
        })
    })
    .then((charge) => {
        res.send("Success")  
    })
    .catch((err) => {
        res.send(err)       
    });
}