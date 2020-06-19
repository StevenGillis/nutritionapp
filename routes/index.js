var express = require('express');
var router = express.Router();

var labelservice = require('../services/labelServiceGoogle')

/* GET home page. */
router.get('/', async function(req, res, next) {
  labels = await quickstart()    
  res.render('index', { title: 'NutritionApp', Labels: labels})
  console.log(labels);
});

async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection('./public/images/dish3.jpg');
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
  return labels
}

module.exports = router;
