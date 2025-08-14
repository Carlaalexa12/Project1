const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Schema and Models
const blogSchema = new mongoose.Schema({
  date: String,
  title: String,
  excerpt: String,
  link: String
}, { timestamps: true });

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
const Event = mongoose.model('Event', eventSchema);

// ROUTES
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/menu', (req, res) => {
  res.render('menu');
});

app.get('/order', (req, res) => {
  res.render('order', { orderSuccess: false, orderData: null });
});

app.post('/order', (req, res) => {
  const { name, quantity } = req.body;
  const orderData = { name, quantity };
  res.render('order', { orderSuccess: true, orderData });
});

app.get('/testimonials', (req, res) => {
  res.render('testimonials');
});

app.get('/locations', (req, res) => {
  res.render('locations');
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

// EVENTS PAGE
app.get('/events', (req, res) => {
  Event.find().sort({ createdAt: -1 }).exec()
    .then((data) => {
      res.render("events", { events: data });
    })
    .catch(() => {
      res.render("events", { events: [] });
    });
});

// CREATE - Add a new event
app.post("/addEvent", (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.redirect('/events');
    return;
  }

  const newEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location
  });

  newEvent.save()
    .then(() => res.redirect('/events'))
    .catch(() => res.redirect('/events'));
});

// UPDATE - Update an event
app.post("/updateEvent", (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.redirect('/events');
    return;
  }

  Event.updateOne(
    { _id: req.body.updateId },
    {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location
    }
  )
    .then(() => res.redirect('/events'))
    .catch(() => res.redirect('/events'));
});

// DELETE - Delete an event
app.post("/deleteEvent", (req, res) => {
  Event.deleteOne({ _id: req.body.deleteId })
    .then(() => res.redirect('/events'))
    .catch(() => res.redirect('/events'));
});

// CRUD Admin Panel
app.get('/crud', (req, res) => {
  Promise.all([
    Blog.find().sort({ createdAt: -1 }).exec(),
    Event.find().sort({ createdAt: -1 }).exec()
  ])
    .then(([blogData, eventData]) => {
      res.render("crud", {
        blogPosts: blogData,
        events: eventData
      });
    })
    .catch(() => {
      res.render("crud", {
        blogPosts: [],
        events: []
      });
    });
});

// MongoDB connection and server start
const HTTP_PORT = process.env.PORT || 4000;
const DB = "mongodb+srv://ysmnmlkc:FfvkU2zWQFE4V864@cluster0.ze8dh1z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB)
  .then(() => {
    app.listen(HTTP_PORT);
  })
  .catch(() => { });