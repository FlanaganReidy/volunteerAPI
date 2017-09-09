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

app.get('/api/', function(req, res) {
  res.json({
    'status': 'success'
  })
})

app.post('/api/user/register', function(req, res) {
  const user = models.User.build({
    email: req.body.email,
    name: req.body.name
  })

  user.update({
      passwordHash: user.generateHash(req.body.password)
    })

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
