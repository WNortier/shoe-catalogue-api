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
        await pool.query(`delete from cart`)
        await pool.query(`delete from stock`);
        await pool.query(`delete from brands`);
        await pool.query(`delete from colors`);
        await pool.query(`delete from sizes`);
        await pool.query(`delete from stockimages`)

        await pool.query(`insert into brands (id, brand) values (1, 'Zonverse')`);
        await pool.query(`insert into brands (id, brand) values (3, 'Kucci')`);
        await pool.query(`insert into brands (id, brand) values (2, 'Yuma')`);
        await pool.query(`insert into brands (id, brand) values (4, 'Jimmy Woo')`);

        await pool.query(`insert into colors (id, color) values (1, 'Black')`);
        await pool.query(`insert into colors (id, color) values (2, 'Pink')`);
        await pool.query(`insert into colors (id, color) values (3, 'Red')`);
        await pool.query(`insert into colors (id, color) values (4, 'Metallic')`);

        await pool.query(`insert into sizes (id, size) values (1, 6)`);
        await pool.query(`insert into sizes (id, size) values (2, 7)`);
        await pool.query(`insert into sizes (id, size) values (3, 8)`);
        await pool.query(`insert into sizes (id, size) values (4, 9)`);

        //Zonverse images
        await pool.query(`insert into stockimages (id, image) values (3, 'z-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (1, 'z-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (4, 'z-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (2, 'z-pink.png')`);
        //Yuma images
        await pool.query(`insert into stockimages (id, image) values (6, 'y-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (7, 'y-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (8, 'y-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (5, 'y-black.png')`);
        //Kucci images
        await pool.query(`insert into stockimages (id, image) values (10, 'k-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (11, 'k-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (12, 'k-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (9, 'k-black.png')`);
        //Jimmy Woo images        
        await pool.query(`insert into stockimages (id, image) values (13, 'jw-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (14, 'jw-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (15, 'jw-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (16, 'jw-metallic.png')`);

        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (1, 1, 1, 999, 3, 1)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (2, 2, 2, 799, 3, 6)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (3, 3, 3, 899, 3, 11)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 4, 4, 999, 3, 16)`);
    });
    it('should return all shoes currently in my stock table', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.all();
        assert.equal(4, result.length);
    });
});

describe('allStock function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`)
        await pool.query(`delete from stock`);
        await pool.query(`delete from brands`);
        await pool.query(`delete from colors`);
        await pool.query(`delete from sizes`);
        await pool.query(`delete from stockimages`)

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

        //Zonverse images
        await pool.query(`insert into stockimages (id, image) values (3, 'z-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (1, 'z-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (4, 'z-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (2, 'z-pink.png')`);
        //Yuma images
        await pool.query(`insert into stockimages (id, image) values (6, 'y-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (7, 'y-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (8, 'y-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (5, 'y-black.png')`);
        //Kucci images
        await pool.query(`insert into stockimages (id, image) values (10, 'k-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (11, 'k-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (12, 'k-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (9, 'k-black.png')`);
        //Jimmy Woo images        
        await pool.query(`insert into stockimages (id, image) values (13, 'jw-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (14, 'jw-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (15, 'jw-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (16, 'jw-metallic.png')`);

        //INSERTING FOUR SHOES INTO DATABASE
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (1, 1, 1, 999, 3, 1)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (2, 2, 2, 799, 3, 6)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (3, 3, 3, 899, 3, 11)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 4, 4, 999, 3, 16)`);
    });
    it('should return all shoes currently in my stock table after performing an inner merge', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.allStock();

        assert.equal(4, result.length);

        assert.equal('Zonverse', result[0].brand);
        assert.equal('Black', result[0].color);
        assert.equal(6, result[0].size);
        assert.equal(999, result[0].price);
        assert.equal(3, result[0].quantity);

        assert.equal('Yuma', result[1].brand);
        assert.equal('Pink', result[1].color);
        assert.equal(7, result[1].size);
        assert.equal(799, result[1].price);
        assert.equal(3, result[1].quantity);
    });
});

describe('add function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`)
        await pool.query(`delete from stock`);
        await pool.query(`delete from brands`);
        await pool.query(`delete from colors`);
        await pool.query(`delete from sizes`);
        await pool.query(`delete from stockimages`)

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

        //Zonverse images
        await pool.query(`insert into stockimages (id, image) values (1, 'z-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (2, 'z-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (3, 'z-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (4, 'z-metallic.png')`);

        //Yuma images
        await pool.query(`insert into stockimages (id, image) values (6, 'y-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (7, 'y-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (8, 'y-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (5, 'y-black.png')`);
        //Kucci images
        await pool.query(`insert into stockimages (id, image) values (10, 'k-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (11, 'k-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (12, 'k-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (9, 'k-black.png')`);
        //Jimmy Woo images        
        await pool.query(`insert into stockimages (id, image) values (13, 'jw-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (14, 'jw-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (15, 'jw-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (16, 'jw-metallic.png')`);

        //INSERTING FOUR SHOES INTO DATABASE
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (1, 1, 1, 999, 3, 1)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (2, 2, 2, 799, 3, 6)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (3, 3, 3, 899, 3, 11)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 4, 4, 999, 3, 16)`);
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
        await pool.query(`delete from cart`)
        await pool.query(`delete from stock`);
        await pool.query(`delete from brands`);
        await pool.query(`delete from colors`);
        await pool.query(`delete from sizes`);
        await pool.query(`delete from stockimages`)

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

        //Zonverse images
        await pool.query(`insert into stockimages (id, image) values (3, 'z-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (1, 'z-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (4, 'z-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (2, 'z-pink.png')`);
        //Yuma images
        await pool.query(`insert into stockimages (id, image) values (6, 'y-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (7, 'y-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (8, 'y-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (5, 'y-black.png')`);
        //Kucci images
        await pool.query(`insert into stockimages (id, image) values (10, 'k-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (11, 'k-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (12, 'k-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (9, 'k-black.png')`);
        //Jimmy Woo images        
        await pool.query(`insert into stockimages (id, image) values (13, 'jw-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (14, 'jw-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (15, 'jw-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (16, 'jw-metallic.png')`);

        //INSERTING FOUR SHOES INTO DATABASE
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (1, 1, 1, 999, 3, 1)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (2, 2, 2, 799, 3, 6)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (3, 3, 3, 899, 3, 11)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 1, 4, 999, 3, 13)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 1, 1, 999, 3, 13)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 1, 1, 999, 3, 13)`);
    });
    it('should return all shoes of a specific brand', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterBrand(4);
        assert.equal(3, result.length);
        assert.equal('Jimmy Woo', result[0].brand);
        assert.equal('Jimmy Woo', result[1].brand);
        assert.equal('Jimmy Woo', result[2].brand);
    });
    it('should return all shoes of a specific color', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterColor(1);
        assert.equal(4, result.length)
        assert.equal('Black', result[0].color);
        assert.equal('Black', result[1].color);
        assert.equal('Black', result[2].color);
        assert.equal('Black', result[3].color);
    });
    it('should return all shoes of a specific size', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterSize(3);
        assert.equal(1, result.length);
        assert.equal(8, result[0].size);
    });
    it('should return all shoes of a specific brand and size', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterBrandSize(4, 1);
        assert.equal(2, result.length);
        assert.equal('Jimmy Woo', result[0].brand);
        assert.equal(6, result[0].size);
        assert.equal('Jimmy Woo', result[1].brand);
        assert.equal(6, result[1].size);
    });
    it('should return all shoes of a specific brand, color and size', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let result = await shoeServiceTesting.filterBrandColorSize(4, 1, 4);
        assert.equal(1, result.length);
        assert.equal('Jimmy Woo', result[0].brand);
        assert.equal('Black', result[0].color);
        assert.equal(9, result[0].size);
    });

});

describe('cart function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`)
        await pool.query(`delete from stock`);
        await pool.query(`delete from brands`);
        await pool.query(`delete from colors`);
        await pool.query(`delete from sizes`);
        await pool.query(`delete from stockimages`)

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

        //Zonverse images
        await pool.query(`insert into stockimages (id, image) values (3, 'z-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (1, 'z-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (4, 'z-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (2, 'z-pink.png')`);
        //Yuma images
        await pool.query(`insert into stockimages (id, image) values (6, 'y-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (7, 'y-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (8, 'y-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (5, 'y-black.png')`);
        //Kucci images
        await pool.query(`insert into stockimages (id, image) values (10, 'k-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (11, 'k-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (12, 'k-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (9, 'k-black.png')`);
        //Jimmy Woo images        
        await pool.query(`insert into stockimages (id, image) values (13, 'jw-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (14, 'jw-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (15, 'jw-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (16, 'jw-metallic.png')`);

        //INSERTING FOUR SHOES INTO DATABASE
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (1, 1, 1, 999, 3, 1)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (2, 2, 2, 799, 3, 6)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (3, 3, 3, 899, 3, 11)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 1, 4, 999, 3, 13)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 1, 1, 999, 3, 13)`);
    });
    it('should return the carted shoe for rendering', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let allStock = await shoeServiceTesting.all()
        let result = await shoeServiceTesting.cart(allStock[3].id);
        assert.equal('Jimmy Woo', result[0].brand);
        assert.equal('Black', result[0].color);
        assert.equal(9, result[0].size);
        assert.equal(999, result[0].price);
        assert.equal(1, result[0].quantity)
        assert.equal(999, result[0].total);
    });
    it('should add to the quantity if the shoe has already been carted and return the carted shoe for rendering', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let allStock = await shoeServiceTesting.all()
        await shoeServiceTesting.cart(allStock[1].id)
        let result = await shoeServiceTesting.cart(allStock[1].id)
        assert.equal(1, result.length)
        assert.equal('Yuma', result[0].brand)
        assert.equal('Pink', result[0].color)
        assert.equal(7, result[0].size)
        assert.equal(799, result[0].price)
        assert.equal(2, result[0].quantity)
        assert.equal(1598, result[0].total)
    });
    it('should return multiple carted shoes for rendering', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let allStock = await shoeServiceTesting.all()
        await shoeServiceTesting.cart(allStock[0].id)
        await shoeServiceTesting.cart(allStock[0].id)
        await shoeServiceTesting.cart(allStock[0].id)
        await shoeServiceTesting.cart(allStock[1].id)
        await shoeServiceTesting.cart(allStock[1].id)
        let result = await shoeServiceTesting.cart(allStock[4].id)
        let firstCartedShoe = result[0]
        let secondCartedShoe = result[1]
        let thirdCartedShoe = result[2]
        let cartTotal = result[0].total
        assert.equal("Zonverse", firstCartedShoe.brand)
        assert.equal(3, firstCartedShoe.quantity)
        assert.equal("Yuma", secondCartedShoe.brand)
        assert.equal(2, secondCartedShoe.quantity)
        assert.equal("Jimmy Woo", thirdCartedShoe.brand)
        assert.equal(1, thirdCartedShoe.quantity)
        assert.equal((firstCartedShoe.price * 3) + (secondCartedShoe.price * 2) + (thirdCartedShoe.price), cartTotal)
    });
    it('should prevent cart quantity from incrementing if it is equal to that of the shoes stock', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let allStock = await shoeServiceTesting.all()
        await shoeServiceTesting.cart(allStock[1].id);
        await shoeServiceTesting.cart(allStock[0].id);
        await shoeServiceTesting.cart(allStock[0].id);
        let result = await shoeServiceTesting.cart(allStock[0].id);
        let attemptingToCartMoreThanInStock = await shoeServiceTesting.cart(allStock[0].id);
        let cartItems = await shoeServiceTesting.showCart();
        assert.equal(2, cartItems.length)
        assert.equal('Yuma', cartItems[0].brand)
        assert.equal(1, cartItems[0].quantity)
        assert.equal('Zonverse', cartItems[1].brand)
        assert.equal(3, cartItems[1].quantity)
        assert.equal(((cartItems[0].price) + (cartItems[1].price * 3)), result[0].total)
    });
});

describe('checkout function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`)
        await pool.query(`delete from stock`);
        await pool.query(`delete from brands`);
        await pool.query(`delete from colors`);
        await pool.query(`delete from sizes`);
        await pool.query(`delete from stockimages`)

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

        //Zonverse images
        await pool.query(`insert into stockimages (id, image) values (3, 'z-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (1, 'z-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (4, 'z-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (2, 'z-pink.png')`);
        //Yuma images
        await pool.query(`insert into stockimages (id, image) values (6, 'y-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (7, 'y-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (8, 'y-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (5, 'y-black.png')`);
        //Kucci images
        await pool.query(`insert into stockimages (id, image) values (10, 'k-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (11, 'k-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (12, 'k-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (9, 'k-black.png')`);
        //Jimmy Woo images        
        await pool.query(`insert into stockimages (id, image) values (13, 'jw-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (14, 'jw-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (15, 'jw-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (16, 'jw-metallic.png')`);

        //INSERTING FOUR SHOES INTO DATABASE
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (1, 1, 1, 999, 3, 1)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (2, 2, 2, 799, 3, 6)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (3, 3, 3, 899, 3, 11)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 1, 4, 999, 3, 13)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 1, 1, 999, 3, 13)`);
    });
    it('should clear the cart table of a single shoe carted and decrement the quantities of the corresponding items in the stock table', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let allStock = await shoeServiceTesting.all()
        await shoeServiceTesting.cart(allStock[0].id)
        await shoeServiceTesting.cart(allStock[0].id)
        await shoeServiceTesting.checkout()
        let result = await shoeServiceTesting.all()
        let cartItems = await shoeServiceTesting.showCart();
        assert.equal(0, cartItems.length)
        assert.equal(1, result[4].brand_id)
        assert.equal(1, result[4].quantity)
    });
    it('should clear the cart table of multiple shoes carted and decrement the quantities of the corresponding items in the stock table, deleting entries that have a quantity of 0', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let allStock = await shoeServiceTesting.all()
        await shoeServiceTesting.cart(allStock[0].id)
        await shoeServiceTesting.cart(allStock[0].id)
        await shoeServiceTesting.cart(allStock[3].id)
        await shoeServiceTesting.cart(allStock[3].id)
        await shoeServiceTesting.cart(allStock[4].id)
        await shoeServiceTesting.checkout()
        let result = await shoeServiceTesting.all()
        let cartItems = await shoeServiceTesting.showCart();
        assert.equal(0, cartItems.length)

        assert.equal(1, result[2].brand_id)
        assert.equal(1, result[2].color_id)
        assert.equal(1, result[2].size_id)
        //Had three in stock, purchased two, so there is one remaining
        assert.equal(1, result[2].quantity)

        assert.equal(4, result[3].brand_id)
        assert.equal(1, result[3].color_id)
        assert.equal(4, result[3].size_id)
        //Had three in stock, purchased two, so there is one remaining
        assert.equal(1, result[3].quantity)

        assert.equal(4, result[4].brand_id)
        assert.equal(1, result[4].color_id)
        assert.equal(1, result[4].size_id)
        //Had three in stock, purchased one, so there is one remaining
        assert.equal(2, result[4].quantity)
    });
    it('should clear the cart table of multiple shoes carted and decrement the quantities of the corresponding items in the stock table, deleting entries that have a quantity of 0', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let allStock = await shoeServiceTesting.all()
        await shoeServiceTesting.cart(allStock[0].id)
        await shoeServiceTesting.cart(allStock[0].id)
        await shoeServiceTesting.cart(allStock[0].id)
        await shoeServiceTesting.cart(allStock[3].id)
        await shoeServiceTesting.cart(allStock[3].id)
        await shoeServiceTesting.cart(allStock[3].id)
        await shoeServiceTesting.cart(allStock[4].id)
        await shoeServiceTesting.checkout()
        let result = await shoeServiceTesting.all()
        let cartItems = await shoeServiceTesting.showCart();
        //console.log(cartItems)
        assert.equal(0, cartItems.length)
        //Two shoes were purchased completely and so the stock length decreased to 3
        assert.equal(3, result.length)
        assert.equal(4, result[2].brand_id)
        assert.equal(1, result[2].color_id)
        assert.equal(1, result[2].size_id)
        //Had three in stock, purchased one, so there is one remaining
        assert.equal(2, result[2].quantity)
    });
});
describe('cancel function', async () => {
    beforeEach(async () => {
        await pool.query(`delete from cart`)
        await pool.query(`delete from stock`);
        await pool.query(`delete from brands`);
        await pool.query(`delete from colors`);
        await pool.query(`delete from sizes`);
        await pool.query(`delete from stockimages`)

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

        //Zonverse images
        await pool.query(`insert into stockimages (id, image) values (3, 'z-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (1, 'z-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (4, 'z-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (2, 'z-pink.png')`);
        //Yuma images
        await pool.query(`insert into stockimages (id, image) values (6, 'y-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (7, 'y-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (8, 'y-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (5, 'y-black.png')`);
        //Kucci images
        await pool.query(`insert into stockimages (id, image) values (10, 'k-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (11, 'k-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (12, 'k-metallic.png')`);
        await pool.query(`insert into stockimages (id, image) values (9, 'k-black.png')`);
        //Jimmy Woo images        
        await pool.query(`insert into stockimages (id, image) values (13, 'jw-black.png')`);
        await pool.query(`insert into stockimages (id, image) values (14, 'jw-pink.png')`);
        await pool.query(`insert into stockimages (id, image) values (15, 'jw-red.png')`);
        await pool.query(`insert into stockimages (id, image) values (16, 'jw-metallic.png')`);

        //INSERTING FOUR SHOES INTO DATABASE
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (1, 1, 1, 999, 3, 1)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (2, 2, 2, 799, 3, 6)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (3, 3, 3, 899, 3, 11)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 1, 4, 999, 3, 13)`);
        await pool.query(`insert into stock (brand_id, color_id, size_id, price, quantity, image_id) values (4, 1, 1, 999, 3, 13)`);
    });
    it('should clear the cart table', async () => {
        const shoeServiceTesting = ShoeServiceTesting(pool);
        let allStock = await shoeServiceTesting.all()
        await shoeServiceTesting.cart(allStock[0].id)
        await shoeServiceTesting.cart(allStock[0].id)
        let cancelResult = await shoeServiceTesting.cancel()
        assert.equal(0, cancelResult.length)
    });

});
after(function () {
    pool.end();
})