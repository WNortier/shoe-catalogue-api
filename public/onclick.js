// var results = []

// var shoesService = ShoesService();

// function compileTemplate(selector) {
//     let template = document.querySelector(selector);
//     let templateInstance = Handlebars.compile(template.innerHTML);
//     return templateInstance;


// }

// let cartedStockTemplateInsertPoint = document.querySelector(".cartedStockTemplateInsertPoint")
// let cartedStockTemplateInstance = compileTemplate('.cartedStockTemplate')



//     function find(element) {
//         let brand = element.parentNode.parentNode.cells[0].innerHTML
//         let color = element.parentNode.parentNode.cells[1].innerHTML
//         let size = Number(element.parentNode.parentNode.cells[2].innerHTML)

//         console.log(brand)
//         console.log(color)
//         console.log(size)




//         if (brand && color && size) {
//             shoesService.getCart(brand, color, size)
//                 .then(function (results) {
//                     let response = results.data;
//                     let data = response.data;
//                     console.log(data)

//                     let html = cartedStockTemplateInstance({
//                         cartedShoes: data
//                     });
//                     let cartedTableHtml = html;
//                     cartedStockTemplateInsertPoint.innerHTML = cartedTableHtml;
//                     //clearFields();
//                 }).catch(function (err) {
//                     alert(err);
//                 })
//         } 
//         else {
//             filterErrorElem.innerHTML = errorsTemplateInstance({
//                 error
//             });
//         }
//     }




