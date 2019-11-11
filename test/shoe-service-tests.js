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
        assert.equal(1, result.length);
    });

});
describe('cart function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`);
        await pool.query(`delete from shoes`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Black', 8, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 10, 1299, 3)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo','Metallic', 8, 1499, 2)`);
    });
    it('should return the carted shoe for rendering', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.cart('Yuma', 'Black', 8)
        assert.equal('Yuma', result[0].brand)
        assert.equal('Black', result[0].color)
        assert.equal(8, result[0].size)
    });
    it('should add to the quantity if the shoe has already been carted and return the carted shoe for rendering', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        await shoeServiceTesting.cart('Yuma', 'Black', 8)
        let result = await shoeServiceTesting.cart('Yuma', 'Black', 8)
        assert.equal('Yuma', result[0].brand)
        assert.equal('Black', result[0].color)
        assert.equal(8, result[0].size)
        assert.equal(2, result[0].quantity)
    });
    it('should return the carted shoes for rendering', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        await shoeServiceTesting.cart('Yuma', 'Black', 8)
        await shoeServiceTesting.cart('Zonverse', 'Red', 10)
        await shoeServiceTesting.cart('Zonverse', 'Red', 10)
        let result = await shoeServiceTesting.showCart()
        let firstCartedShoe = result[0]
        let secondCartedShoe = result[1]
        assert.equal("Yuma", firstCartedShoe.brand)
        assert.equal("Zonverse", secondCartedShoe.brand)
        assert.equal(2, secondCartedShoe.quantity)
    });
    it('should prevent cart quantity from incrementing if it is equal to that of the shoes stock', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        await shoeServiceTesting.cart('Yuma', 'Black', 8)
        await shoeServiceTesting.cart('Zonverse', 'Red', 10)
        await shoeServiceTesting.cart('Zonverse', 'Red', 10)
        await shoeServiceTesting.cart('Zonverse', 'Red', 10)
        await shoeServiceTesting.cart('Zonverse', 'Red', 10)
        let result = await shoeServiceTesting.showCart()
        let firstCartedShoe = result[0]
        let secondCartedShoe = result[1]
        assert.equal("Yuma", firstCartedShoe.brand)
        assert.equal("Zonverse", secondCartedShoe.brand)
        assert.equal(3, secondCartedShoe.quantity)
    });
    after(function () {
        pool.end();
    })
});