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
        await pool.query(`delete from stock`);
        await pool.query(`delete from cart`);
        await pool.query(`delete from brands`);
        await pool.query(`delete from colors`);
        await pool.query(`delete from sizes`);

        await pool.query(`insert into brands (id, brand) values (1, 'Zonverse')`);
        await pool.query(`insert into brands (id, brand) values (2, 'Yuma')`);
        await pool.query(`insert into brands (id, brand) values (3, 'Kucci')`);
        await pool.query(`insert into brands (id, brand) values (4, 'Jimmy Woo')`);

        await pool.query(`insert into colors (id, color) values (1, 'Black')`);
        await pool.query(`insert into colors (id, color) values (2, 'Pink')`);
        await pool.query(`insert into colors (id, color) values (3, 'Red')`);
        await pool.query(`insert into colors (id, color) values (4, 'Metallic')`);

        await pool.query(`insert into sizes (id, size) values (1, 6)`);
        await pool.query(`insert into sizes (id, size) values (2, 7)`);
        await pool.query(`insert into sizes (id, size) values (3, 8)`);
        await pool.query(`insert into sizes (id, size) values (4, 9)`);

        //INSERTING FOUR SHOES INTO DATABASE
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (1, 1, 1, 999, 3)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (2, 2, 2, 799, 3)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (3, 3, 3, 899, 3)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (4, 4, 4, 999, 3)`);
    });
    it('should return all shoes currently in my shoecatalogue(database)', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.all();
        assert.equal(4, result.length);
    });
});

describe('add function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from stock`);
        await pool.query(`delete from cart`);
        await pool.query(`delete from brands`);
        await pool.query(`delete from colors`);
        await pool.query(`delete from sizes`);

        await pool.query(`insert into brands (id, brand) values (1, 'Zonverse')`);
        await pool.query(`insert into brands (id, brand) values (2, 'Yuma')`);
        await pool.query(`insert into brands (id, brand) values (3, 'Kucci')`);
        await pool.query(`insert into brands (id, brand) values (4, 'Jimmy Woo')`);

        await pool.query(`insert into colors (id, color) values (1, 'Black')`);
        await pool.query(`insert into colors (id, color) values (2, 'Pink')`);
        await pool.query(`insert into colors (id, color) values (3, 'Red')`);
        await pool.query(`insert into colors (id, color) values (4, 'Metallic')`);

        await pool.query(`insert into sizes (id, size) values (1, 6)`);
        await pool.query(`insert into sizes (id, size) values (2, 7)`);
        await pool.query(`insert into sizes (id, size) values (3, 8)`);
        await pool.query(`insert into sizes (id, size) values (4, 9)`);

        //INSERTING FOUR SHOES INTO DATABASE
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (1, 1, 1, 999, 3)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (2, 2, 2, 799, 3)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (3, 3, 3, 899, 3)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (4, 4, 4, 999, 3)`);
    });
    it('should UPDATE a shoes quantity in the stock table if it already exists', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        const shoe = {
            brand: 1,
            color: 1,
            size: 1,
            price: 999,
            quantity: 5
        }
        await shoeServiceTesting.add(shoe);
        let result = await shoeServiceTesting.all();
        assert.equal(4, result.length);
        assert.equal(1, result[3].brand_id);
        assert.equal(1, result[3].color_id);
        assert.equal(1, result[3].size_id);
        assert.equal(8, result[3].quantity);
    });
    it('should UPDATE a shoes price in the stock table if it already exists', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        const shoe = {
            brand: 2,
            color: 2,
            size: 2,
            price: 599,
            quantity: 0
        }
        await shoeServiceTesting.add(shoe);
        let result = await shoeServiceTesting.all();
        assert.equal(4, result.length);
        assert.equal(2, result[3].brand_id);
        assert.equal(2, result[3].color_id);
        assert.equal(2, result[3].size_id);
        assert.equal(599, result[3].price);
    });
    it('should UPDATE a shoes price and quantity in the stock table if it already exists', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        const shoe = {
            brand: 3,
            color: 3,
            size: 3,
            price: 1099,
            quantity: 10
        }
        await shoeServiceTesting.add(shoe);
        let result = await shoeServiceTesting.all();
        assert.equal(4, result.length);
        assert.equal(3, result[3].brand_id);
        assert.equal(3, result[3].color_id);
        assert.equal(3, result[3].size_id);
        assert.equal(1099, result[3].price);
        assert.equal(13, result[3].quantity)
    });
    it('should ADD a shoe to the stock table if it does not exist', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        const shoe = {
            brand: 3,
            color: 3,
            size: 1,
            price: 499,
            quantity: 3
        }
        await shoeServiceTesting.add(shoe);
        let result = await shoeServiceTesting.all();
        assert.equal(5, result.length);
        assert.equal(3, result[4].brand_id);
        assert.equal(3, result[4].color_id);
        assert.equal(1, result[4].size_id);
        assert.equal(499, result[4].price);
        assert.equal(3, result[4].quantity)
    });
});

describe('search function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from stock`);
        await pool.query(`delete from cart`);
        await pool.query(`delete from brands`);
        await pool.query(`delete from colors`);
        await pool.query(`delete from sizes`);

        await pool.query(`insert into brands (id, brand) values (1, 'Zonverse')`);
        await pool.query(`insert into brands (id, brand) values (2, 'Yuma')`);
        await pool.query(`insert into brands (id, brand) values (3, 'Kucci')`);
        await pool.query(`insert into brands (id, brand) values (4, 'Jimmy Woo')`);

        await pool.query(`insert into colors (id, color) values (1, 'Black')`);
        await pool.query(`insert into colors (id, color) values (2, 'Pink')`);
        await pool.query(`insert into colors (id, color) values (3, 'Red')`);
        await pool.query(`insert into colors (id, color) values (4, 'Metallic')`);

        await pool.query(`insert into sizes (id, size) values (1, 6)`);
        await pool.query(`insert into sizes (id, size) values (2, 7)`);
        await pool.query(`insert into sizes (id, size) values (3, 8)`);
        await pool.query(`insert into sizes (id, size) values (4, 9)`);

        //INSERTING FOUR SHOES INTO DATABASE
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (1, 1, 1, 999, 3)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (2, 2, 2, 799, 3)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (3, 3, 3, 899, 3)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (4, 1, 4, 999, 3)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity) values (4, 1, 1, 999, 3)`);
    });
    it('should return all shoes of a specific brand', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterBrand(4);
        assert.equal(2, result.length);
        assert.equal('Jimmy Woo', result[0].brand);
        assert.equal('Jimmy Woo', result[1].brand);
    });
    it('should return all shoes of a specific color', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterColor(1);
        assert.equal(3, result.length)
        assert.equal('Black', result[0].color);
        assert.equal('Black', result[1].color);
        assert.equal('Black', result[2].color);
    });
    it('should return all shoes of a specific size', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterSize(3);
        assert.equal(1, result.length);
        assert.equal(8, result[0].size);
    });
    it('should return all shoes of a specific brand, color and size', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterBrandColorSize(4, 1, 4);
        assert.equal(1, result.length);
        assert.equal('Jimmy Woo', result[0].brand);
        assert.equal('Black', result[0].color);
        assert.equal(9, result[0].size);
    });
    after(function () {
        pool.end();
    })
});

// describe('cart function', async () => {
//     beforeEach(async () => {
//         await pool.query(`delete from cart`);
//         await pool.query(`delete from shoes`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Black', 8, 999, 5)`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 6, 1299, 3)`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo','Metallic', 8, 1499, 2)`);
//     });
//     it('should return the carted shoe for rendering', async () => {
//         const shoeServiceTesting = ShoeServiceTesting(pool);
//         let result = await shoeServiceTesting.cart('Yuma', 'Black', 8)
//         assert.equal('Yuma', result[0].brand)
//         assert.equal('Black', result[0].color)
//         assert.equal(8, result[0].size)
//     });
//     it('should add to the quantity if the shoe has already been carted and return the carted shoe for rendering', async () => {
//         const shoeServiceTesting = ShoeServiceTesting(pool);
//         await shoeServiceTesting.cart('Yuma', 'Black', 8)
//         let result = await shoeServiceTesting.cart('Yuma', 'Black', 8)
//         assert.equal('Yuma', result[0].brand)
//         assert.equal('Black', result[0].color)
//         assert.equal(8, result[0].size)
//         assert.equal(2, result[0].quantity)
//     });
//     it('should return multiple carted shoes for rendering', async () => {
//         const shoeServiceTesting = ShoeServiceTesting(pool);
//         await shoeServiceTesting.cart('Yuma', 'Black', 8)
//         await shoeServiceTesting.cart('Zonverse', 'Red', 6)
//         await shoeServiceTesting.cart('Zonverse', 'Red', 6)
//         let result = await shoeServiceTesting.showCart()
//         let firstCartedShoe = result[0]
//         let secondCartedShoe = result[1]
//         assert.equal("Yuma", firstCartedShoe.brand)
//         assert.equal("Zonverse", secondCartedShoe.brand)
//         assert.equal(2, secondCartedShoe.quantity)
//     });
//     it('should prevent cart quantity from incrementing if it is equal to that of the shoes stock', async () => {
//         const shoeServiceTesting = ShoeServiceTesting(pool);
//         await shoeServiceTesting.cart('Yuma', 'Black', 8)
//         await shoeServiceTesting.cart('Zonverse', 'Red', 6)
//         await shoeServiceTesting.cart('Zonverse', 'Red', 6)
//         await shoeServiceTesting.cart('Zonverse', 'Red', 6)
//         await shoeServiceTesting.cart('Zonverse', 'Red', 6)
//         let result = await shoeServiceTesting.showCart()
//         let firstCartedShoe = result[0]
//         let secondCartedShoe = result[1]
//         assert.equal("Yuma", firstCartedShoe.brand)
//         assert.equal("Zonverse", secondCartedShoe.brand)
//         assert.equal(3, secondCartedShoe.quantity)
//         let shoesTableStock = await shoeServiceTesting.all()
//         assert.equal("Zonverse", shoesTableStock[1].brand)
//         assert.equal(3, shoesTableStock[1].quantity)
//         assert.equal("Red", shoesTableStock[1].color)
//     });
// });

// describe('checkout function', async () => {
//     beforeEach(async () => {
//         await pool.query(`delete from cart`);
//         await pool.query(`delete from shoes`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Black', 8, 999, 5)`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Red', 7, 999, 5)`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 6, 1299, 3)`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 9, 1299, 5)`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo','Metallic', 8, 1499, 2)`);
//     });
//     it('should clear the cart table and decrement the quantities of the corresponding items in the shoes table, deleting entries that have a quantity of 0', async () => {
//         const shoeServiceTesting = ShoeServiceTesting(pool);
//         await shoeServiceTesting.cart('Zonverse', 'Red', 6)
//         await shoeServiceTesting.cart('Zonverse', 'Red', 6)
//         await shoeServiceTesting.cart('Yuma', 'Red', 7)
//         await shoeServiceTesting.cart('Yuma', 'Red', 7)
//         await shoeServiceTesting.cart('Yuma', 'Red', 7)
//         await shoeServiceTesting.cart('Yuma', 'Red', 7)
//         await shoeServiceTesting.cart('Yuma', 'Red', 7)
//         await shoeServiceTesting.checkout()
//         let result = await shoeServiceTesting.all()
//         assert.equal(4, result.length)
//         assert.equal(1, result[3].quantity)
//         assert.equal("Zonverse", result[3].brand)
//     });
// });
// describe('cancel function', async () => {
//     beforeEach(async () => {
//         await pool.query(`delete from cart`);
//         await pool.query(`delete from shoes`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Black', 8, 999, 5)`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Yuma', 'Red', 7, 999, 5)`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 6, 1299, 3)`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Zonverse', 'Red', 9, 1299, 5)`);
//         await pool.query(`insert into shoes (brand, color, size, price, quantity) values ('Jimmy Woo','Metallic', 8, 1499, 2)`);
//     });
//     it('should clear the cart table', async () => {
//         const shoeServiceTesting = ShoeServiceTesting(pool);
//         await shoeServiceTesting.cart('Zonverse', 'Red', 6)
//         await shoeServiceTesting.cart('Zonverse', 'Red', 6)
//         let cancelResult = await shoeServiceTesting.cancel()
//         assert.equal(0, cancelResult.length)
//     });
//     after(function () {
//         pool.end();
//     })
// });