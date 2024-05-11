require('dotenv').config();

const express = require('express');
// const   chalk = require('chalk');
const   fs = require( 'fs' );

const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const start = Date.now(),
    protocol = process.env.PROTOCOL || 'https',
    port = process.env.PORT || '3000',
    host = process.env.HOST || 'localhost';

let server;

function sendBootStatus( status ) {
  // don't send anything if we're not running in a fork
  if ( ! process.send ) {
    return;
  }
  process.send( { boot: status } );
}




const app = express();

// Connect to DB
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: { maxAge: new Date ( Date.now() + (3600000) ) }
}));

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.locals.isActiveRoute = isActiveRoute;


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));


// if ( protocol === 'https' ) {
//   const { execSync } = require( 'child_process' );
//   const execOptions = { encoding: 'utf-8', windowsHide: true };
//   let key = './certs/key.pem';
//   let certificate = './certs/certificate.pem';
//
//   if ( ! fs.existsSync( key ) || ! fs.existsSync( certificate ) ) {
//     try {
//       execSync( 'openssl version', execOptions );
//       execSync(
//           `openssl req -x509 -newkey rsa:2048 -keyout ./certs/key.tmp.pem -out ${ certificate } -days 365 -nodes -subj "/C=US/ST=Foo/L=Bar/O=Baz/CN=localhost"`,
//           execOptions
//       );
//       execSync( `openssl rsa -in ./certs/key.tmp.pem -out ${ key }`, execOptions );
//       execSync( 'rm ./certs/key.tmp.pem', execOptions );
//     } catch ( error ) {
//       console.error( error );
//     }
//   }
//
//   const options = {
//     key: fs.readFileSync( key ),
//     cert: fs.readFileSync( certificate ),
//     passphrase : 'password'
//   };
//
//   server = require( 'https' ).createServer( options, app );
//
// } else {
//   server = require( 'http' ).createServer( app );
// }
//
// server.listen( { port }, function() {
//   sendBootStatus( 'ready' );
// } );

// const { networkInterfaces } = require('os');
//
// const nets = networkInterfaces();
// const results = Object.create(null); // Or just '{}', an empty object
//
// for (const name of Object.keys(nets)) {
//   for (const net of nets[name]) {
//     // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
//     // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
//     const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
//     if (net.family === familyV4Value && !net.internal) {
//       if (!results[name]) {
//         results[name] = [];
//       }
//       results[name].push(net.address);
//     }
//   }
// }
//
// console.log(results)

const connectDB = require('./server/config/db');
connectDB();

app.listen(port, ()=> {
  console.log(`App listening on port ${port}`);
});
