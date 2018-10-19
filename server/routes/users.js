var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/todo-list";
var db;
var users = [];
var app = express();
app.use(express.json());
MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) console.error(err);
    db = client.db('todo-list');
    db.collection('users').remove();
    db.collection('users').find({}).forEach(function (found) {
        users.push(found);
    });
});

function findUser(name) {
    for (var i = 0; i < users.length; i++) {
        console.log(users[i]);

        if (users[i].name == name) {
            return (users[i]);
        }
    }
}

router.get('/:name', function (req, res) {
    db.collection('users')
        .findOne({ name: req.params.name }).then((found) => {
            var user = findUser(req.params.name);
            if (found)
                user.data = found.data;
            res.send(JSON.stringify(user.data));
        });
});

router.post("/login", function (req, res) {
    if (req.body.name == "login")
        throw new Error("Invalid name");
    var user = findUser(req.body.name);
    if (!user) {
        user = {
            name: req.body.name,
            data: { tasks: [], count: 0 }
        };
        users.push(user);
        db.collection('users').insertOne(user);
        res.json(user.data);
    }
    else
        res.json(user.data);
});

router.post('/:name', function (req, res) {
    var user = findUser(req.params.name);
    user.data.tasks = req.body.tasks;
    if (req.body.addedTask)
        user.data.count++;
    db.collection('users')
        .findAndModify({ name: req.params.name },
            [['_id', 'asc']], user, function (err, result) {
                assert.equal(null, err);
            });
    res.json(user.data);
});

module.exports = router;