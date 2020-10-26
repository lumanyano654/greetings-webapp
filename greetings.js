module.exports = function greetings(pool) {


    function correctInputs(name, language) {
        name = name.toUpperCase().charAt(0) + name.slice(1);

        if (language) {
            if (language === "Xhosa") {


                return "Molo, " + name;

            }

            else if (language === "English") {


                return "Hello, " + name
            }

            else if (language === "Afrikaans") {


                return "Halo, " + name
            }


        }


    }

    async function insertName(name) {
        name = name.toUpperCase().charAt(0) + name.slice(1)
        const insert = await pool.query('insert into greeting(name_greeted, name_counter) values ($1,$2)', [name, 1])
        return insert.rows
    }

    async function personCounter(name) {
        name = name.toUpperCase().charAt(0) + name.slice(1)
        const eachCount = await pool.query('select name_counter from greeting where name_greeted = $1', [name])
        return eachCount.rows[0].name_counter;

    }

    async function checkNames(name) {
        name = name.toUpperCase().charAt(0) + name.slice(1)
        const check = await pool.query("select name_greeted from greeting where name_greeted = $1", [name])
        return check.rowCount
    }

    async function updateNames(name) {
        name = name.toUpperCase().charAt(0) + name.slice(1)
        const update = await pool.query("update greeting set name_counter = name_counter +1 where name_greeted = $1", [name])
        return update.rows
    }

    async function counter() {
        const counter = await pool.query("select * from greeting")
        return counter.rowCount
    }


    async function getName() {
        const namest = await pool.query("select name_greeted from greeting")
        return namest.rows
    }

    async function deleteRs() {
        await pool.query("delete from greeting")
    }


    async function userList() {
        return namesList
    }





    return {
        correctInputs,
        checkNames,
        userList,
        personCounter,
        insertName,
        updateNames,
        counter,
        getName,
        deleteRs,
       


    }


}






