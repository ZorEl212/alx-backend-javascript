#!/usr/bin/node


const fs = require('fs');
const { loadEnvFile } = require('process');

function countStudents(path) {
  try {
    const lines = fs.readFileSync(path, 'utf-8').split('\n').filter(line => line.length > 0);
    const headers = lines[0].split(',');
    const rows = lines.slice(1);
    const students = [];
    const fieldCounts = {};
    if (lines.length === 0)
      throw new Error("Cannot load database");
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
          fieldCounts[field] = {count: 1, names: [student.firstname]};
        }
      }
    });
    console.log(`Number of students: ${students.length}`);
    for (const [field, {count, names}] of Object.entries(fieldCounts)) {
      console.log(`Number of students in ${field}: ${count}. List: ${names.join(', ')}`);
    }
  }
  catch (error) {
    throw new Error("Cannot load database");
  }
}

module.exports = countStudents;