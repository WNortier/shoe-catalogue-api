module.exports = function ShoeService(pool) {
    let cartedShoe = {}

    async function add(brand, color, size, price, quantity) {
        const duplicateShoesCheck = await pool.query(`SELECT * FROM shoes WHERE brand = $1 AND color = $2 AND size = $3`, [brand, color, size]);
        const result = duplicateShoesCheck.rowCount;
        if (result > 0) {
            const currentShoesQuantityExtraction = await pool.query(`SELECT quantity FROM shoes WHERE brand = $1 AND color = $2 AND size = $3`, [brand, color, size]);
            let newShoesQuantity = currentShoesQuantityExtraction.rows[0].quantity + quantity;
            await pool.query('UPDATE shoes SET quantity = $1 WHERE brand = $2 AND color = $3 AND size = $4', [newShoesQuantity, brand, color, size]);
        } else {
            await pool.query(`INSERT INTO shoes (brand, color, size, price, quantity) VALUES ($1, $2, $3, $4, $5)`, [brand, color, size, price, quantity]);
        }
    }

    async function filter(input, inputTwo, InputThree) {
        if (input !== undefined && inputTwo == undefined && InputThree == undefined) {
            if (input == "Yuma" || input == "Zonverse" || input == "Jimmy Woo") {
                const filterByBrandExtraction = await pool.query(`SELECT * FROM shoes WHERE brand = $1`, [input]);
                return filterByBrandExtraction.rows
            } else if (input == "Black" || input == "Red" || input == "Metallic") {
                const filterByColorExtraction = await pool.query(`SELECT * FROM shoes WHERE color = $1`, [input]);
                return filterByColorExtraction.rows
            } else if (input == 9 || input == 8 || input == 7 || input == 6) {
                const filterBySizeExtraction = await pool.query(`SELECT * FROM shoes WHERE size = $1`, [input])
                return filterBySizeExtraction.rows
            }
        } else if (input !== undefined && inputTwo !== undefined && InputThree !== undefined) {
            const filterByBrandColorSize = await pool.query(`SELECT * FROM shoes WHERE brand = $1 AND color = $2 AND size = $3`, [input, inputTwo, Number(InputThree)])
            return filterByBrandColorSize.rows
        }
    }

    async function all() {
        const allShoes = await pool.query(`SELECT * FROM shoes`);
        return allShoes.rows;
    }

    async function showCart() {
        const allCart = await pool.query('SELECT * FROM cart')
        return allCart.rows
    }

    async function cart(brand, color, size) {
        //Obtaining the data of the shoe I want to cart from the shoes table
        const cartedShoeExtraction = await pool.query(`SELECT * FROM shoes WHERE brand = $1 AND color = $2 AND size = $3`, [brand, color, size]);
        let cartedShoe = cartedShoeExtraction.rows[0];
        //Checking if the shoe has been carted before
        let alreadyCartedCheck = await pool.query(`SELECT * FROM cart where brand = $1 AND color = $2 AND size = $3`, [cartedShoe.brand, cartedShoe.color, cartedShoe.size])
        //If the rowCount is 0, add it to the cart
        if (alreadyCartedCheck.rowCount == 0) {
            cartedShoe.quantity = 1
            await pool.query(`INSERT INTO cart (brand, color, size, price, quantity, shoes_id) VALUES ($1, $2, $3, $4, $5, $6)`, [cartedShoe.brand, cartedShoe.color, cartedShoe.size, cartedShoe.price, cartedShoe.quantity, cartedShoe.id]);
        }
        //Else if the rowCount is > 0 update the quantity...
        else if (alreadyCartedCheck.rowCount > 0) {
            let cartUpdateExtraction = await pool.query(`SELECT brand, color, size, price, quantity FROM cart WHERE shoes_id = $1`, [cartedShoe.id])
            let cartUpdate = cartUpdateExtraction.rows[0]
            cartUpdate.quantity++
            await pool.query(`UPDATE cart SET quantity = $1 WHERE shoes_id = $2`, []);
        //only if the quantity is less than that of the same entry in the shoes table
            if (cartUpdate.quantity < cartedShoe.quantity) {
            
                cartUpdate.quantity++
        //if they are the same prevent carting
            } else if (cartUpdate.quantity == cartedShoe.quantity) {
                return false
            }

        }
        let cartExtraction = await pool.query(`SELECT brand, color, size, price, quantity FROM cart WHERE shoes_id = $1`, [cartedShoe.id])
        // cartedShoe = cartedShoeExtraction.rows[0];
        // cartedShoe.quantity = 1;
        return cartExtraction.rows[0]
    }

    return {
        add,
        all,
        showCart,
        filter,
        cart
    }
}