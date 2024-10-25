const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'EJARI',
  port: 3306,
  password: 'root',
});

// this is a func to initialize the table and insert the dummy data given in the assessment
const initializeBooksTable = () => {
    const createTableSql = `
  CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publishedDate DATE NOT NULL,
    numberOfPages INT NOT NULL
  );
`;
  connection.query(createTableSql, (err, result) => {
    if (err) {
      console.error("error creating the table: ", err);
      return;
    }
    console.log('table created or already exists.');

    // here im checking if the dummy data already exists in the table
    const checkSql = 'SELECT * FROM `books` WHERE `title` = "The Great Gatsby" AND `author` = "F. Scott Fitzgerald"';
    connection.query(checkSql, (err, results) => {
      if (err) {
        console.error('Error checking for existing record: ', err);
        return;
      }

      if (results.length > 0) {
        console.log('Record already exists, not inserting.');
      } else {
        // insert
        const insertSql = `
          INSERT INTO books (title, author, publishedDate, numberOfPages)
          VALUES ("The Great Gatsby", "F. Scott Fitzgerald", "1925-04-10", 180)
        `;
        connection.query(insertSql, (err, result) => {
          if (err) {
            console.error('Error inserting data: ', err);
            return;
          }

          console.log('Data inserted successfully:', result);
        });
      }
    });
  });
};

initializeBooksTable();

module.exports = connection;
