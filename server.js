const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.render('home', { title: 'Home' }));

app.get('/about', (req, res) => res.render('about'));

app.get('/blog', (req, res) => res.render('blog', { title: 'Blog' }));

app.get('/menu', (req, res) => res.render('menu', { title: 'Menu' }));

app.get('/order', (req, res) => res.render('order'));

app.get('/locations', (req, res) => res.render('locations', { title: 'Locations' }));

app.get('/testimonials', (req, res) => res.render('testimonials'));

app.get('/events', (req, res) => res.render('events', { title: 'Events' }));

app.get('/contact', (req, res) => res.render('contact'));

app.get('/career', (req, res) => res.render('career'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));