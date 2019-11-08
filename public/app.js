// document.addEventListener('DOMContentLoaded', async function (pool) {
//     let messageElem = document.querySelector('.message');
//     if (messageElem.innerHTML !== ''){
//         setTimeout(function(){
//             messageElem.innerHTML = '';
//         }, 3000);
//     }
//     let shoesRowCountExtraction = pool.query(`select * from shoes`)
//     let shoesRowCount = shoesRowCountExtraction.rowCount
//     if (shoesRowCount == 0) {
//         await pool.query(`INSERT INTO shoes (brand, color, size, price, quantity) VALUES ($1, $2, $3)`, ["Yuma", "Black", 9, 900, 5]);
//     }
// });