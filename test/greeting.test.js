const assert = require('assert');
const greetings = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://lumanyano:sanelisiwe@localhost:5432/greetings_tests';

const pool = new Pool({
    connectionString
});
const greet = greetings(pool)
describe('The greetings web-app', async function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from greeting;");

    });

    it('should be able to greet  Makho in Xhosa ', function () {
        // await greet.insertName("Lumanyano")

        assert.equal("Molo, Makho", greet.correctInputs("Makho", "Xhosa"))

    });

    it("should be able to greet Makho in English", function () {

        assert.equal("Hello, Makho", greet.correctInputs("Makho", "English"))
    })

    it("should be able to greet Makho in Afrikaans", function () {

        assert.equal("Halo, Makho", greet.correctInputs("Makho", "Afrikaans"))
    })



    it("should be able to add name to db and use user counter all users ", async () => {

        await greet.insertName("lolo");
        await greet.insertName("lolo");
        await greet.insertName("lulu");


        const count = await greet.counter()

        assert.equal(3, count);
    });

    it("should not be able to count for one person when duplicated", async function () { 
       
        await greet.insertName("lolo");
        await greet.insertName("lolo");
        await greet.insertName("lolo");


        const count = await greet.personCounter('lolo')

        assert.equal(1, count);
    })

    it("should be able to show the name when after inserted", async function (){
        await greet.insertName("lolo")

        const showName = await greet.getName()

        assert.deepEqual([{name_greeted:"Lolo"}],showName)
    })
    
    it("should update name when the name is inserted", async function (){
        await greet.insertName('lolo')

     await greet.updateNames("lolo")
     await greet.updateNames("lolo")

        assert.equal(3,await greet.personCounter('lolo'))
    })

    it("should be able delete the names when its reseted", async function(){
        await greet.insertName("lolo")
        await greet.insertName("lolo")


        await greet.deleteRs()

        assert.deepEqual([], await greet.getName())
    })

    it("should be able to show error message when name and language is not entered", function(){

            
             assert.equal(undefined,greet.correctInputs("", ""))


    })
    



after(function () {
    pool.end();
})
});