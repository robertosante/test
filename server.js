const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('unable to append to server log');
		};
	});

	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
	//next();
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	/*res.send('Hola');
	res.send({
		name: 'Roberto',
		likes: [
			'Beer',
			'Cats'
		]
	});
	*/
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Hola puto'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		Error: 'Error found'
	})
});

app.listen(port, () => {
	console.log(`running server on ${port}`);
});