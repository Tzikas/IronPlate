const router = require('express').Router();
const Notes= require ('../models/notes')


router.post("/note", (req, res) => {
 console.log('made it to the backend')
 Notes.create(req.body).then(questionDB=>{
     res.json(questionDB)
 })

});
router.get("/note", (req, res) => {
    Notes.find().then(noteDB=>{
        res.json(noteDB)
    })
   
   });


module.exports = router;