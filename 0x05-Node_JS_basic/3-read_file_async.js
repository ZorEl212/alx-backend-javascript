#!/usr/bin/node

const { count } = require('console');
const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.promises.readFile(path, 'utf-8')
    .then((data) => {
      const lines = data.split('\n').filter(line => line.length > 0);
      if (lines.length === 0)
        reject(new Error("Cannot load database"));
      const headers = lines[0].split(',');
      const rows = lines.slice(1);
      const students = [];
      const fieldCounts = {}
      rows.forEach((row) => {
        const student = {};
        const values = row.split(',');
        if (headers.length === values.length) {
          headers.forEach((header, index) => {
            student[header.trim()] = values[index].trim();
          })
          students.push(student);
          const field = student.field;
          if (fieldCounts[field]) {
            fieldCounts[field].count += 1;
            fieldCounts[field].names.push(student.firstname);
          } else {
            fieldCounts[field] = {count: 1, names:  [student.firstname]};
          }
        }
      });
      console.log(`Number of students: ${students.length}`);
      for (const [field, {count, names}] of Object.entries(fieldCounts)) {
        console.log(`Number od students in ${field}: ${count}. List: ${names.join(', ')}`);
      }
      resolve();
    })
    .catch ((error) => {
      reject(new Error("Cannot read database"));
    });
  })
}

module.exports = countStudents;