const request = require('supertest');
const app = require('./app');
const db = require('./db.js');

// Mock the database
jest.mock('./db.js');

// Clear all mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});

describe('Books API', () => {
    // Test adding a new book
    test('should create a new book', async () => {
        // Setup mock response
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { insertId: 1 });
        });

        // Test data
        const newBook = {
            title: 'Harry Potter',
            author: 'J.K. Rowling',
            publishedDate: '1997-06-26',
            numberOfPages: 223
        };

        // Make request
        const response = await request(app)
            .post('/api/books')
            .send(newBook);

        // Check response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1 });
    });

    // Test getting all books
    test('should get all books', async () => {
        // Setup mock response
        const mockBooks = [
            { id: 1, title: 'Harry Potter', author: 'J.K. Rowling' },
            { id: 2, title: 'Lord of the Rings', author: 'J.R.R. Tolkien' }
        ];

        db.query.mockImplementation((sql, callback) => {
            callback(null, mockBooks);
        });

        // Make request
        const response = await request(app)
            .get('/api/books');

        // Check response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockBooks);
    });

    // Test getting one book
    test('should get a single book', async () => {
        // Setup mock response
        const mockBook = {
            id: 1,
            title: 'Harry Potter',
            author: 'J.K. Rowling'
        };

        db.query.mockImplementation((sql, params, callback) => {
            callback(null, [mockBook]);
        });

        // Make request
        const response = await request(app)
            .get('/api/books/1');

        // Check response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockBook);
    });

    // Test updating a book
    test('should update a book', async () => {
        // Setup mock response for both queries
        const updatedBook = {
            id: 1,
            title: 'Updated Title',
            numberOfPages: 200
        };

        let queryCount = 0;
        db.query.mockImplementation((sql, params, callback) => {
            queryCount++;
            // First query is the UPDATE
            if (queryCount === 1) {
                callback(null, { affectedRows: 1 });
            }
            // Second query is the SELECT
            else if (queryCount === 2) {
                callback(null, [updatedBook]);
            }
        });

        // Make request
        const response = await request(app)
            .put('/api/books/1')
            .send({
                title: 'Updated Title',
                numberOfPages: 200
            });

        // Check response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedBook);
    });

    // Test deleting a book
    test('should delete a book', async () => {
        // Setup mock response
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { affectedRows: 1 });
        });

        // Make request
        const response = await request(app)
            .delete('/api/books/1');

        // Check response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Book successfully deleted' });
    });
});
