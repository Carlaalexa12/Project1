const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String
}, { timestamps: true });


app.get('/', (req, res) => {
  res.render('home');
});


app.get('/about', (req, res) => {
  res.render('about');
});


app.get('/order', (req, res) => {
  res.render('order', { orderSuccess: false, orderData: null });
});


app.post('/order', (req, res) => {
  const { name, quantity } = req.body;
  const orderData = { name, quantity };
  res.render('order', { orderSuccess: true, orderData });
});


app.get('/contact', (req, res) => {
  res.render('contact', { contactSuccess: false, contactData: null });
});


app.post('/contact', (req, res) => {
  const { name, message } = req.body;
  const contactData = { name, message };
  res.render('contact', { contactSuccess: true, contactData });
});


app.get('/career', (req, res) => {
  res.render('career');
});

app.get('/testimonials', (req, res) => {
  res.render('testimonials');
});

app.get('/events', (req, res) => {
  res.render('events');
});

app.post('/events', (req, res) => {
  const { eventName, date } = req.body;
  const eventData = { eventName, date };
  res.render('events', { eventSuccess: true, eventData });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
