#!/usr/bin/node

const { createServer } = require('http');
const url = require('url')
const fs = require('fs');

const hostname = 'localhost';
const port = '1245';

const app = createServer((req, res) => {
	const urlParse = url.parse(req.url);
	const path = urlParse.pathname;
	if (path === '/students') {
    let report;
		function countStudents(path) {
			return new Promise((resolve, reject) => {
				fs.promises.readFile(path, 'utf-8')
        .then((data) => {
          const lines = data.split('\n').filter(line => line.length > 0);
          if (lines.length === 0)
            reject(new Error('Cannot read database'));
          const headers = lines[0].split(',');
          const rows = lines.slice(1);
          const students = [];
          const fieldCounts = {};
          rows.forEach((row) => {
            const student = {};
            const values = row.split(',');
            if ( headers.length === values.length) {
              headers.forEach((header, index) => {
                student[header.trim()] = values[index].trim();
              })
              students.push(student);
              const field = student.field;
              if (fieldCounts[field]) {
                fieldCounts[field].count += 1;
                fieldCounts[field].names.push(student.firstname);
              } else {
                fieldCounts[field] = {count: 1, names: [student.firstname]};
              }
            }
          })
          report = `Number of students: ${students.length}\n`;
          for (const [field, {count, names}] of Object.entries(fieldCounts)) {
            report += `Number of students in ${field}: ${count}. List: ${names.join(', ')}\n`;
          }
          resolve(report);

        })
        .catch ((error) => {
          reject(new Error('Cannot load database'));
        });
			});
		}
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
    countStudents(process.argv[2])
    .then((report) => {
      res.end(report);
    })
    .catch((error) => {
      res.end(error);
    });		
	} else {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain')
		res.end("Hello holberton school!");
	}
})

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);

});

module.exports = app;