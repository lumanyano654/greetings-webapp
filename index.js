var express = require("express")
var exphbs = require("express-handlebars")
var bodyParser = require("body-parser")
const flash = require('express-flash');
const session = require('express-session');

var assert = require("assert")
var greetings = require("./greetings")

var app = express()


const greet = greetings()


app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

  app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.set('view engine', 'handlebars');

app.use(express.static("public"))

app.get("/", function (req, res) {

    
    res.render("index", {
        

    })
})
app.post("/", function (req, res) {
    const name = req.body.name
    
    greet.typedName(name);

    const lang = req.body.language
    
   
    if (!name){

        req.flash('info', "Please enter name")
        res.render('index')
        return;
    }
    else if (!lang){
        
        req.flash('info', "Please select language")
        res.render('index')
        return;
    }


   else{
        res.render("index", {
        message: greet.correctInputs(name, lang),
        counter: greet.totalCounter(),
        
    })

    }
})

app.get("/greeted", function (req, res) {    
      

    res.render("greeted", {
        listOfNames: greet.userList(),
    })
})

app.get("/counter/:userCount", function(req, res){

    var userCount =req.params.userCount

     res.render("counter", {  userCount,     
         count: greet.personCounter(userCount)

     })
})


let PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});


