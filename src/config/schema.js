const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    subscribedAt: { type: Date, default: Date.now },
    isSubscribed: { type: Boolean, default: true }
})

const newsletterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    sentAt: { type: Date, default: null }
})

const SubscriberModel = mongoose.model("Subscriber" , subscriberSchema);
const NewsLetterModel = mongoose.model("NewsLetter" , newsletterSchema);

module.exports = { SubscriberModel , NewsLetterModel };