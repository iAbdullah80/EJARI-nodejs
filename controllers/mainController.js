const db = require('../db.js');
// Requirements
// 1- add a book
// POST /api/books
function create(req, res) {
    /*
    this is the post request to add a new book to the database
    the request body should contain the following fields:
    - title (string)
    - author (string)
    - publishedDate (string)
    - numberOfPages (int)

    the response will be the id of the newly created book
    */
    const {title, author, publishedDate, numberOfPages} = req.body;
    const newBook = {title, author, publishedDate, numberOfPages};
    db.query('INSERT INTO books SET ?', newBook, (err, results) => {
        if (err) {
            console.error('Error inserting book: ', err);
            res.status(500).send('Error inserting book');
            return;
        }
        res.json({id: results.insertId});
    });
}


// 2- retrieve all books
// GET /api/books
function get_all_books(req, res){
    /*
    this is the get request to retrieve all the books from the database

    the response will be an array of all the books in the database
    */
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error('Error getting books: ', err);
            res.status(500).send('Error getting books');
            return;
        }
        res.json(results);
    });
};

// 3- get a specific book
// GET /api/books/{id}
function get_specific_book(req, res){
    /*
    this is the get request to retrieve a specific book from the database
    the request parameter should be the id of the book

    the response will be the json object of the book stored in mysql
    */
    const id = parseInt(req.params.id, 10);
    db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error getting book: ', err);
            res.status(500).send('Error getting book');
            return;
        }
        res.json(results[0]);
    });
};


// 4- update a book
// PUT /api/books/{id}
function update_specific_book(req, res){
    /*
    this is the put request to update a specific book in the database
    the request parameter should be the id of the book
    the request body should contain the following fields:
    - title (string)
    - numberOfPages (int)

    the response will be the updated json object of the book stored in mysql
    */
    const id = parseInt(req.params.id, 10);
    const {title, numberOfPages} = req.body;
    const updatedBook = {title, numberOfPages};
    db.query('UPDATE books SET ? WHERE id = ?', [updatedBook, id], (err, results) => {
        if (err) {
            console.error('Error updating book: ', err);
            res.status(500).send('Error updating book');
            return;
        }
        db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Error retrieving updated book: ', err);
                res.status(500).send('Error retrieving updated book');
                return;
            }
            res.json(results[0]);
        });
    });
};

// 5- Delete a Book
// DELETE /api/books/{id}
function delete_specific_book(req, res){
    /*
    this is the delete request to delete a specific book from the database
    the request parameter should be the id of the book

    the response will be a message indicating that the book has been successfully deleted
    */
    const id = parseInt(req.params.id, 10);
    db.query('DELETE FROM books WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting book: ', err);
            res.status(500).send('Error deleting book');
            return;
        }
        res.json({ message: 'Book successfully deleted' });
    });
};


module.exports = {
    create,
    get_all_books,
    get_specific_book,
    update_specific_book,
    delete_specific_book
};
