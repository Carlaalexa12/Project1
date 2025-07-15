const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/about', (req, res) => res.render('about'));
app.get('/testimonials', (req, res) => res.render('testimonials'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/career', (req, res) => res.render('career'));
app.get('/order', (req, res) => res.render('order'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
