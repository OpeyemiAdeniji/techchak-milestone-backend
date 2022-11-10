const crypto = require('crypto');
const path = require('path');
const express = require('express');
const { config } = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const expressSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
var userAgent = require('express-useragent');

// seeder 
const { seedData } = require('./config/seeds/seeder.seed');

// files
const errorHandler = require('./middleware/error.mw');
const connectDB = require('./config/db');

//load the config file
// dotenv.config({ path: './config/.env' });
config();

// connect to db
connectDB();

// route files
const v1Routers = require('./routes/v1/routes.router');


const app = express();

//set the view engine
app.set('view engine', 'ejs');

// cookie parser
app.use(cookieParser());

// body parser
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: false }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
	// app.use(logger); // custom logger
}

// Sanitize data
// Secure db against SQL injection
app.use(expressSanitize());

// Set security headers ::: adds more headers
app.use(helmet());

// Prevent cross-site scripting attacks
app.use(xss());

// Prevent http parameter pollution
app.use(hpp());

// Enable CORS
// Communicate with API on multiple domains
app.use(cors({ origin: '*' }));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// user agent
app.use(userAgent.express());

//Mount Routers
app.get('/', (req, res, next) => {

	res.status(200).json({
		status: 'success',
		data: {
			name: 'techchak api',
			version: '0.1.0'
		}
	})
	
});

app.use(`/api/v1`, v1Routers);


// error handler must be after you mount routers
app.use(errorHandler);

// seed data
seedData();

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red.bold);
	server.close(() => process.exit(1));
});