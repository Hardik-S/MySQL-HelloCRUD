/**
 * This is the server class, it allows CRUD operations to be executed and stored.
 */

// import dependencies
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

// use cors to allow for restricted resources to be requested
// from the client with user input to the backend server
app.use(cors());

// use express.json to parse the `body` object from app.js
app.use(express.json());

// mySQL database connection
const db = mysql.createConnection({
        user: 'root',
        host: 'localhost',
        password: 'password',
        database: 'employeeSystem' // the created database following camelCase
});

/* Five API requests using Axios */ 

/* 1) post request to insert (create) employees in database with request and response */
app.post('/create', (req, res) => {
        // request input data from front end (app.js), if empty then use default values
        const name = req.body.name;
        const age = req.body.age;
        const country = req.body.country;
        const position = req.body.position;
        const wage = req.body.wage;
        const startdate = req.body.startdate;

        // query using SQL insert statement
        db.query(
                'INSERT INTO employees (name, age, country, position, wage, startdate) VALUES (?,?,?,?,?,?)',
                [name, age, country, position, wage, startdate],
                (err, result) => {
                        // if there is an error, log it to the console
                        if (err) {
                                console.log(err);
                        } else {
                                res.send('Values successfully inserted...');
                        }
                }
        );
});

/* 2) get request using /employees endpoint */
app.get('/employees', (req, res) => {
        // SQL query to select all coloumns from employees table
        db.query('SELECT * FROM employees', (err, result) => {
                // if there is an error, log it to the console
                if (err) {
                        console.log(err);
                } else {
                        res.send(result);
                }
        });
});
/* 3) put request to update the salary of an employee using the primary key id */
app.put('/update', (req, res) => {
        const id = req.body.id;
        const wage = req.body.wage;
        db.query(
                'UPDATE employees SET wage = ? WHERE id = ?',
                [wage, id],
                (err, result) => {
                        // if there is an error, log it to the console
                        if (err) {
                                console.log(err);
                        } else {
				console.log("successful update");
                                res.send(result);
                        }
                }
        );
});

/* 4) delete request to remove employee from SQL database using primary key id */
app.delete('/delete/:id', (req, res) => {
        const id = req.params.id;
	console.log("from server: " + id);
        db.query('DELETE FROM employees WHERE id = ?', id, (err, result) => {
                if (err) {
                        console.log(err);
                } else {
			console.log("successful delete");
                        res.send(result);
                }
        });
});

// Server life check
app.listen(3001, () => {
        console.log('Excellent, the server is alive and running! Port: 3001');
});
