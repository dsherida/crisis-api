var express = require('express');
var router = express.Router();

const MembersTableName = 'Members';

class Member {
    constructor(height, width) {
        this.username = height;
        this.password = width;
    }
}

const MembersCollection = (req) => {
    return req.app.db.collection(MembersTableName);
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Hello Crisis!' });
});

router.post('/register', function(req, response, next) {
    let member = new Member(
        req.body.username,
        req.body.password
    );

    const members = MembersCollection(req);

    members.findOne({username: req.body.username}, function (err, res) {
        if (err) response.json(err);

        if (!res) {
            members.insertOne(member,
                function (err, r) {
                    if (err) res.json({ error: err });

                    response.json(member);
                }
            );
        } else {
            response.json({ message: 'Username is already in use'});
        }
    });
});

router.get('/login', function(req, res, next) {
  res.json({ body: req.body });
});

module.exports = router;
