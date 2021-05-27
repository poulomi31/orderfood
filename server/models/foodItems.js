const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItems = new Schema(
    {
        "name": String,
        "image": String,
        "price": Number,
        "quantity": Number,
        "description": String
    },
    {
        'collection': "TastyFoodItems",
    }
);

module.exports = mongoose.model('TastyFoodItems', FoodItems)