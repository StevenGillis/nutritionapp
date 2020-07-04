const express = require('express');
const router = express.Router();
const labelController = require('../../controllers/labelController');
const LabelService = labelController.LabelService;

router.use((req, res, next)=>{
  res.set({
  // allow any domain, allow REST methods we've implemented
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    "Access-Control-Allow-Headers": "Content-Type",
  // Set content-type for all api requests
    'Content-type':'application/json'
  });
  if (req.method == 'OPTIONS'){
    return res.status(200).end();
  }
  next();
});

// read
router.get('/', (req, res, next)=>{
   LabelService.list()
    .then((label) => {
      console.log(`API: List images: ${label}`);
      res.status(200);
      res.send(JSON.stringify(label));
    });
  console.log("placeholder")
});

// read
router.get('/:labelid', (req, res, next)=>{
  console.log(`finding ${req.params.labelid}`);
  LabelService.read(req.params.labelid)
    .then((label) => {
     console.log(`Found images: ${label}`);
     res.status(200);
     res.send(JSON.stringify(label));
   }).catch((err)=>{
     res.status(404);
     res.end();
   });
});

//update
router.put('/:labelid', (req, res, next)=>{
  console.log(`putting ${req.params.labelid}`);
  let putdata = req.body;
  LabelService.update(req.params.labelid, putdata)
    .then((updatedLabel)=>{
      res.status(200);
      res.send(JSON.stringify(updatedLabel));
    }).catch((err)=> {
      res.status(404);
      res.end();
    });
 });

//  since the file comes in via POSTed FormData
router.post('/', async (req, res, next)=>{
  const label  = {
        name: req.body.name,
        description: req.body.description
        }
        console.log(req.body.name)
 try{
    const labelSave = await LabelService.create(label);
    res.status(201);
    res.send(JSON.stringify(labelSave));
  }catch(err){
    console.log(err);
    throw new Error("LabelSaveError", label);
  }
});

// delete
router.delete('/:labelid', (req, res, next)=>{
  let id = req.params.labelid;
  LabelService.delete(req.params.labelid)
    .then((label) => {
     console.log(`Deleted image: ${id}`);
     res.status(200);
     res.send(JSON.stringify(label));
   }).catch((err)=> {
     res.status(404);
     res.end();
   });;
});

// error
router.use(function(err, req, res, next){
  console.error(err);
  res.status(500);
  res.end();
});

module.exports = router;