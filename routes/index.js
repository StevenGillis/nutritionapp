var express = require('express');
var router = express.Router();

//const testFolder = './public/img/';
//const fs = require('fs');
const googleLabelController = require('../controllers/googleLabelController')
const GoogleLabelService =  googleLabelController.GoogleLabelService;

const photoController = require('../controllers/photoController')
const PhotoService = photoController.PhotoService;

/* GET home page. */
router.get('/', async function(req, res) {
  //const photoNames = getPhotoNames();
  //console.log(photoNames);
  var allPhotos = await PhotoService.list();
  const photoFilePath = allPhotos[1].filename;
  const labels = await getLabels(photoFilePath);
  res.render('index', { title: 'NutritionApp', Labels: labels, photoFilePath:photoFilePath})
});

function quickstart() {
  console.log('putton is pressed');
}

async function getLabels(photoFilePath) {
  const labelService = new GoogleLabelService(); 
  const labels = await labelService.getLabels(photoFilePath);
  const newPhoto = PhotoService.addLabel('5ef8a3e1f227a67a1a94d67c', '5ef8c6255d920f47d39d1c2d');
  return labels
}
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
