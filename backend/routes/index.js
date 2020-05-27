const router = require('express').Router();
const User = require('../models/User');

router.get('/', (req, res, next) => {
  console.log('bla')
  res.status(200).json({ msg: 'Working' });
});

router.post('/cocktail', isAuth, (req, res, next) => {
  console.log('hi from back')
  console.log(req.body, req.user)
  User.findByIdAndUpdate(req.user._id, {$push: {favCocktails: req.body}}) .then(user => {
    res.json(user)
  })
})
function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}




module.exports = router;
