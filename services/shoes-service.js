module.exports = function ShoeService(pool) {

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

        async function all() {
            const allShoes = await pool.query(`SELECT * FROM shoes`);
            return allShoes.rows;
        }

        async function filter(input, inputTwo, InputThree) {

            // console.log(input);
            // console.log(inputTwo);
            // console.log(InputThree);


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
            return {
                add,
                all,
                filter
            }
        }


        // if (inputTwo == undefined && InputThree == undefined && input == "Yuma" || input == "Zonverse" || input == "Jimmy Woo") {
        //     const filterByBrandExtraction = await pool.query(`SELECT * FROM shoes WHERE brand = $1`, [input]);
        //     return filterByBrandExtraction.rows
        // } else if (inputTwo == undefined && InputThree == undefined && input == "Black" || input == "Red" || input == "Metallic") {
        //     const filterByColorExtraction = await pool.query(`SELECT * FROM shoes WHERE color = $1`, [input]);
        //     return filterByColorExtraction.rows
        // } else if (inputTwo == undefined && InputThree == undefined && input == 9 || input == 8 || input == 7 || input == 6) {
        //     const filterByColorExtraction = await pool.query(`SELECT * FROM shoes WHERE size = $1`, [input]);
        //     return filterByColorExtraction.rows
        // } else 

        // if (input !== undefined && inputTwo !== undefined && InputThree !== undefined) {
        //     const filterByBrandColorSize = await pool.query(`SELECT * FROM shoes WHERE brand = $1 AND color = $2 AND size = $3`, [input, inputTwo, Number(InputThree)])
        //     return filterByBrandColorSize.rows
        // }