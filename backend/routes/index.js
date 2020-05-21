const router = require('express').Router();
const Question= require ('../models/question')

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});

module.exports = router
