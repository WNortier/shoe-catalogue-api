module.exports = function ShoeService(pool) {

    async function addShoe(brand, color, style, size, price, quantity) {
        const duplicateShoesCheck = await pool.query(`SELECT * FROM shoes WHERE brand = $1 AND color = $2 AND style = $3`, [brand, color, style]);
        const result = duplicateShoesCheck.rowCount;
        if (result > 0) {
            const currentShoesQuantityExtraction = await pool.query(`SELECT quantity FROM shoes WHERE brand = $1 AND color = $2 AND style = $3`, [brand, color, style]);
            let newShoesQuantity = currentShoesQuantityExtraction.rows[0].quantity + quantity;
            await pool.query('UPDATE shoes SET quantity = $1 WHERE brand = $2 AND color = $3 AND style = $4', [newShoesQuantity, brand, color, style]);
        } else {
            await pool.query(`INSERT INTO shoes (brand, color, style, size, price, quantity) VALUES ($1, $2, $3, $4, $5, $6)`, [brand, color, style, size, price, quantity]);
        }
    }

    async function shoesTestAssistant() {
        const shoesTest = await pool.query(`SELECT * FROM shoes`);
        return shoesTest.rows;
    }

    return {
        addShoe,
        shoesTestAssistant
    }
}