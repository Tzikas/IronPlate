const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then((user) => { 
      jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        req.login(user, function(err,result){
          res.status(201).json({...user._doc, token})
        })
      })
    })
    .catch((err) => { 
      console.log(err)
      res.status(500).json({ err })
    });
});



router.get('/profile', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      console.log('err', err)
      res.sendStatus(403);
    } else {
      User.findById(req.user._id).then((user) => res.status(200).json({ ...user, ...authData }))
    }
  });

});




router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.status(200).json({ token, ...user  });
  })
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
});


function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}



// Verify Token
function verifyToken(req, res, next) {
  console.log('verify')
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}




// router.post('/api/posts', verifyToken, (req, res) => {  
//   console.log('posts here')
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if(err) {
//       console.log('err', err)
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: 'Post created...',
//         authData
//       });
//     }
//   });
// });




module.exports = router;
