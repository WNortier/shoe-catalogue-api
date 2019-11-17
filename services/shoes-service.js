module.exports = function ShoeService(pool) {

    async function add(shoe) {

        // const duplicateShoesCheck = await pool.query(`select stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity 
        // from stock 
        // inner join brands on stock.brand_id = brands.id 
        // inner join colors on stock.color_id = colors.id 
        // inner join sizes on stock.size_id = sizes.id;`)
        //console.log(typeof shoe.brand)

        const duplicateShoesCheck = await pool.query(`SELECT * FROM stock 
        WHERE brand_id = $1 AND color_id = $2 AND size_id = $3`, [shoe.brand, shoe.color, shoe.size]);
        const result = duplicateShoesCheck.rowCount;
        if (result > 0) {
            const shoeToAddQuantityAndPrice = await pool.query(`SELECT quantity, price 
            FROM stock 
            WHERE brand_id = $1 AND color_id = $2 AND size_id = $3`, [shoe.brand, shoe.color, shoe.size]);
            let newShoesQuantity = shoeToAddQuantityAndPrice.rows[0].quantity + shoe.quantity;
            let shoesPrice = shoeToAddQuantityAndPrice.rows[0].price = shoe.price;
            await pool.query('UPDATE stock SET quantity = $1, price = $2 WHERE brand_id = $3 AND color_id = $4 AND size_id = $5', [newShoesQuantity, shoesPrice, shoe.brand, shoe.color, shoe.size]);
        } else {
            await pool.query(`INSERT INTO stock (brand_id, color_id, size_id, price, quantity) 
            VALUES ($1, $2, $3, $4, $5)`, [shoe.brand, shoe.color, shoe.size, shoe.price, shoe.quantity]);
        }
    }

    async function all() {
        const allShoes = await pool.query(`SELECT * FROM stock`);
        return allShoes.rows;
    }

    async function filterBrand(brand) {
        const brandFilterExtraction = await pool.query(`select brands.brand, colors.color, sizes.size, stock.price, stock.quantity 
        from stock 
        inner join brands on stock.brand_id = brands.id 
        inner join colors on stock.color_id = colors.id 
        inner join sizes on stock.size_id = sizes.id
        WHERE stock.brand_id = $1`, [brand]);
        let brandFilter = brandFilterExtraction.rows
        return brandFilter
    }

    async function filterColor(color) {
        const colorFilterExtraction = await pool.query(`select brands.brand, colors.color, sizes.size, stock.price, stock.quantity 
        from stock 
        inner join brands on stock.brand_id = brands.id 
        inner join colors on stock.color_id = colors.id 
        inner join sizes on stock.size_id = sizes.id
        WHERE stock.color_id = $1`, [color]);
        let colorFilter = colorFilterExtraction.rows
        return colorFilter
    }

    async function filterSize(size) {
        const sizeFilterExtraction = await pool.query(`select brands.brand, colors.color, sizes.size, stock.price, stock.quantity 
        from stock 
        inner join brands on stock.brand_id = brands.id 
        inner join colors on stock.color_id = colors.id 
        inner join sizes on stock.size_id = sizes.id
        WHERE stock.size_id = $1`, [size]);
        let sizeFilter = sizeFilterExtraction.rows
        return sizeFilter
    }

    async function filterBrandColorSize(brand, color, size) {
        const brandColorSizeFilterExtraction = await pool.query(`select brands.brand, colors.color, sizes.size, stock.price, stock.quantity 
        from stock 
        inner join brands on stock.brand_id = brands.id 
        inner join colors on stock.color_id = colors.id 
        inner join sizes on stock.size_id = sizes.id
        WHERE stock.brand_id = $1 AND stock.color_id = $2 AND stock.size_id = $3`, [brand, color, size]);
        let brandColorSizeFilter = brandColorSizeFilterExtraction.rows
        return brandColorSizeFilter
    }

    // async function filterColor(color) {
    //     const allShoesExtraction = await pool.query(`SELECT * FROM shoes`);
    //     let allShoes = allShoesExtraction.rows
    //     const colorFilter = allShoes.filter((rows) => {
    //         return rows.color == color
    //     })
    //     return colorFilter
    // }
    // async function filterSize(size) {
    //     const allShoesExtraction = await pool.query(`SELECT * FROM shoes`);
    //     let allShoes = allShoesExtraction.rows
    //     const sizeFilter = allShoes.filter((rows) => {
    //         return rows.size == size
    //     })
    //     return sizeFilter
    // }
    // async function filterBrandColorSize(brand, color, size) {
    //     const allShoesExtraction = await pool.query(`SELECT * FROM shoes`);
    //     let allShoes = allShoesExtraction.rows
    //     const brandColorSizeFilter = allShoes.filter((rows) => {
    //         return rows.brand == brand && rows.color == color && rows.size == size
    //     })
    //     return brandColorSizeFilter
    // }

    async function showCart() {
        const allCart = await pool.query('SELECT * FROM cart')
        return allCart.rows
    }






    async function cart(brand, color, size) {

        //Obtaining the data of the shoe I want to cart from the shoes table
        const cartedShoeExtraction = await pool.query(`SELECT * FROM stock WHERE brand_id = $1 AND color_id = $2 AND size_id = $3`, [brand, color, size]);
        let cartedShoe = cartedShoeExtraction.rows[0];
        //console.log(cartedShoe)

        //Checking if the shoe has been carted before
        let alreadyCartedCheck = await pool.query(`SELECT * FROM cart where brand = $1 AND color = $2 AND size = $3`, [cartedShoe.brand, cartedShoe.color, cartedShoe.size])
        //console.log(alreadyCartedCheck.rowCount)

//console.log(alreadyCartedCheck.rowCount)
        //If the rowCount is 0, add it to the cart
        if (alreadyCartedCheck.rowCount == 0) {
            cartedShoe.quantity = 1

//console.log(cartedShoe)

            console.log(cartedShoe.id)
            console.log(cartedShoe.brand_id)
            console.log(cartedShoe.color_id)
            console.log(cartedShoe.size_id)
            console.log(cartedShoe.price)
            console.log(cartedShoe.quantity)



            await pool.query(`INSERT INTO cart (brand, color, size, price, quantity, shoes_id) VALUES ($1, $2, $3, $4, $5, $6)`, [cartedShoe.brand_id, cartedShoe.color_id, cartedShoe.size_id, cartedShoe.price, cartedShoe.quantity, cartedShoe.id]);
        }
        // //Else if the rowCount is > 0 update the quantity of the shoe already carted...
        // else if (alreadyCartedCheck.rowCount > 0) {
        //     let cartUpdateExtraction = await pool.query(`SELECT brand, color, size, price, quantity FROM cart WHERE shoes_id = $1`, [cartedShoe.id])
        //     let cartUpdate = cartUpdateExtraction.rows[0]
        //     //only if the quantity is less than that of the same entry in the shoes table it should be updated
        //     if (cartUpdate.quantity < cartedShoe.quantity) {
        //         cartUpdate.quantity++
        //         await pool.query(`UPDATE cart SET quantity = $1 WHERE shoes_id = $2`, [cartUpdate.quantity, cartedShoe.id]);
        //         //if they are the same prevent carting
        //     } else if (cartUpdate.quantity == cartedShoe.quantity) {
        //         return false
        //     }
        // }



        // // let cartItemsExtraction = await pool.query(`SELECT brand, color, size, price, quantity FROM cart`)
        // // let cartItems = cartItemsExtraction.rows

        // // select stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity 
        // // from stock 
        // // inner join brands on stock.brand_id = brands.id 
        // // inner join colors on stock.color_id = colors.id 
        // // inner join sizes on stock.size_id = sizes.id
        // // where stock.brand_id = brands.id;


        // let cartItemsExtraction = await pool.query(`select brands.brand, colors.color, sizes.size, cart.price, cart.quantity 
        // from cart 
        // inner join brands on cart.brand = brands.id 
        // inner join colors on cart.color = colors.id 
        // inner join sizes on cart.size = sizes.id`);
        // let cartItems = cartItemsExtraction.rows
        // //console.log(cartItems)





        // let cartTotalExtraction = await pool.query(`SELECT SUM(price * quantity) AS result FROM cart`)
        // //console.log(cartTotalExtraction)
        // let cartTotal = cartTotalExtraction.rows[0]
        // cartItems.push(cartTotal)
        // return cartItems
        return true
    }











    async function cancel() {
        await pool.query(`DELETE from cart`)
        let cartItemsExtraction = await pool.query(`SELECT quantity, shoes_id FROM cart`)
        let cartItems = cartItemsExtraction.rows
        //cartItems will always be an empty array
        return cartItems
    }

    async function checkout() {
        //Extracting the items which are in my cart
        let cartItemsExtraction = await pool.query(`SELECT quantity, shoes_id FROM cart`)
        let cartItems = cartItemsExtraction.rows
        //Using map to obtain quantities and id's, returns something like this [ [ '2', '3590' ], [ '5', '3589' ] ]
        const cartQuantitiesAndIds = cartItems.map((row) => {
            return `${row.quantity} ${row.shoes_id}`
        }).join(',').split(",")
        //Using map again to return something like this [ [ '2', '3590' ], [ '5', '3589' ] ]
        const splittedData = cartQuantitiesAndIds.map((entry) => {
            return entry.split(" ")
        })
        //Looping over my shoes table and subtracting the quantities from the correct Id's
        for (let i = 0; i < splittedData.length; i++) {
            await pool.query(`UPDATE shoes SET quantity = quantity - $1 WHERE id = $2`, splittedData[i])
        }
        //Clearing the cart table
        await pool.query(`DELETE from cart`)
        //Deleting any zero entries from shoes
        await pool.query(`DELETE from shoes where quantity = 0`)
    }

    return {
        add,
        all,
        filterBrand,
        filterColor,
        filterSize,
        filterBrandColorSize,
        cart
        // filterBrand,
        // filterColor,
        // filterSize,
        // filterBrandColorSize,
        // cart,
        // cancel,
        // checkout
    }
}