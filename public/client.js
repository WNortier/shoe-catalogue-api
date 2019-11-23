document.addEventListener('DOMContentLoaded', function () {

    let stockTemplate = document.querySelector('.stockTemplate')
    let stockTemplateInsertPoint = document.querySelector('.stockTemplateInsertPoint');
    let stockTemplateInstance = Handlebars.compile(stockTemplate.innerHTML);

    let filteredStockTemplate = document.querySelector('.filteredStockTemplate');
    let filteredStockTemplateInsertPoint = document.querySelector('.filteredStockTemplateInsertPoint');
    let filteredStockTemplateInstance = Handlebars.compile(filteredStockTemplate.innerHTML);

    let cartedStockTemplate = document.querySelector('.cartedStockTemplate');
    let cartedStockTemplateInsertPoint = document.querySelector(".cartedStockTemplateInsertPoint")
    let cartedStockTemplateInstance = Handlebars.compile(cartedStockTemplate.innerHTML)

    //ADD BUTTON 
    var updateBtn = document.querySelector(".updateBtn");
    //ADD DROPDOWN MENU 
    var selectAddBrand = document.querySelector(".selectAddBrand");
    var selectAddColor = document.querySelector(".selectAddColor");
    var selectAddSize = document.querySelector(".selectAddSize");
    //ADD INPUT FIELDS 
    var addPrice = document.querySelector(".addPrice");
    var addQuantity = document.querySelector(".addQuantity");
    //FILTER BUTTON
    var filterBtn = document.querySelector(".filterBtn");
    var cartBtn = document.querySelector(".cartBtn");
    //FILTER DROPDOWN MENU 
    var selectFilterBrand = document.querySelector(".selectFilterBrand");
    var selectFilterColor = document.querySelector(".selectFilterColor");
    var selectFilterSize = document.querySelector(".selectFilterSize");
    //CHECKOUT BUTTON & CANCEL BUTTON
    var checkoutBtn = document.querySelector(".checkoutBtn")
    var cancelBtn = document.querySelector(".cancelBtn")

    function ShoesService() {
        function postShoes(data) {
            return axios.post('/api/shoes', data)
        }

        function getShoes() {
            return axios.get('/api/shoes')
        }

        function getFilterBrand(brand) {
            return axios.get('/api/shoes/brand/' + brand)
        }

        function getFilterColor(color) {
            return axios.get('/api/shoes/color/' + color)
        }

        function getFilterSize(size) {
            return axios.get('/api/shoes/size/' + size)
        }

        function getFilterBrandColorSize(brand, color, size) {
            return axios.get('/api/shoes/brand/' + brand + "/size/" + color + "/color/" + size)
        }

        function getCart(brand, color, size) {
            return axios.get('/api/shoes/cart/brand/' + brand + '/size/' + size + '/color/' + color)
        }

        function postCheckout(){
            return axios.post('/api/shoes/checkout')
        }

        function postCancel(){
            return axios.post('/api/shoes/cancel')
        }

        return {
            postShoes,
            getShoes,
            getFilterBrand,
            getFilterColor,
            getFilterSize,
            getFilterBrandColorSize,
            getCart,
            postCheckout,
            postCancel
        }
    }

    let shoesService = ShoesService();

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
        console.log(brand)
        console.log(color)
        console.log(size)
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

    checkoutBtn.addEventListener('click', function() {
        
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

    cancelBtn.addEventListener('click', function(){
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

        // let description = productNameElem.value;
        // let category_id = categoryIdElem.value;
        // let price = priceElem.value;

        // let errors = [];
        // if (!brand) {
        //     errors.push('Select a brand!');
        // }
        // if (!style) {
        //     errors.push('Select a style!');
        // }
        // if (!color) {
        //     errors.push('Select a color!');
        // }
        // if (!price){
        //     errors.push('Enter a price!')
        // }
        // if (!quantity){
        //     errors.push('Enter a quantity!')
        // }

        // if (errors.length === 0) {
        //     errorsElem.innerHTML = '';
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
        // }
        // else {
        //     errorsElem.innerHTML = errorsTemplateInstance({errors});
        // }

    });



    showShoes();

});