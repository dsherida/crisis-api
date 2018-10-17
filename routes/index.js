var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.app.db.collection('Members').insertOne({ 'name': "Jim" },
      function(err, r) {
        console.log("Woohoo!");
      }
  )

  res.json({ message: 'Hello Crisis!' });
});

router.get('/login', function(req, res, next) {
  res.json({ message: 'Todo: Log user in'});
});

module.exports = router;
