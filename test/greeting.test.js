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



after(function () {
    pool.end();
})
});