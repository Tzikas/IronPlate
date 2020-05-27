const router = require('express').Router();

router.get('/', (req, res, next) => {
  console.log('bla')
  res.status(200).json({ msg: 'Working' });
});

router.post('/cocktail', (req, res, next) => {
  console.log('hi from back')
  console.log(req)
})

module.exports = router;
