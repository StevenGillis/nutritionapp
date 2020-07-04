var express = require('express');
var router = express.Router();

//const testFolder = './public/img/';
//const fs = require('fs');
const googleLabelController = require('../controllers/googleLabelController')
const GoogleLabelService =  googleLabelController.GoogleLabelService;

/* GET home page. */
router.get('/', async function(req, res) {
  //const photoNames = getPhotoNames();
  //console.log(photoNames);
  const photoName = '1593353185508-dish1.jpeg'
  const labelService = new GoogleLabelService(); 
  const labels = await labelService.getLabels(photoName); 
  res.render('index', { title: 'NutritionApp', Labels: labels})
});
/*
async function getPhotoNames() {
  const photoNames = [];
  await fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      console.log(file);
      photoNames.push(file);
    });
  });
  console.log(photoNames);
  return photoNames;
};*/

module.exports = router;
