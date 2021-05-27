const express = require('express');
const fs = require('fs')
const router = express.Router();
const FoodItemsModal = require('../models/foodItems')

const path = `${__dirname}/JSONdata`;

router.post('/add', function (req, res) {
  console.log(req.body);
  const FoodItem = new FoodItemsModal(req.body);
  FoodItem.save(function (err) {
    if (err) {
      res.status(400).send({ "message": err })
    }
    else {
      res.status(200).send("Food item added Successfully")
    }
  })
})


router.put("/updateFoodItems", function(req, res){
  GroceryModal.findOneAndUpdate({
      "_id": req.body._id,
  }, {
      "quantity": this.quantity + 1
  }, function(err){
      if(err){
          console.log("err", err);
          res.status(400).send({
              message: err,
          })
      }else{
          res.send("Purchases status updated Successfully");
      }
  })
})

/* GET users listing. */


router.get('/:id', function (req, res) {
  const id = req.params.id;
  fs.readFile(`${path}/data.json`, function (err, data) {
    if (err) {
      console.log("Error in reading file", err);
    }
    else {
      const dataFromFile = JSON.parse(data);
      const subItem = dataFromFile.results.filter(u => u.id == id);
      console.log(subItem);
      res.send({ "result": subItem });
      console.log()
    }
  })
})

module.exports = router;
