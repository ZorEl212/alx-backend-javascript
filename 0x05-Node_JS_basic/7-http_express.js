#!/usr/bin/node

const { rejects } = require('assert');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.promises.readFile(path, 'utf-8')
    .then((data) => {
      const lines = data.split('\n').filter(line => line.length > 0);
      const headers = lines[0].split(',');
      const rows = lines.slice(1);
      const fieldCounts = {}
      const students = [];

      rows.forEach((row) => {
        const values = row.split(',');
        const student = {};
        if  (values.length === headers.length) {
          headers.forEach((header, index) => {
            student[header.trim()] = values[index].trim();
          });
          students.push(student);
          const field = student.field;
          if (fieldCounts[field]) {
            fieldCounts[field].count += 1;
            fieldCounts[field].names.push(student.firstname);
          } else {
            fieldCounts[field] = {count: 1, names: [student.firstname]};
          }
        }
      });
      let report = `Number of students: ${students.length}\n`;
      for (const [field, {count, names}] of Object.entries(fieldCounts)) {
        report += `Number of students in ${field}: ${count}. List: ${names.join(', ')}\n`;
      }
      resolve(report);
    })
    .catch((error) => {
      reject(new Error('Cannot read database.'));
    })
  })
}
app.get('/', (req, res) => {
	res.send('Hello Holberton school!');
})
.get('/students', (req, res) => {
  countStudents('databaese.csv')
  .then((report) => {
    res.status(200).send(`This is the list of our students\n${report}`);
  })
  .catch((error) => {
    res.status(500).send(`This is the list of our students\n${error.message}`);
  })
})

app.listen(port, () => {
  console.log(`App listning on port ${port}`);
})

module.exports = app;
