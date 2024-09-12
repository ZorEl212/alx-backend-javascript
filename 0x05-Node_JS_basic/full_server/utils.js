#!/usr/bin/node

const fs = require('fs');

function readDatabase(path) {
	return new Promise((resolve, reject) => {
    fs.promises.readFile(path, 'utf-8')
    .then((data) => {
      const lines = data.split('\n').filter(line => line.length > 0);
      if (lines.length === 0)
        reject(new Error('Cannot read database'))
      const headers = lines[0].split(',');
      const rows = lines.slice(1);
      const fields = {};
      rows.forEach((row) => {
        const student = {};
        const values = row.split(',');
        if (headers.length == values.length) {
          headers.forEach((header, index) => {
            student[header.trim()] = values[index].trim()
          })
          const field = student.field;
          if (fields[field]) {
            fields[field].push(student.firstname);
          } else {
            fields[field] = [student.firstname];
          }
        }
      })
      resolve(fields);
    })
    .catch((error) => {
      reject(error);
    })
	})
}
 
readDatabase('database.csv')
.then((data) => {
  for (const [field, names] of Object.entries(data)) {
    console.log(`${field}: ${names.join(', ')}`);
  }
})
.catch((error) => {
  console.log(error.message);
})

module.exports = readDatabase;
