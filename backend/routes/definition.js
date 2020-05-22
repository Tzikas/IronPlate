const router = require('express').Router();
const definition= require ('../models/definition')


router.get("/definition", (req, res) => {
 console.log('made it to the backend')
 definition.find().then(definitionDB=>{
     res.json(definitionDB)
 })

});

module.exports = router;