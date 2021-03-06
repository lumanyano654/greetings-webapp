module.exports = function greetRoutes(greet) {

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
                var count = await greet.counter()
                req.flash('info', "PLEASE ENTER NAME")
                res.render('index',{
                    counter: count
                })
                return;
            }
            else if (!lang) {
                var count = await greet.counter()
                req.flash('info', "PLEASE SELECT LANGUAGE")
                res.render('index',{
                    counter: count
                })
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