//Express
const express = require('express');
const app = express();

//Flashmessaging
const flash = require('express-flash');
const session = require('express-session');
app.use(flash());
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));
//Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//Client
app.use(express.static('public'))
//Postgresql
const pg = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgresql://warwick:pg123@localhost:5432/shoecatalogue';

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
const Pool = pg.Pool;
const pool = new Pool({
  connectionString,
  ssl: useSSL
});
//Factories
//const AppService = require('./public/app')
const ShoeService = require('./services/shoes-service')
const ShoesRoutes = require('./routes/shoes-routes')
const ShoesAPI = require('./api/shoes-api')
//const appService = AppService(pool)
const shoeService = ShoeService(pool)
const shoesRoutes = ShoesRoutes(shoeService)
const shoesAPI = ShoesAPI(shoeService)

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
app.use(errorHandler);

//Bodyparser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

//Backend Routes
app.get('/', shoesRoutes.homeRoute);
app.post('/shoes', shoesRoutes.addRoute);
app.post('/shoes/brand', shoesRoutes.filterRoute);

//app.post('/aPostRoute', shoesRoutes.aPostRoute);

//API Routes
//list all shoes
app.get('/api/shoes', shoesAPI.allShoes);
//list all shoes for a given brand
app.get('/api/shoes/brand/:brand', shoesAPI.filterShoes);
//list all shoes for a given size
app.get('/api/shoes/size/:size', shoesAPI.filterShoes);
//list all shoes for a given color
app.get('/api/shoes/color/:color', shoesAPI.filterShoes);
//list all shoes for a given brand, size and color
app.get('/api/shoes/brand/:brand/size/:size/color/:color', shoesAPI.filterShoes);
//update stock levels when a shoe is sold
app.post('/api/shoes/sold/:id');
//add a new shoe to stock
app.post('/api/shoes', shoesAPI.addShoe);

let PORT = process.env.PORT || 4009;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});