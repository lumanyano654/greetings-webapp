var express = require("express")
var exphbs = require("express-handlebars")
var bodyParser = require("body-parser")
const flash = require('express-flash');
const session = require('express-session');
var greetings = require("./greetings")

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://lumanyano:sanelisiwe@localhost:5432/greetings';

const pool = new Pool({
    connectionString
});

var assert = require("assert")

var app = express()


const greet = greetings(pool)


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

app.get("/", async function (req, res) {


    res.render("index", {


    })
})
app.post("/", async function (req, res) {
    const personsName = req.body.name

    const lang = req.body.language

    var display = await greet.correctInputs(personsName, lang)
    var count = await greet.counter()

    var checkName = await greet.checkNames(personsName)

    if (checkName === 0) {
        greet.insertName(personsName)
    }
    else {
        greet.updateNames(personsName)
    }

    if (!personsName) {

        req.flash('info', "Please enter name")
        res.render('index')
        return;
    }
    else if (!lang) {

        req.flash('info', "Please select language")
        res.render('index')
        return;
    }


    else {
        res.render("index", {
            message: display,
            counter: count,

        })

    }
})

app.get("/greeted", async function (req, res) {

    var myList = await greet.getName()


    res.render("greeted", {
        listOfNames: myList
    })
})

app.get("/counter/:name", async function (req, res) {

    const name = req.params.name  
    const theCount = await greet.personCounter(name)



    res.render("counter", {
        count: theCount,
        name

    })
})

app.get("/reset", async function (req, res) {
    await greet.deleteRs()
    res.redirect("/")

})

app.get("/back", async function (req, res) {
    
    res.redirect("/")

})


let PORT = process.env.PORT || 3006;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});


