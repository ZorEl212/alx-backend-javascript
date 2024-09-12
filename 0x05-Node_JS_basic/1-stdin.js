#!/usr/bin/node
process.stdin.setEncoding('utf-8');
console.log("Welcome to Holberton school, what is your name?");

process.stdin.on('readable', () => {
	let chunk = process.stdin.read();
	if (chunk) {
		console.log("Your name is: " + chunk);
	}
});

process.stdin.on('end', () => {
	console.log("This important software is now closing");
});
