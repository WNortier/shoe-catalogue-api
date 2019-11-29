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
    let updateStockContainer = document.querySelector(".updateStockContainer")
    let dynamicCarting = document.querySelector("#dynamicCarting")

    let updateErrorElem = document.querySelector('.updateError')
    let filterErrorElem = document.querySelector('.filterError')
    let errorsTemplateInstance = compileTemplate('.errorsTemplate');

    //BUTTONS
    var updateBtn = document.querySelector(".updateBtn");
    var filterBtn = document.querySelector(".filterBtn");
    var cartBtns = document.querySelector(".cartBtn");

    var checkoutBtn = document.querySelector(".checkoutBtn")
    var cancelBtn = document.querySelector(".cancelBtn")
    var revealBtn = document.querySelector(".revealBtn")

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

    function clearFields() {
        addPrice.value = "";
        addQuantity.value = "";
        updateErrorElem.innerHTML = "";
        filterErrorElem.innerHTML = "";
        let dropdowns = document.querySelectorAll('.dropdowns');
        for (var i = 0, l = dropdowns.length; i < l; i++) {
            dropdowns[i].selected = dropdowns[i].defaultSelected;
        }
    }

    revealBtn.addEventListener('click', function () {
        updateStockContainer.style.display = (updateStockContainer.style.display !== "none") ? "none" : "block";
    })

    function showShoes() {
        shoesService
            .getShoes()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                let html = stockTemplateInstance({
                    shoesEntry: data
                });
                let stockTableHTML = html;
                stockTemplateInsertPoint.innerHTML = stockTableHTML;

            });
    }

    function showCart() {
        shoesService.getCart()
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
            })
    }
    showCart();

    filterBtn.addEventListener('click', function () {

        brand = selectFilterBrand.value
        color = selectFilterColor.value
        size = selectFilterSize.value

        let error = [];
        error.length = 0;
        if (!brand && !color && !size) {
            error.push('Please complete all inputs!')
        } else if (!size || !brand) {
            error.push('Invalid search combination!')
        }

        if (brand && brand !== "all" && !color && !size) {
            shoesService
                .getFilterBrand(brand)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = filteredStockTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredShoesTableHTML = html;
                    stockTemplateInsertPoint.innerHTML = filteredShoesTableHTML;
                    clearFields();
                }).catch(function (err) {
                    alert(err);
                });
        } else if (color && color !== "all" && !brand && !size) {
            shoesService
                .getFilterColor(color)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = filteredStockTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredStockTableHTML = html;
                    stockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                    clearFields();
                }).catch(function (err) {
                    alert(err);
                });
        } else if (size && size !== "all" && !color && !brand) {
            shoesService
                .getFilterSize(size)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = filteredStockTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredStockTableHTML = html;
                    stockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                    clearFields();
                }).catch(function (err) {
                    alert(err);
                });
        } else if (brand && brand !== "all" && size && size !== "all" && !color) {
            shoesService
                .getFilterBrandSize(brand, size)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = filteredStockTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredStockTableHTML = html;
                    stockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                    clearFields();
                }).catch(function (err) {
                    alert(err);
                });
        } else if (brand && brand !== "all" && color && color !== "all" && size && size !== "all") {
            shoesService
                .getFilterBrandColorSize(brand, color, size)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = filteredStockTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredStockTableHTML = html;
                    stockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                    clearFields();
                }).catch(function (err) {
                    alert(err);
                });
        } else if (brand == "all" || color == "all" || size == "all") {
            shoesService
                .getShoes()
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = stockTemplateInstance({
                        shoesEntry: data
                    });
                    let stockTableHTML = html;
                    stockTemplateInsertPoint.innerHTML = stockTableHTML;
                    clearFields();
                }).catch(function (err) {
                    alert(err);
                });
        } else {
            filterErrorElem.innerHTML = errorsTemplateInstance({
                error
            });
        }
    })

    dynamicCarting.addEventListener("click", function (event) {
        if (event.target.id) {
            shoesService.getCart(event.target.id)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = cartedStockTemplateInstance({
                        cartedShoes: data
                    });
                    let cartedTableHtml = html;
                    cartedStockTemplateInsertPoint.innerHTML = cartedTableHtml;
                    clearFields();
                }).catch(function (err) {
                    alert(err);
                })
        }
    })

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
                clearFields();
                cartedStockTemplateInsertPoint.innerHTML = "";
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
        if (!brand || !color || !size || !price || !quantity) {
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
                    clearFields();
                    showShoes();
                })
                .catch(function (err) {
                    alert(err);
                });
        } else {
            updateErrorElem.innerHTML = errorsTemplateInstance({
                error
            });
        }
    });
    showShoes();
});