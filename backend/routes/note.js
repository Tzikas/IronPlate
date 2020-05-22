const router = require('express').Router();
const Question= require ('../models/question')


router.post("/note", (req, res) => {
 console.log('made it to the backend')
 Question.create(req.body).then(questionDB=>{
     res.json(questionDB)
 })

});
router.get("/note", (req, res) => {
    console.log('what')
    Question.find().then(noteDB=>{
        res.json(noteDB)
    })
   
   });


module.exports = router;