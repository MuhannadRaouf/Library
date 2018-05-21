// Requiring necessary Modules
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
// Defining the navigation bar titles and links
const nav = [{
    link: '/books',
    title: 'Book'
  },
  {
    link: '/authors',
    title: "Author"
  }
];
// Requiring the Routers scripts
const bookRouter = require('./src/routes/bookRouter')(nav);
const adminRouter = require('./src/routes/adminRouter')(nav);
const authRouter = require('./src/routes/authRouter')(nav);
// Creating instances from express
const app = express();
// Pulling the enviroment port from Package.json file
const port = process.env.PORT || 3000;

// Setting the views directory
app.set('views', './src/views');
// Setting the templates engine format
app.set('view engine', 'ejs');
// Using morgan combined mode to display less details in the command line
app.use(morgan('combined'));
// Using body parser to pulling the body content to the req.body in the post method
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Using sessions and cookie parsers
app.use(cookieParser());
app.use(session({ secret: 'library' }));
// requiring the passport script and stratigies 
require('./src/config/passport.js')(app);
// Load the styles and scripts files from public dir 
app.use(express.static(path.join(__dirname, '/public/')));
// Load the styles and scripts files from node_modules 
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jqurey/dist')));
// Uses the Routers Script to route between books page
app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
// Get Function to render the home page
app.get('/', (req, res) => {
  // params: (Html page, {Variables to read from the html page})
  res.render('index', {
    title: 'My Library',
    nav
  });
});

// The Application Start point
app.listen(port, () => {
  // Debuging the application and printing dscriper message in the console with green color
  debug(`Listing on the port ${chalk.green(port)}`);
});