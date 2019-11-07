//Express
const express = require('express');
const app = express();
//Bodyparser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
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
const AppService = require('./public/app')
const ShoesService = require('./services/shoes-service')
const ShoesRoutes = require('./routes/shoes-routes')
const ShoesAPI = require('./api/shoes-api')
const appService = AppService(pool)
const shoesService = ShoesService(pool)
const shoesRoutes = ShoesRoutes(shoesService)
const shoesAPI = ShoesAPI(shoesService)

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
app.use(errorHandler);

//Routes


//app.get("/", shoesRoutes.sendRoute);
app.get('/', shoesRoutes.homeRoute);
app.post('/aPostRoute', shoesRoutes.aPostRoute);

let PORT = process.env.PORT || 4008;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});