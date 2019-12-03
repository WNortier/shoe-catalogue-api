module.exports = function ShoeService(pool) {

    async function add(shoe) {
        const duplicateShoesCheck = await pool.query(`SELECT * FROM stock 
        WHERE brand_id = $1 AND color_id = $2 AND size_id = $3`, [shoe.brand, shoe.color, shoe.size]);
        const result = duplicateShoesCheck.rowCount;
        if (result > 0) {
            const shoeToAddQuantityAndPrice = await pool.query(`SELECT quantity, price 
            FROM stock 
            WHERE brand_id = $1 AND color_id = $2 AND size_id = $3`, [shoe.brand, shoe.color, shoe.size]);
            let newShoesQuantity = shoeToAddQuantityAndPrice.rows[0].quantity + Number(shoe.quantity);
            let shoesPrice = shoeToAddQuantityAndPrice.rows[0].price = shoe.price;
            await pool.query('UPDATE stock SET quantity = $1, price = $2 WHERE brand_id = $3 AND color_id = $4 AND size_id = $5', [newShoesQuantity, shoesPrice, shoe.brand, shoe.color, shoe.size]);
        } else {
            //Inserting new stock, but first determining image to add based on color and brand selected
            //Zonverse images
            if (shoe.brand == 1 && shoe.color == 1) {
                var imageId = 1
            } else if (shoe.brand == 1 && shoe.color == 2) {
                var imageId = 2;
            } else if (shoe.brand == 1 && shoe.color == 3) {
                var imageId = 3;
            } else if (shoe.brand == 1 && shoe.color == 4) {
                var imageId = 4;
            }
            //Yuma images
            else if (shoe.brand == 2 && shoe.color == 1) {
                var imageId = 5
            } else if (shoe.brand == 2 && shoe.color == 2) {
                var imageId = 6
            } else if (shoe.brand == 2 && shoe.color == 3) {
                var imageId = 7
            } else if (shoe.brand == 2 && shoe.color == 4) {
                var imageId = 8
            }
            //Kucci images
            else if (shoe.brand == 3 && shoe.color == 1) {
                var imageId = 9
            } else if (shoe.brand == 3 && shoe.color == 2) {
                var imageId = 10
            } else if (shoe.brand == 3 && shoe.color == 3) {
                var imageId = 11
            } else if (shoe.brand == 3 && shoe.color == 4) {
                var imageId = 12
            }
            //Jimmy-woo images
            else if (shoe.brand == 4 && shoe.color == 1) {
                var imageId = 13
            } else if (shoe.brand == 4 && shoe.color == 2) {
                var imageId = 14
            } else if (shoe.brand == 4 && shoe.color == 3) {
                var imageId = 15
            } else if (shoe.brand == 4 && shoe.color == 4) {
                var imageId = 16
            }
            await pool.query(`INSERT INTO stock (brand_id, color_id, size_id, price, quantity, image_id) 
            VALUES ($1, $2, $3, $4, $5, $6)`, [shoe.brand, shoe.color, shoe.size, shoe.price, shoe.quantity, imageId]);
        }
    }


    async function all() {
        const allShoes = await pool.query(`SELECT * FROM stock`);
        return allShoes.rows;
    }

    async function allStock() {
        const allStock = await pool.query(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
        FROM stock 
        INNER JOIN brands ON stock.brand_id = brands.id 
        INNER JOIN colors ON stock.color_id = colors.id 
        INNER JOIN sizes ON stock.size_id = sizes.id
        INNER JOIN stockImages on stock.image_id = stockImages.id        
        `)
        return allStock.rows
    }

    async function filterBrand(brand) {
        const brandFilterExtraction = await pool.query(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
        FROM stock 
        INNER JOIN brands ON stock.brand_id = brands.id 
        INNER JOIN colors ON stock.color_id = colors.id 
        INNER JOIN sizes ON stock.size_id = sizes.id
        INNER JOIN stockImages on stock.image_id = stockImages.id
        WHERE stock.brand_id = $1`, [brand]);
        let brandFilter = brandFilterExtraction.rows
        console.log(brandFilter)
        return brandFilter
    }

    async function filterColor(color) {
        const colorFilterExtraction = await pool.query(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
        FROM stock 
        INNER JOIN brands ON stock.brand_id = brands.id 
        INNER JOIN colors ON stock.color_id = colors.id 
        INNER JOIN sizes ON stock.size_id = sizes.id
        INNER JOIN stockImages on stock.image_id = stockImages.id
        WHERE stock.color_id = $1`, [color]);
        let colorFilter = colorFilterExtraction.rows
        console.log(colorFilter)
        return colorFilter
    }

    async function filterSize(size) {
        const sizeFilterExtraction = await pool.query(`select stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
        from stock 
        INNER JOIN brands ON stock.brand_id = brands.id 
        INNER JOIN colors ON stock.color_id = colors.id 
        INNER JOIN sizes ON stock.size_id = sizes.id
        INNER JOIN stockImages on stock.image_id = stockImages.id
        WHERE stock.size_id = $1`, [size]);
        let sizeFilter = sizeFilterExtraction.rows
        console.log(sizeFilter)
        return sizeFilter
    }

    async function filterBrandSize(brand, size) {
        const brandSizeFilterExtraction = await pool.query(`select stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
        FROM stock 
        INNER JOIN brands ON stock.brand_id = brands.id 
        INNER JOIN colors ON stock.color_id = colors.id 
        INNER JOIN sizes ON stock.size_id = sizes.id
        INNER JOIN stockImages on stock.image_id = stockImages.id
        WHERE stock.brand_id = $1 AND stock.size_id = $2`, [brand, size]);
        let brandSizeFilter = brandSizeFilterExtraction.rows
        console.log(brandSizeFilter)
        return brandSizeFilter
    }

    async function filterBrandColorSize(brand, color, size) {
        const brandColorSizeFilterExtraction = await pool.query(`select stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
        FROM stock 
        INNER JOIN brands ON stock.brand_id = brands.id 
        INNER JOIN colors ON stock.color_id = colors.id 
        INNER JOIN sizes ON stock.size_id = sizes.id
        INNER JOIN stockImages ON stock.image_id = stockImages.id
        WHERE stock.brand_id = $1 AND stock.color_id = $2 AND stock.size_id = $3`, [brand, color, size]);
        let brandColorSizeFilter = brandColorSizeFilterExtraction.rows
        console.log(brandColorSizeFilter)
        return brandColorSizeFilter
    }

    async function showCart() {
        const allCart = await pool.query(`SELECT brands.brand, colors.color, sizes.size, cart.price, cart.quantity, stockImages.image
        FROM cart 
        INNER JOIN brands ON cart.brand = brands.id 
        INNER JOIN colors ON cart.color = colors.id 
        INNER JOIN sizes ON cart.size = sizes.id
        INNER JOIN stockImages on cart.cart_image = stockImages.id`)
        if (allCart.rowCount > 0) {
            let cartItems = allCart.rows
            let cartTotalExtraction = await pool.query(`SELECT SUM(price * quantity) AS totalprice FROM cart`)
            let cartTotal = cartTotalExtraction.rows[0].totalprice
            cartItems[0].total = cartTotal || 0
            return cartItems
        } else return allCart.rows
    }

    //CART PARAMETERS ARE NOT COMING IN AS AN OBJECT 
    async function cart(id) {
        if (id) {
            //Obtaining the data of the shoe I want to cart from the shoes table
            const cartedShoeExtraction = await pool.query(`SELECT * FROM stock where id = $1`, [id])
            let cartedShoe = cartedShoeExtraction.rows[0];
            //Checking if the shoe has been carted before
            let alreadyCartedCheck = await pool.query(`SELECT * FROM cart where brand = $1 AND color = $2 AND size = $3`, [cartedShoe.brand_id, cartedShoe.color_id, cartedShoe.size_id])
            //If the rowCount is 0, add it to the cart
            if (alreadyCartedCheck.rowCount == 0) {
                cartedShoe.quantity = 1
                await pool.query(`INSERT INTO cart (brand, color, size, price, quantity, stock_id, cart_image) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [cartedShoe.brand_id, cartedShoe.color_id, cartedShoe.size_id, cartedShoe.price, cartedShoe.quantity, cartedShoe.id, cartedShoe.image_id]);
            }
            //Else if the rowCount is > 0 update the quantity of the shoe already carted...
            else if (alreadyCartedCheck.rowCount > 0) {
                let cartUpdateExtraction = await pool.query(`SELECT brand, color, size, price, quantity FROM cart WHERE stock_id = $1`, [cartedShoe.id])
                let cartUpdate = cartUpdateExtraction.rows[0]
                //only if the quantity is less than that of the same entry in the shoes table it should be updated
                if (cartUpdate.quantity < cartedShoe.quantity) {
                    cartUpdate.quantity++
                    await pool.query(`UPDATE cart SET quantity = $1 WHERE stock_id = $2`, [cartUpdate.quantity, cartedShoe.id]);
                    //if they are the same simply return what is currently in the cart
                } else if (cartUpdate.quantity == cartedShoe.quantity) {
                    let cartItemsExtraction = await pool.query(`SELECT brands.brand, colors.color, sizes.size, cart.price, cart.quantity, stockImages.image
                FROM cart 
                INNER JOIN brands ON cart.brand = brands.id 
                INNER JOIN colors ON cart.color = colors.id 
                INNER JOIN sizes ON cart.size = sizes.id
                INNER JOIN stockImages on cart.cart_image = stockImages.id`);
                    let cartItems = cartItemsExtraction.rows
                    let cartTotalExtraction = await pool.query(`SELECT SUM(price * quantity) AS totalprice FROM cart`)
                    let cartTotal = cartTotalExtraction.rows[0].totalprice
                    cartItems[0].total = cartTotal
                }
            }
            let cartItemsExtraction = await pool.query(`SELECT brands.brand, colors.color, sizes.size, cart.price, cart.quantity, stockImages.image
            FROM cart 
            INNER JOIN brands ON cart.brand = brands.id 
            INNER JOIN colors ON cart.color = colors.id 
            INNER JOIN sizes ON cart.size = sizes.id
            INNER JOIN stockImages on cart.cart_image = stockImages.id`);
            let cartItems = cartItemsExtraction.rows
            let cartTotalExtraction = await pool.query(`SELECT SUM(price * quantity) AS totalprice FROM cart`)
            let cartTotal = cartTotalExtraction.rows[0].totalprice
            cartItems[0].total = cartTotal
            return cartItems
        } else
            return await showCart();
    }

    async function cancel() {
        await pool.query(`DELETE from cart`)
        let cartItemsExtraction = await pool.query(`SELECT quantity, stock_id FROM cart`)
        let cartItems = cartItemsExtraction.rows
        //cartItems will always be an empty array
        return cartItems
    }

    async function checkout() {
        //Extracting the items which are in my cart
        let cartItemsExtraction = await pool.query(`SELECT quantity, stock_id FROM cart`)
        let cartItems = cartItemsExtraction.rows
        //Using map to obtain quantities and id's
        const cartQuantitiesAndIds = cartItems.map((row) => {
            return `${row.quantity} ${row.stock_id}`
        }).join(',').split(",")
        //Using map again to return something like this [ [ '2', '3590' ], [ '5', '3589' ] ]
        const splittedData = cartQuantitiesAndIds.map((entry) => {
            return entry.split(" ")
        })
        //Looping over my shoes table and subtracting the quantities from the correct Id's
        for (let i = 0; i < splittedData.length; i++) {
            await pool.query(`UPDATE stock SET quantity = quantity - $1 WHERE id = $2`, splittedData[i])
        }
        //Clearing the cart table
        await pool.query(`DELETE from cart`)
        //Deleting any zero entries from shoes
        await pool.query(`DELETE from stock where quantity = 0`)

        let cartItemsAfterCheckoutExtraction = await pool.query(`SELECT quantity, stock_id FROM cart`)
        let cartItemsAfterCheckout = cartItemsAfterCheckoutExtraction.rows
        return cartItemsAfterCheckout
    }

    return {
        add,
        all,
        allStock,
        filterBrand,
        filterColor,
        filterSize,
        filterBrandSize,
        filterBrandColorSize,
        cart,
        showCart,
        checkout,
        cancel
    }
}