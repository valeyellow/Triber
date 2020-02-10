const express = require('express');

const app = express();

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const cors = require('cors');

const dbUrl = "mongodb://127.0.0.1/27017";

app.use(express.json());
app.use(cors());

MongoClient.connect(dbUrl, (error, client) => {
    if (error) {
        return console.log(error);
    }

    db = client.db('User-Details');
})



app.get('/users', (req, res) => {
    db.collection('user').find().toArray((error, user) => {
        if (error) {
            return console.log(error);
        }

        res.json(user);
    })
})

app.post('/users', (req, res) => {
    db.collection('user').insertOne(req.body, (error, result) => {
        if (error) {
            return console.log(error);
        }
        res.send(
            {
                msg : "User added to Database"
            }
        );
        console.log(result.ops);
    })
})

app.listen(3003, (error) => {
    if (error) {
        return console.log("Error establishing connection to server!");
    }

    console.log('Server is up and running on port 3003');
})