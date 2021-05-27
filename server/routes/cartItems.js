const express = require('express');
const router = express.Router();
const FoodItemsModal = require('../models/foodItems')

router.get("/getAll", function (req, res) {
    FoodItemsModal.find({}, { __v: 0 }, function (err, data) {
        if (err) {
            console.log(err);
            res.status(400).send({
                message: err,
            })
        } else {
            console.log(data);
            res.send({ results: data });
        }
    }
    )
})

router.delete("/deleteFoodItem", function(req, res) {
    const foodItemId = req.body._id;
    FoodItemsModal.remove({_id: foodItemId}, function(err){
        if(err){
            console.log("err", err);
            res.status(400).send({
                message: err,
            })
        }else{
            res.status(200).send({"result": "Grocery Item removed successfully"}   );
        }
    })
})

router.delete("/deleteAll", function(req, res) {
    FoodItemsModal.remove({}, function(err){
        if(err){
            console.log("err", err);
            res.status(400).send({
                message: err,
            })
        }else{
            res.status(200).send({"result": "Grocery Item removed successfully"}   );
        }
    })
})

module.exports = router;
