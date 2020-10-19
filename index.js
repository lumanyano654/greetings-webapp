var express = require("express")
var exphbs = require("express-handlebars")
var bodyParser = require("body-parser")
const flash = require('express-flash');
const session = require('express-session');

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://lumanyano:sanelisiwe@localhost:5432/greetings';

const pool = new Pool({
    connectionString
});

// var assert = require("assert")

var app = express()

const greetingsRoutes = require("./routes")  
    var greetings = require("./greetings")
    const greet = greetings(pool)

const GreetRoutes = greetingsRoutes(greet)


app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(express.static("public"))

app.get("/",GreetRoutes.home)

app.post("/", GreetRoutes.greetingHome )

app.get("/greeted", GreetRoutes.greeted)

app.get("/counter/:name", GreetRoutes.counter )

app.get("/reset", GreetRoutes.reset)

app.get("/back", GreetRoutes.back)


let PORT = process.env.PORT || 3006;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});


