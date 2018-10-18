var express = require('express');
var router = express.Router();
var app = express();
app.use(express.json());

var users = [
    {
        id: 1,
        name: "lluis",
        data: {
            tasks: [],
            count: 0
        }
    },
    {
        id: 2,
        name: "artorias",
        data: {
            tasks: [],
            count: 0
        }
    },
    {
        id: 3,
        name: "thrall",
        data: {
            tasks: [],
            count: 0
        }
    }
]

users.forEach((value) => {
    router.get('/' + value.name, function (req, res) {
        res.send(JSON.stringify(value.data));
    });
    router.post('/' + value.name, function (req, res) {
        value.data.tasks = req.body.tasks;
        if (req.body.addedTask)
            value.data.count++;
        res.json({ tasks: req.body.tasks, count : value.data.count });
    });
});

module.exports = router;
