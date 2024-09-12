#!/usr/bin/node

class AppController {
	static getHomepage(req, res) {
		return res.send('Hello Holberton school!')
	}
}