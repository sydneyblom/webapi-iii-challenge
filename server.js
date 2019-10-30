const express = require('express');
const userRouter = require ('./users/userRouter')
const server = express();


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
function logger(prefix) {
  return (req, res, next) => {
    console.log(
      `${prefix} [${new Date().toISOString()}] ${req.method} to ${req.url}`
    );

    next();
  };
}

// global middleware
server.use(logger);
server.use(express.json());
server.use('/api/users', userRouter);


module.exports = server;
