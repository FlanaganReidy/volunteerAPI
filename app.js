const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const models = require('./models');
const bcrypt = require('bcryptjs');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//will switch this to mustache
app.get('/api/', function(req, res) {
  res.json({
    'status': 'success'
  })
})

//make email and name
app.post('/api/user/register', function(req, res) {
  const user = models.User.build({
    email: req.body.email,
    name: req.body.name
  })
//update password field by running it through the generateHash method (does not work)
  user.update({
      passwordHash: user.generateHash(req.body.password)
    })
//save new user
    user.save().then((results) => {
      res.json({
        'status': 'success',
        'data': results
      });
    })

})

app.listen(3000, function() {
  console.log('successfully started Express Application');
})

process.on('SIGINT', function() {
  console.log("\nshutting down");
  const index = require('./models/index')
  index.sequelize.close()

  // give it a second
  setTimeout(function() {
    console.log('process exit');
    process.exit(0);
  }, 1000)
});
