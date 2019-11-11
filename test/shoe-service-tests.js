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

describe('all function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`);
        await pool.query(`delete from shoes`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Black', 8, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 10, 1299, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo', 'Metallic', 8, 1499, 2)`);
    });
    it('should return all shoes currently in my shoecatalogue(database)', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.all();
        assert.equal(3, result.length);
    });
});

describe('add function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`);
        await pool.query(`delete from shoes`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Black', 8, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 10, 1299, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo','Metallic', 8, 1499, 2)`);
    });
    it('should UPDATE a shoes quantity in the shoes table if it already exists', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        await shoeServiceTesting.add('Yuma', 'Black', 8, 999, 5);
        let result = await shoeServiceTesting.all();
        assert.equal(3, result.length);
        assert.equal(10, result[2].quantity);
    });
    it('should INSERT a shoe in the shoes table if it does not exist', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        await shoeServiceTesting.add('Yuma', 'Orange', 7, 699, 5);
        let result = await shoeServiceTesting.all();
        assert.equal(4, result.length);
    });
});
describe('search function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`);
        await pool.query(`delete from shoes`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Black', 8, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Red', 7, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 10, 1299, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 9, 1299, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo','Metallic', 8, 1499, 2)`);
    });
    it('should return all shoes of a specific brand', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filter('Yuma')
        assert.equal(2, result.length);
    });
    it('should return all shoes of a specific color', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filter('Red')
        assert.equal(3, result.length);
    });
    it('should return all shoes of a specific size', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filter(8)
        assert.equal(2, result.length);
    });
    it('should return all shoes of a specific brand, size and color', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filter('Zonverse', 'Red', 10)
        console.log(result)
        assert.equal(1, result.length);
    });

});
describe('cart function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`);
        await pool.query(`delete from shoes`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Black', 8, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 10, 1299, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo','Metallic', 8, 1499, 2)`);
    });
    it('should decrement the shoe entry in the database and return the carted shoe for rendering', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.cart('Yuma', 'Black', 8)
        assert.deepEqual({brand:'Yuma',color:'Black', size:8, price:999, quantity:1}, result)
    });
    after(function () {
        pool.end();
    })
});