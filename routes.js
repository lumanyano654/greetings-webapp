module.exports = function greetRoutes(greet) {

    // var greetings = require("./greetings")
    // const greet = greetings(gr

    async function home(req, res) {
        var count = await greet.counter()
            res.render("index",{
                counter: count
            })
    }

    async function greetingHome(req, res) {
        try {
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
            }

            var checkName = await greet.checkNames(personsName)

            if (checkName === 0) {
                await greet.insertName(personsName)
            }
            else {
                await greet.updateNames(personsName)
            }
            var count = await greet.counter()

            res.render("index", {
                message: display,
                counter: count,
            })
        } catch (error) {
            console.log(error);

        }
    }


    async function greeted(req, res) {
        try {
            var myList = await greet.getName()
            res.render("greeted", {
                listOfNames: myList
            })

        } catch (error) {
            console.log(error);

        }
    }


    async function counter(req, res) {

        try {
            const name = req.params.name
            const theCount = await greet.personCounter(name)



            res.render("counter", {
                count: theCount,
                name

            })
        } catch (error) {
            console.log(error);

        }
    }

    async function reset(req, res) {
        try {
            await greet.deleteRs()
            res.redirect("/")

        } catch (error) {
            console.log(error);

        }
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