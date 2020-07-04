const express = require('express');
const router = express.Router();
const app = express();
const labelController = require('../controllers/labelController');
const flash = require('express-flash');
const label = require('../models/labelModel');

// flash messaging
router.use(flash());

router.get('/', (req, res, next)=>{
  label.find({})
    .then((labels)=>{
      res.render('labels', {
        labels : labels,
        flashMsg: req.flash("fileUploadError")
      });
    })
    .catch((err)=>{
      if (err) {
        res.end("ERROR!");
      }
    });
});

router.get('/:labelid', (req, res, next)=>{
  console.log("finding "+req.params.labelid);
  Label.findOne({'_id': req.params.labelid})
    .then((label)=>{
      res.render('updateLabel', {
        label: label,
        flashMsg: req.flash("labelFindError")
      });
    }).catch((err)=>{
      if (err) console.log(err);
    });
});

router.post('/:labelid', (req, res, next)=>{
  Label.findOne({'_id': req.params.labelid})
    .then((label)=>{
      var data  = {
         name: req.body.name,
         description: req.body.description
         }
      label.set(data);
      label.save().then(()=>{
        res.redirect('/labels');
      });
    })
    .catch((err)=>{
      if (err) console.log(err);
  });
});

// handle errors
router.use(function(err, req, res, next){
  console.error(err.stack);
  if (err.message == "OnlyImageFilesAllowed"){
      req.flash('fileUploadError', "Please select an image file with a jpg, png, or gif filename extension.");
      res.redirect('/labels');
  } else if (err.message == "LabelSaveError"){
    req.flash('labelSaveError', "There was a problem saving your label.");
    res.redirect('/labels');
  } else{
     next(err);
  }
});

module.exports = router;