const dotenv = require('dotenv');
dotenv.config();

const localDb = process.env.LOCAL_DB;
const atlasDb = process.env.ATLAS_DB;

class DatabaseService {
    localDb = process.env.LOCAL_DB;
    atlasDb = process.env.ATLAS_DB;

    constructor(db) {
        this.db = db;
    }


}

const mongoose = require('mongoose');
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

const newPost = new Post({
    title: 'this is a new post',
    content: 'some content for my new Post',
    hidden: false,
    author: 'some_author',
    views: 0
})

newPost.save().then(() => console.log('Saved a new Post to db'))