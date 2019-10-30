const express = require('express');

const router = express.Router();


//importing user db
const userDB = require('./userDb.js');
const postdb = require("../posts/postDb");


router.post('/', validateUser, (req, res) => {
    userDB.insert(req.body)
    .then(user => {
        res.status(201).json(user);
    })
    .catch( error => {
        res.status(500).json({error: 'There was an error creating then post '});
    })
});
///to add a post to a user should be in posts
router.post('/:id/posts', validatePost, validateUserId,  (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    const post = { user_id: id, text }
    userDB.insert(post)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch( error => {
        res.status(500).json({error: 'There was an error retrieving posts '});
    })
});

router.get('/', (req, res) => {
    userDB.get()
    .then(user=>{
        res.status(200).json(user);
    })
    .catch( error => {
        res.status(500).json({error: 'There was an error retrieving users '});
});


router.get('/:id', validateUserId, (req, res) => {
    
    res.status(200).json( {message: 'success'} );

});

router.get('/:id/posts', validateUserId, (req, res) => {
    userDB.getUserPosts(req.params.id)
    .then (posts => {
        res.status(200).json(posts);
    })
    .catch( error => {
        res.status(500).json({error: 'There was an error retrieving posts from database '});
});

router.delete('/:id', validateUserId, (req, res) => {
    userDB.remove(req.params.id)
    if (count > 0) {
        res.status(200).json({ message: 'The user has been successfully deleted' });
      } else {
        res.status(404).json({ message: 'The user has not been deleted' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error removing user',
      });
    });
});

router.put('/:id', validateUserId, (req, res) => {
    userDB.update(req.params.id, req.body)
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'The user could not be updated.',
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
    userDB.getById(userId)
    .then (user => {
        if(!user){
            console.log("invalid user", user); 
            res.status(400).json( {message: 'Invalid user id.'} );
        }
        else {    
            req.user = user;        
            next();
        }
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error retrieving the user from the database.'} );
    })   
};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
