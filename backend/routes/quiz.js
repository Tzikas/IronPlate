const router = require('express').Router();
const Question= require ('../models/question')


router.get("/quiz", (req, res) => {
 console.log('made it to the backend')
 Question.find().then(questionDB=>{
     res.json(questionDB)
 })

});

module.exports = router;