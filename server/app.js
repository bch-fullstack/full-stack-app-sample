const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
 
const dotenv = require('dotenv');
dotenv.config();

app.use(cors())

const localDb = process.env.LOCAL_DB;
const atlasDb = process.env.ATLAS_DB;

const mongoose = require('mongoose');
const { reset } = require('nodemon');
const db = mongoose.connection;
mongoose.connect(localDb, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('connected', function () {
    console.log('Mongoose default connection open');
});

// If the connection throws an error
db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    content: String,
    hidden: Boolean,
    author: String,
    views: Number
})

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/addNewPost', (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    });

    newPost.save().then(() => console.log('Successfully saved a new Post to MongoDB'))
    res.send('Received post')
})

app.get('/allPost', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) console.log(err)
        else res.json(posts)
    })
})

app.listen(5000, () => {
    console.log('Listening on port', 5000)
})