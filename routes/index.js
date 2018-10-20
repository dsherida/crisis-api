var Utils = require("../Utils");
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
router.get('/', function (req, res, next) {
    res.json({message: 'Hello Crisis!'});
});

router.post('/register', function (req, response, next) {
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
                    if (err) res.json({error: err});

                    response.json(member);
                }
            );
        } else {
            response.json({message: 'Username is already in use'});
        }
    });
});

router.post('/login', function (req, response, next) {
    const members = MembersCollection(req);

    members.findOne({username: req.body.username}, function (err, user) {
        if (err) response.json(err);

        console.log(JSON.stringify(user));

        if (!user) {
            response.json('User not found.');
            return;
        }

        if (user.password === req.body.password) {
            const token = "MYAUTHTOKEN12345";

            const updatedMember = user;
            updatedMember.token = token;

            members.updateOne({username: req.body.username}, updatedMember, function (e, r) {
               if (e) response.json(e);

               response.json(updatedMember);
            });
        } else {
            response.json({message: 'Username & password combination are incorrect'});
        }
    });
});

module.exports = router;
