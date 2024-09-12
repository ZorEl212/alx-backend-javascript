#!/usr/bin/node

const readDatabase = require('../utils');

class StudentController {

  static getAllStudents(req, res) {
    let report = `This is the list of all of our students\n`;
    readDatabase('database.csv')
    .then((data) => {
      for (const [field, names] of Object.entries(data)) {
        report += `Number of students on ${field}: ${names.length}/ List: ${names.join(', ')}`;
      }
      res.status(200).send(report);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    })

  }
}