const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});

console.log('super cool back end')

module.exports = router;
