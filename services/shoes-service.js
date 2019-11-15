module.exports = function ShoeService(pool) {

    async function add(shoe) {
        const duplicateShoesCheck = await pool.query(`SELECT * FROM shoes WHERE brand = $1 AND color = $2 AND size = $3`, [shoe.brand, shoe.color, shoe.size]);
        const result = duplicateShoesCheck.rowCount;
        if (result > 0) {
            const currentShoesQuantityExtraction = await pool.query(`SELECT quantity FROM shoes WHERE brand = $1 AND color = $2 AND size = $3`, [shoe.brand, shoe.color, shoe.size]);
            let newShoesQuantity = currentShoesQuantityExtraction.rows[0].quantity + shoe.quantity;
            await pool.query('UPDATE shoes SET quantity = $1 WHERE brand = $2 AND color = $3 AND size = $4', [newShoesQuantity, shoe.brand, shoe.color, shoe.size]);
        } else {
            await pool.query(`INSERT INTO shoes (brand, color, size, price, quantity) VALUES ($1, $2, $3, $4, $5)`, [shoe.brand, shoe.color, shoe.size, shoe.price, shoe.quantity]);
        }
    }

    async function filterBrand(brand) {
        const allShoesExtraction = await pool.query(`SELECT * FROM shoes`);
        let allShoes = allShoesExtraction.rows
        const brandFilter = allShoes.filter((rows)=>{
            return rows.brand == brand
        })
        return brandFilter
    }
    async function filterColor(color){
        const allShoesExtraction = await pool.query(`SELECT * FROM shoes`);
        let allShoes = allShoesExtraction.rows
        const colorFilter = allShoes.filter((rows)=>{
            return rows.color == color
        })
        return colorFilter
    }
    async function filterSize(size){
        const allShoesExtraction = await pool.query(`SELECT * FROM shoes`);
        let allShoes = allShoesExtraction.rows
        const sizeFilter = allShoes.filter((rows)=>{
            return rows.size == size
        })
        return sizeFilter
    }
    async function filterBrandColorSize(brand, color, size){
        const allShoesExtraction = await pool.query(`SELECT * FROM shoes`);
        let allShoes = allShoesExtraction.rows 
        const brandColorSizeFilter = allShoes.filter((rows)=>{
            return rows.brand == brand && rows.color == color && rows.size == size
        })
        return brandColorSizeFilter
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
        console.log(cartedShoe)
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


            //only if the quantity is less than that of the same entry in the shoes table
            if (cartUpdate.quantity < cartedShoe.quantity) {
                cartUpdate.quantity++
                await pool.query(`UPDATE cart SET quantity = $1 WHERE shoes_id = $2`, [cartUpdate.quantity, cartedShoe.id]);
                //if they are the same prevent carting
            } else if (cartUpdate.quantity == cartedShoe.quantity) {
                return false
            }
        }
        let cartItemsExtraction = await pool.query(`SELECT brand, color, size, price, quantity FROM cart`)
        let cartItems = cartItemsExtraction.rows
        let cartTotalExtraction = await pool.query(`SELECT SUM(price * quantity) AS result FROM cart`)
        let cartTotal = cartTotalExtraction.rows[0]
        cartItems.push(cartTotal)
        console.log(cartItems)
        return cartItems
    }

    async function cancel(){
        await pool.query(`DELETE from cart`)
        let cartItemsExtraction = await pool.query(`SELECT quantity, shoes_id FROM cart`)
        let cartItems = cartItemsExtraction.rows
        return cartItems
    }

    async function checkout() {
        let cartItemsExtraction = await pool.query(`SELECT quantity, shoes_id FROM cart`)
        let cartItems = cartItemsExtraction.rows
        const cartQuantitiesAndIds = cartItems.map((row) => {
            return `${row.quantity} ${row.shoes_id}`
        }).join(',').split(",")

        const splittedData = cartQuantitiesAndIds.map((entry) => {
            return entry.split(" ")
        })
        for (let i = 0; i < splittedData.length; i++) {
            await pool.query(`UPDATE shoes SET quantity = quantity - $1 WHERE id = $2`, splittedData[i])
        }
        await pool.query(`DELETE from cart`)
        await pool.query(`DELETE from shoes where quantity = 0`)
    }

    return {
        add,
        all,
        showCart,
        filterBrand,
        filterColor,
        filterSize,
        filterBrandColorSize,
        cart,
        cancel,
        checkout
    }
}