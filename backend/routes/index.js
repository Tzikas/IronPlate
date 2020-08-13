const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});


router.get('/all-posts', (req, res, next) => {
  Post
    .find()
    .populate('user')
    .populate('helper')
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json(err))
})

// JWT NOT WORKING IN MULTIPLE ROUTES **FIX ME** 

// router.post('/new-post', verifyToken, (req, res, next) => {
//   console.log(req.token)
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if(err) {
//       res.status(403).json(err);
//     } else {
//       res.status(200).json(authData.user)


//     }
//   });
// })



// // Verify Token
// function verifyToken(req, res, next) {
//   console.log('verify')
//   // Get auth header value
//   const bearerHeader = req.headers['authorization'];
//   // Check if bearer is undefined
//   if(typeof bearerHeader !== 'undefined') {
//     // Split at the space
//     const bearer = bearerHeader.split(' ');
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.status(403)//.json({err:'not logged in'});
//   }

// }



module.exports = router;
