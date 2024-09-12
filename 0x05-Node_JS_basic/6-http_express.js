#!/usr/bin/node 

const express = require('express');
const app = express();
const port = 1245;

 app.get('/', (req, res) => {
	res.send("Hello Holberton school!");
 })

 app.listen(port, () => {
	console.log(`App listning on port ${port}`);
 })

 module.exports = app;
