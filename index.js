const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3001;

const app = express();

// MongoDB
const mongoose = require("mongoose");
const dataUrl = process.env.DATABASEURL || "mongodb://localhost/book";
mongoose.connect(dataUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const Book = require('./models/Book.js');
const Author = require('./models/Author.js');



 app.use(bodyParser.json());

const initBooks = [
  {
    id: "1",
    title: "Harry Potter",
    publisher: "Grand Publisher",
    price: 30,
  },
  {
    id: "2",
    title: "Alice",
    publisher: "publisher 2",
    price: 12,
  },
  {
    id: "3",
    title: "Harry Potter 2",
    publisher: "Grand Publisher",
    price: 40,
  },
];

const book = {
    "id": '1',
    "title": 'Harry Potter',
    "publisher": 'Grand Publisher',
    "price": 30
}

app.use(cors());


app.get("/", (req, res, next) => {
  return res.json({
    text: "hello",
  });
});

app.post('/book', async (req, res, next) => {
    try {
        let { title, authorName, comments } = req.body;
        let author = await Author.findOne({ name: authorName });
        console.log(author);
        if (!author) {
            author = await Author.create({ name: authorName });
        }
        const doc = await Book.create({
            title,
            author: {_id: author._id},
            comments
        });
        const newBooks = [...author.books, doc._id];
        await Author.update({name: authorName}, {books: newBooks})
        let resjson = await doc.execPopulate('author')
        res.json(resjson);

    } catch (err) {
        console.log(err)
    }
})


app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  res.json({
    err: "404",
  });
});

app.listen(port, () => {
    console.log(`listening at ${port}`)
})