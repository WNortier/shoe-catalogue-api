assert = require("assert");
const ShoeServiceTesting = require("../services/shoes-service");

const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://warwick:pg123@localhost:5432/shoecatalogue';

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

describe('createAccount function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from shoes`);
        await pool.query(`insert into shoes (brand, color, style, size, price, quantity) values ('Yuma', 'Black', 'Sandals', 8, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, style, size, price, quantity) values ('Zonverse', 'Red', 'Sneakers', 10, 1299, 5)`);
        await pool.query(`insert into shoes (brand, color, style, size, price, quantity) values ('Jimmy Woo', 'Metallic', 'High Heels', 8, 1499, 2)`);
    });
    describe('AddShoe function', async () => {
        it('should UPDATE a shoes quantity in the shoes table if it already exists', async () => {
            const shoeServiceTesting = ShoeServiceTesting(pool);
            await shoeServiceTesting.addShoe('Yuma', 'Black', 'Sandals', 8, 999, 5);
            let result = await shoeServiceTesting.shoesTestAssistant();
            assert.equal(3, result.length);
            assert.equal(10, result[2].quantity);
        });
    });
    describe('AddShoe function', async () => {
        it('should INSERT a shoe in the shoes table if it does not exist', async () => {
            const shoeServiceTesting = ShoeServiceTesting(pool);
            await shoeServiceTesting.addShoe('Yuma', 'Orange', 'Sneaker', 7, 699, 5);
            let result = await shoeServiceTesting.shoesTestAssistant();
            assert.equal(4, result.length);
        });
    });    
    after(function(){
        pool.end();
    })
});

// describe('createAccount function', async () => {
//     beforeEach(async () => {
//         await pool.query(`delete from shoes`);
//         await pool.query(`insert into shoes (brand, color, style, size, price, quantity) values ('Yuma', 'Black', 'Sandals', 8, 999, 5)`);
//         await pool.query(`insert into shoes (brand, color, style, size, price, quantity) values ('Zonverse', 'Red', 'Sneakers', 10, 1299, 5)`);
//         await pool.query(`insert into shoes (brand, color, style, size, price, quantity) values ('Jimmy Woo', 'Metallic', 'High Heels', 8, 1499, 2)`);
//     });
//     describe('AddShoe function', async () => {
//         it('should UPDATE a shoes quantity in the shoes table if it already exists', async () => {
//             const shoeServiceTesting = ShoeServiceTesting(pool);
//             await shoeServiceTesting.addShoe('Yuma', 'Black', 'Sandals', 8, 999, 5);
//             let result = await shoeServiceTesting.shoesTestAssistant();
//             assert.equal(3, result.length);
//             assert.equal(10, result[2].quantity);
//         });
//     });
//     describe('AddShoe function', async () => {
//         it('should INSERT a shoe in the shoes table if it does not exist', async () => {
//             const shoeServiceTesting = ShoeServiceTesting(pool);
//             await shoeServiceTesting.addShoe('Yuma', 'Orange', 'Sneaker', 7, 699, 5);
//             let result = await shoeServiceTesting.shoesTestAssistant();
//             assert.equal(4, result.length);
//         });
//     });    
//     after(function(){
//         pool.end();
//     })
// });
