const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const axios = require('axios')
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then((user) => {
      jwt.sign({ user }, 'secretkey', { expiresIn: process.env.JWT_EXP_TIME }, (err, token) => {
        req.login(user, function (err, result) {
          res.status(201).json({ ...user._doc, token })
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
    if (err) {
      res.status(403).json(err);
    } else {
      console.log(authData.user)
      User.findById(authData.user._id).then(user => {
        res.status(200).json(user)
      }).catch(err => res.status(500).json(err))
    }
  });
});





router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  jwt.sign({ user }, 'secretkey', { expiresIn: process.env.JWT_EXP_TIME }, (err, token) => {
    res.status(200).json({ ...user._doc, token });
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
  if (typeof bearerHeader !== 'undefined') {
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
    if (err) {
      res.status(403).json(err);
    } else {
      console.log(req.body, 'made it here', authData.user)
      //res.status(200).json(authData.user)
      let post = req.body
      post.user = authData.user._id
      Post
        .create(post)
        .then(posted => {

          User.findByIdAndUpdate(authData.user._id, { $inc: { points: -1 * posted.bounty } }, { new: true })
            .then(user => {
              notify(`${authData.user.name} added a new post.`)
              res.status(200).json({ posted, user })
            }).catch(err => console.error(err))

        })
        .catch(err => res.status(500).json(err))
    }
  });
})


router.post('/help', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      let { post, help } = req.body
      let update = help ? authData.user._id : null;
      console.log(post, 'help, ', help, authData.user._id)


      //Find Total number of posts being helped by user 
      Post.find({ helper: authData.user._id }).then(postsBeingHelped => {
        console.log(postsBeingHelped, 'postsBeingHelped')

        //Dont allow exceeding the limit
        if (help && postsBeingHelped.length >= Number(process.env.HELP_LIMIT)) {
          return res.status(403).json({ name: "HelpLimitExceeded", message: `You are limited to helping ${Number(process.env.HELP_LIMIT)} users.` })
        } else {

          //Find Post asking for help
          Post
            .findById(post._id)
            .then(posted => {

              //Check to see it's not already being helped
              if (posted.helper && posted.helper !== null && posted.helper != authData.user._id)
                return res.status(403).json({ name: "MultipleHelpers", message: "Helpee may only have one helper" })
              else
                //Save helper to post
                posted.helper = update
              posted.save((err, newPost) => {
                console.log('in save', err, newPost)
                if (err)
                  throw err
                if (help)
                  notify(`${post.user.name}'s post is being helped`)

                return res.status(200).json(newPost)
              })
            })
            .catch(err => res.status(500).json(err))
        }


      }).catch(err => console.error(err))
    }
  })
})

//curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/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

router.get('/my-posts', verifyToken, (req, res, next) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Post
        .find({ user: authData.user._id, resolved:false })
        .populate('helper')
        .then(posts => {

          res.status(200).json(posts)
        })
        .catch(err => res.status(500).json(err.message))
    }

  })
})


router.get('/resolved-posts', verifyToken, (req, res, next) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Post
        .find({ helper: authData.user._id, resolved:true })
        .populate('helper')
        .then(posts => {

          res.status(200).json(posts)
        })
        .catch(err => res.status(500).json(err.message))
    }
  })
})


router.get('/others-resolve-my-posts', verifyToken, (req, res, next) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Post
        .find({ user: authData.user._id, resolved:true })
        .populate('helper')
        .then(posts => {
          res.status(200).json(posts)
        })
        .catch(err => res.status(500).json(err.message))
    }
  })
})

router.get('/other-posts', verifyToken, (req, res, next) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      Post
        .find({ helper: authData.user._id, resolved:false}) //resolved:false
        .populate('user')
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json(err))
    }

  })
})



router.post('/resolve-post', verifyToken, (req, res, next) => {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      let { post, resolved } = req.body
      console.log(post, resolved)
      let x = 1;
      if (resolved)
        x = -1
      Post
        .findByIdAndUpdate(post._id, { resolved: resolved }, { new: true })
        .then(posted => {
          console.log(post.helper, ' helper ==> should recieve cash')
          if (post.helper) {
            console.log(post.user, authData.user._id, 'user ==> helpee ==> should pay cash')
            User //User who created the post should pay the bounty
              //x*post.bounty
              .findByIdAndUpdate(post.user, { $inc: { points: 0 } }, { new: true })
              .then(helpee => {
                User //User who is the helper should recieve the bounty 
                  .findByIdAndUpdate(post.helper, { $inc: { points: -1 * x * post.bounty } }, { new: true })
                  .then(helper => {
                    if (x === -1)
                      notify(`${helper.name} has helped ${helpee.name} and earned ${posted.bounty} points`)
                    res.status(200).json({ posted, helpee, helper })
                  }).catch(err => {
                    console.log(err, 'err3')
                    res.status(500).json(err)
                  })
              })
              .catch(err => {
                console.log(err, 'err2')
                res.status(500).json(err)
              })


          } else {

            res.status(200).json(posted)

          }

        })
        .catch(err => {
          console.log(err, 'err')
          res.status(500).json(err)
        })


    }

  })

})

router.post('/cancel-post', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      let { post } = req.body
      console.log('delete', post)
      Post
        .findByIdAndDelete(post._id)
        .then(dPost => {
          console.log('dPost',dPost)
          if(!dPost){
            return res.status(500).json({ name:"PostDeleted", message: "Post already deleted"})
          } else { 
            User
              .findByIdAndUpdate(authData.user._id, { $inc: { points: post.bounty } }, { new: true })
              .then(user => {
                console.log(user)
                res.status(200).json({ dPost, user })
              }).catch(err => res.status(500).json(err))
          }
      }).catch(err => res.status(500).json(err))

    }
  })
})


router.post('/calendly', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User
        .findByIdAndUpdate(authData.user._id, req.body, { upsert: true, new: true })
        .then(user => {
          console.log(user, 'calendly')
          res.status(200).json({ user })
        }).catch(err => res.status(500).json(err))
    }
  })
})


function notify(message) {
  console.log('notify', message)
  // axios.post(process.env.SLACK_HOOK, `{"text":"${message}"}`)
  //   .then(res=>console.log(res.message)).catch(err=>console.error(err.message))

}



module.exports = router;
