module.exports = function greetRoutes(pool) {

    var greetings = require("./greetings")
    const greet = greetings(pool)

    async function home(req, res) {
        res.render("index")
    }

    async function greetingHome(req, res) {
        const personsName = req.body.name

        const lang = req.body.language

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

        else if (personsName && lang) {
            var display = await greet.correctInputs(personsName, lang)
            var count = await greet.counter()
        }

        var checkName = await greet.checkNames(personsName)

        if (checkName === 0) {
            await greet.insertName(personsName)
        }
        else {
            await greet.updateNames(personsName)
        }


        res.render("index", {
            message: display,
            counter: count,
        })
    }


    async function greeted(req, res) {

        var myList = await greet.getName()


        res.render("greeted", {
            listOfNames: myList
        })
    }


    async function counter(req, res) {

        const name = req.params.name
        const theCount = await greet.personCounter(name)



        res.render("counter", {
            count: theCount,
            name

        })
    }

    async function reset(req, res) {
        await greet.deleteRs()
        res.redirect("/")

    }

    async function back(req, res) {

        res.redirect("/")

    }
    return {

        home,
        greetingHome,
        greeted,
        counter,
        reset,
        back

    }
}