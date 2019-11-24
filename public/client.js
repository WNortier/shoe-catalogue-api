document.addEventListener('DOMContentLoaded', function () {
    
    function compileTemplate(selector) {
        let template = document.querySelector(selector);
        let templateInstance = Handlebars.compile(template.innerHTML);
        return templateInstance;
    }

    //QUERYSELECTORS
    let stockTemplateInsertPoint = document.querySelector('.stockTemplateInsertPoint');
    let stockTemplateInstance = compileTemplate('.stockTemplate')
    // let stockTemplate = document.querySelector('.stockTemplate')
    // let stockTemplateInstance = Handlebars.compile(stockTemplate.innerHTML);

    let filteredStockTemplateInsertPoint = document.querySelector('.filteredStockTemplateInsertPoint');
    let filteredStockTemplateInstance = compileTemplate('.filteredStockTemplate')
    // let filteredStockTemplate = document.querySelector('.filteredStockTemplate');
    // let filteredStockTemplateInstance = Handlebars.compile(filteredStockTemplate.innerHTML);
    
    let cartedStockTemplateInsertPoint = document.querySelector(".cartedStockTemplateInsertPoint")
    let cartedStockTemplateInstance = compileTemplate('.cartedStockTemplate')
    // let cartedStockTemplate = document.querySelector('.cartedStockTemplate');
    // let cartedStockTemplateInstance = Handlebars.compile(cartedStockTemplate.innerHTML)
    let errorsElem = document.querySelector('.errors')
    let errorsTemplateInstance = compileTemplate('.errorsTemplate');

    //BUTTONS
    var updateBtn = document.querySelector(".updateBtn");
    var filterBtn = document.querySelector(".filterBtn");
    var cartBtn = document.querySelector(".cartBtn");
    var checkoutBtn = document.querySelector(".checkoutBtn")
    var cancelBtn = document.querySelector(".cancelBtn")
    //FILTER DROPDOWN MENU 
    var selectFilterBrand = document.querySelector(".selectFilterBrand");
    var selectFilterColor = document.querySelector(".selectFilterColor");
    var selectFilterSize = document.querySelector(".selectFilterSize");
    //ADD DROPDOWN MENU 
    var selectAddBrand = document.querySelector(".selectAddBrand");
    var selectAddColor = document.querySelector(".selectAddColor");
    var selectAddSize = document.querySelector(".selectAddSize");
    //ADD INPUT FIELDS 
    var addPrice = document.querySelector(".addPrice");
    var addQuantity = document.querySelector(".addQuantity"); 

    const shoesService = ShoesService();

    //This code keeps table headers in place if there are no row entries
    function tableHeadersPlaceholder() {
        console.log(document.querySelector(".filteredStockTemplateInsertPoint").innerHTML.length)
        if (document.querySelector(".filteredStockTemplateInsertPoint").innerHTML.length < 50) {
            let table = document.createElement("table");
            table.setAttribute("class", "table-fixed px-4 py-2 headerPlaceHolder")
            let head = document.createElement("thead")
            table.appendChild(head)
            let row = document.createElement("tr")
            row.setAttribute("class", "bg-gray-100")
            head.appendChild(row)

            let headerOne = document.createElement("th")
            headerOne.setAttribute("class", "w-1/2 px-4 py-2")
            let headerOneText = document.createTextNode("Brand");
            headerOne.appendChild(headerOneText)
            row.appendChild(headerOne)

            let headerTwo = document.createElement("th")
            headerTwo.setAttribute("class", "w-1/2 px-4 py-2")
            let headerTwoText = document.createTextNode("Color");
            headerTwo.appendChild(headerTwoText)
            row.appendChild(headerTwo)

            let headerThree = document.createElement("th")
            headerThree.setAttribute("class", "w-1/2 px-4 py-2")
            let headerThreeText = document.createTextNode("Size");
            headerThree.appendChild(headerThreeText)
            row.appendChild(headerThree)

            let headerFour = document.createElement("th")
            headerFour.setAttribute("class", "w-1/2 px-4 py-2")
            let headerFourText = document.createTextNode("Price");
            headerFour.appendChild(headerFourText)
            row.appendChild(headerFour)

            let headerFive = document.createElement("th")
            headerFive.setAttribute("class", "w-1/2 px-4 py-2")
            let headerFiveText = document.createTextNode("Quantity");
            headerFive.appendChild(headerFiveText)
            row.appendChild(headerFive)
            document.querySelector(".filteredStockTemplateInsertPoint").appendChild(table)
            var headerPlaceHolder = document.querySelector(".headerPlaceHolder")
        } else(headerPlaceHolder.parentNode.removeChild(headerPlaceHolder))
    }

    tableHeadersPlaceholder()

    function showShoes() {
        shoesService
            .getShoes()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                //console.log(data)
                let html = stockTemplateInstance({
                    shoesEntry: data
                });
                let stockTableHTML = html;
                stockTemplateInsertPoint.innerHTML = stockTableHTML;
            });
    }

    filterBtn.addEventListener('click', function () {

        let brand = selectFilterBrand.value
        let color = selectFilterColor.value
        let size = selectFilterSize.value

        if (brand && !color && !size) {
            shoesService
                .getFilterBrand(brand)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = filteredStockTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredShoesTableHTML = html;
                    filteredStockTemplateInsertPoint.innerHTML = filteredShoesTableHTML;
                }).catch(function (err) {
                    alert(err);
                });
        } else if (color && !brand && !size) {
            shoesService
                .getFilterColor(color)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = filteredStockTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredStockTableHTML = html;
                    filteredStockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                }).catch(function (err) {
                    alert(err);
                });
        } else if (size && !color && !brand) {
            shoesService
                .getFilterSize(size)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = filteredStockTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredStockTableHTML = html;
                    filteredStockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                }).catch(function (err) {
                    alert(err);
                });
        } else if (brand && color && size) {
            shoesService
                .getFilterBrandColorSize(brand, color, size)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = filteredStockTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredStockTableHTML = html;
                    filteredStockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                }).catch(function (err) {
                    alert(err);
                });
        }
    })

    cartBtn.addEventListener('click', function () {
        let brand = Number(selectFilterBrand.value)
        let color = Number(selectFilterColor.value)
        let size = Number(selectFilterSize.value)

        shoesService.getCart(brand, color, size)
            .then(function (results) {
                let response = results.data;
                let data = response.data;

                let html = cartedStockTemplateInstance({
                    cartedShoes: data
                });
                let cartedTableHtml = html;
                cartedStockTemplateInsertPoint.innerHTML = cartedTableHtml;
            }).catch(function (err) {
                alert(err);
            });
    });

    checkoutBtn.addEventListener('click', function () {

        shoesService.postCheckout()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                let html = cartedStockTemplateInstance({
                    cartedShoes: data
                });
                let cartedTableHtml = html;
                cartedStockTemplateInsertPoint.innerHTML = cartedTableHtml;
            }).then(function () {
                showShoes();
                cartedStockTemplateInsertPoint.innerHTML = "";
                //clearFields();
            }).catch(function (err) {
                alert(err);
            });
    });

    cancelBtn.addEventListener('click', function () {
        shoesService.postCancel()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                let html = cartedStockTemplateInstance({
                    cartedShoes: data
                });
                let cartedTableHtml = html;
                cartedStockTemplateInsertPoint.innerHTML = cartedTableHtml;
            }).then(function () {
                showShoes();
                cartedStockTemplateInsertPoint.innerHTML = "";
                //clearFields();
            }).catch(function (err) {
                alert(err);
            });

    });

    updateBtn.addEventListener('click', function () {

        let brand = selectAddBrand.value
        let color = selectAddColor.value
        let size = Number(selectAddSize.value)
        let price = Number(addPrice.value)
        let quantity = Number(addQuantity.value)
        let error = [];
        if (!brand || !color || !size || !price || !quantity){
        error.push('Please complete all inputs!')
        }
        if (brand && color && size && price && quantity) {
            shoesService.postShoes({
                    brand,
                    color,
                    size,
                    price,
                    quantity
                })

                .then(function () {
                    showShoes();
                    //clearFields();
                })
                .catch(function (err) {
                    alert(err);
                });
        }
        else {
            errorsElem.innerHTML = errorsTemplateInstance({error});
        }

    });
    showShoes();
});