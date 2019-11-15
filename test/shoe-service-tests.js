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
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 6, 1299, 5)`);
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
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 6, 1299, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo','Metallic', 8, 1499, 2)`);
    });
    it('should UPDATE a shoes quantity in the shoes table if it already exists', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        const shoe = {
            brand: 'Yuma',
            color: 'Black',
            size: 8,
            price: 999,
            quantity: 5
        }
        await shoeServiceTesting.add(shoe);
        let result = await shoeServiceTesting.all();
        assert.equal(3, result.length);
        assert.equal(10, result[2].quantity);
    });
    it('should INSERT a shoe in the shoes table if it does not exist', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        const shoe = {
            brand: 'Yuma',
            color: 'Orange',
            size: 7,
            price: 699,
            quantity: 5
        }
        await shoeServiceTesting.add(shoe);
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
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 6, 1299, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 9, 1299, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo','Metallic', 8, 1499, 2)`);
    });
    it('should return all shoes of a specific brand', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterBrand('Yuma');
        assert.equal(2, result.length);
    });
    it('should return all shoes of a specific color', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterColor('Red');
        assert.equal(3, result.length);
    });
    it('should return all shoes of a specific size', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterSize(8);
        assert.equal(2, result.length);
    });
    it('should return all shoes of a specific brand, color and size', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterBrandColorSize('Zonverse', 'Red', 9);
        assert.equal(1, result.length);
    });
});

describe('cart function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`);
        await pool.query(`delete from shoes`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Black', 8, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 6, 1299, 3)`);
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
        await shoeServiceTesting.cart('Zonverse', 'Red', 6)
        await shoeServiceTesting.cart('Zonverse', 'Red', 6)
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
        await shoeServiceTesting.cart('Zonverse', 'Red', 6)
        await shoeServiceTesting.cart('Zonverse', 'Red', 6)
        await shoeServiceTesting.cart('Zonverse', 'Red', 6)
        await shoeServiceTesting.cart('Zonverse', 'Red', 6)
        let result = await shoeServiceTesting.showCart()
        let firstCartedShoe = result[0]
        let secondCartedShoe = result[1]
        assert.equal("Yuma", firstCartedShoe.brand)
        assert.equal("Zonverse", secondCartedShoe.brand)
        assert.equal(3, secondCartedShoe.quantity)
    });
});

describe('checkout function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`);
        await pool.query(`delete from shoes`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Black', 8, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Red', 7, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 6, 1299, 3)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 9, 1299, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo','Metallic', 8, 1499, 2)`);
    });
    it('should clear the cart table and decrement the quantities of the corresponding items in the shoes table, deleting entries that have a quantity of 0', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        await shoeServiceTesting.cart('Zonverse', 'Red', 6)
        await shoeServiceTesting.cart('Zonverse', 'Red', 6)
        await shoeServiceTesting.cart('Yuma', 'Red', 7)
        await shoeServiceTesting.cart('Yuma', 'Red', 7)
        await shoeServiceTesting.cart('Yuma', 'Red', 7)
        await shoeServiceTesting.cart('Yuma', 'Red', 7)
        await shoeServiceTesting.cart('Yuma', 'Red', 7)
        await shoeServiceTesting.checkout()
        let result = await shoeServiceTesting.all()
        assert.equal(4, result.length)
        assert.equal(1, result[3].quantity)

    });
});
describe('cancel function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`);
        await pool.query(`delete from shoes`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Black', 8, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Red', 7, 999, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 6, 1299, 3)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 9, 1299, 5)`);
        await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo','Metallic', 8, 1499, 2)`);
    });
    it('should clear the cart table and restore the quantities of the corresponding items in the shoes table', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        await shoeServiceTesting.cart('Zonverse', 'Red', 6)
        await shoeServiceTesting.cart('Zonverse', 'Red', 6)
        let cancelResult = await shoeServiceTesting.cancel()
        assert.equal(0, cancelResult.length)
    });
    after(function () {
        pool.end();
    })
});