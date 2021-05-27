var express = require('express');
const fs = require('fs');
var router = express.Router();

const path = `${__dirname}/JSONdata`;
/* GET home page. */
router.get('/', function (req, res) {
  fs.readFile(`${path}/data.json`, function (err, data) {
    if (err) {
      console.log("Error in reading file", err);
    }
    else {
      const dataFromFile = JSON.parse(data);
      res.send(dataFromFile);
      console.log()
    }
  })
})

module.exports = router;
