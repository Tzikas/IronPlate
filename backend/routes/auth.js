const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

const passport = require('../config/passport');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then((user) => { 
      jwt.sign({user}, 'secretkey', { expiresIn: '1 hour' }, (err, token) => {
        req.login(user, function(err,result){
          res.status(201).json({...user._doc, token})
        })
      })
    })
    .catch((err) => { 
      console.log(err)
      res.status(500).json(err)
    });
});



router.get('/user', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.status(403).json(err);
    } else {
      res.status(200).json(authData.user)
    }
  });
});





router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  jwt.sign({user}, 'secretkey', { expiresIn: '1 hour' }, (err, token) => {
    res.status(200).json({...user._doc, token});
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
    res.status(403)//.json({err:'not logged in'});
  }

}







///BELOW SHOULD BE IN INDEX 



router.post('/new-post', verifyToken, (req, res, next) => {
  console.log(req.token, ' ------- ')
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.status(403).json(err);
    } else {
      console.log(req.body, 'made it here', authData.user)
      //res.status(200).json(authData.user)
      let post = req.body
      post.user = authData.user._id
      Post
        .create(post)
        .then(posted => res.status(200).json(posted))
        .catch(err => res.status(500).json(err))
    }
  });
})


router.post('/help', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.status(403).json(err);
    } else {
      let { post, help }  = req.body
      let update = help ? {helper:authData.user._id} : {helper: null}
      Post 
        .findByIdAndUpdate(post._id, update, {new:true})
        .then(posted => {  
          res.status(200).json(posted)
        })
        .catch(err => res.status(500).json(err))
    }
  })
})


router.get('/my-posts', verifyToken, (req, res, next) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.status(403).json(err);
    } else {
      Post
        .find({user:authData.user._id})
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json(err))
    }
    
  })
})


router.get('/other-posts', verifyToken, (req, res, next) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.status(403).json(err);
    } else {
      Post
        .find({helper:authData.user._id})
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json(err))
    }
    
  })
})




module.exports = router;
