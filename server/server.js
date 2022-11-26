const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3301;
const mysql = require('mysql');

// to connect form into action
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use(express.json());
// app.use(bodyParser.urlencoded( { extended: true }));

// initialize server listening to ther port
app.listen(3301, () => {
    console.log(`Running on port ${port}`);
});

// display something in browser landing page
app.get("/", (req, res) => {
    res.send('Welcome back!');
});

// create database connection
const conn = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'bookrepo'
});

// checking error and get connection
conn.getConnection((err, connection) => {
    console.log('Database connected succesfully ');
})

// display all books data
app.get('/books',(req, res) => {
    let sql = "SELECT * FROM book";
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

// display all books data based on their id
app.get('/books/:id',(req, res) => {
    let sql = "SELECT * FROM book WHERE book_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

// get data based on book title that user search
app.get('/book/search-title', function (req, res, next) {
    let sql = "SELECT * FROM book WHERE book_title LIKE " + `'%` + req.query.keyword + `%'`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

// get data based on book author that user search
app.get('/book/search-author', function (req, res, next) {
    let sql = "SELECT * FROM book WHERE book_author LIKE " + `'%` + req.query.keyword + `%'`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

// get data based on book isbn that user search
app.get('/book/search-isbn', function (req, res, next) {
    let sql = "SELECT * FROM book WHERE book_ISBN LIKE " + `'%` + req.query.keyword + `%'`;
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

// get data based on availability status
app.get('/book/status', function (req, res) {
    let sql = "SELECT * FROM book WHERE isAvailable = '1'";
    let query = conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
})

// get data based on user wishlist
app.get('/my-wishlist/', function (req, res, next) {
    const name = req.query.name;
    let sql = "SELECT * FROM wishlist WHERE name= ?";
    let query = conn.query(sql, name, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

// add new data
app.post('/addBooks',(req, res) => {
    const title = req.body.book_title;
    const author = req.body.book_author;
    const publishdate = req.body.book_publishDate;
    const isbn = req.body.book_ISBN;
    const isavailable = req.body.isAvailable;
    const onborrow = req.body.onBorrow;

    let data = {book_title: req.body.book_title, book_author: req.body.book_author, book_publishDate: req.body.book_publishDate, book_ISBN: req.body.book_ISBN, isAvailable: req.body.isAvailable, onBorrow: req.body.onBorrow};
    let sql = "INSERT INTO book (book_title, book_author, book_publishDate, book_ISBN, isAvailable, onBorrow) VALUES (?, ?, ?, ?, ?, ?)";
    let query = conn.query(sql, [title, author, publishdate, isbn, isavailable, onborrow], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

// add new data into wishlist table
app.post('/addToWishlist', (req, res) => {
    const name = req.body.name;
    const bookName = req.body.book_name;
    const bookAuthor = req.body.book_author;
    const datestart = req.body.dateStart;
    const dateend = req.body.dateEnd;

    let sql = "INSERT INTO wishlist (name, book_name, book_author, dateStart, dateEnd) VALUES (?, ?, ?, ?, ?)";
    let query = conn.query(sql, [name, bookName, bookAuthor, datestart, dateend], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});

// edit book data based on their id
app.put('/editBooks/:id',(req, res) => {

    const title = req.body.book_title;
    const author = req.body.book_author;
    const publishdate = req.body.book_publishDate;
    const isbn = req.body.book_ISBN;
    const isavailable = req.body.isAvailable;
    const onborrow = req.body.onBorrow;

    let sql = "UPDATE book SET book_title=?, book_author=?, book_publishDate=?, book_ISBN=?, isAvailable=?, onBorrow=? WHERE book_id="+req.params.id;
    let query = conn.query(sql, [title, author, publishdate, isbn, isavailable, onborrow], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    });
});
   
// delete book data based on their title
app.delete('/deleteBooks/:book_title',(req, res) => {
  const name = req.params.book_title;
  let sql = "DELETE FROM book WHERE book_title = ?";
  let query = conn.query(sql, name, (err, results) => {
    if (err) {
        console.log(err);
    } else {
        res.send(results);
    }
  });
});

// delete book data after removed from wishlist
app.delete('/delete-wishlist-book/:wishlist_id', (req, res) => {
    const id = req.params.wishlist_id;
    let sql = "DELETE FROM wishlist WHERE wishlist_id = ?";
    let query = conn.query(sql, id, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
})

// get book data after removal
app.get('/wishlist/book-data/:book_id', (req, res) => {
    const id = req.params.book_id;
    let sql = "SELECT * FROM book WHERE book_id = ?";
    let query = conn.query(sql, id, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            res.send(results);
        }
    })
})