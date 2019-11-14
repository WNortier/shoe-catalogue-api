document.addEventListener('DOMContentLoaded', function () {

    let shoesListTemplate = document.querySelector('.shoesListTemplate')
    let getShoesTemplateInsertPoint = document.querySelector('.getShoesTemplateInsertPoint');
    let shoesListTemplateInstance = Handlebars.compile(shoesListTemplate.innerHTML);

    let filteredShoesListTemplate = document.querySelector('.filteredShoesListTemplate')
    let filteredShoesListTemplateInsertPoint = document.querySelector('.getFilteredShoesListTemplateInsertPoint')
    let filteredShoesListTemplateInstance = Handlebars.compile(filteredShoesListTemplate.innerHTML);

    //ADD BUTTON 
    var addBtn = document.querySelector(".addBtn");
    //ADD DROPDOWN MENU 
    var selectAddBrand = document.querySelector(".selectAddBrand");
    var selectAddSize = document.querySelector(".selectAddSize");
    var selectAddColor = document.querySelector(".selectAddColor");
    //ADD INPUT FIELDS 
    var addPrice = document.querySelector(".addPrice");
    var addQuantity = document.querySelector(".addQuantity");
    //FILTER BUTTON
    var infoBtn = document.querySelector(".infoBtn");
    //FILTER DROPDOWN MENU 
    var selectFilterBrand = document.querySelector(".selectFilterBrand");
    var selectFilterColor = document.querySelector(".selectFilterColor");
    var selectFilterSize = document.querySelector(".selectFilterSize");



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
            return axios.get('/api/shoes/brand/' + brand + "/size" + size + "/color" + color)
        }

        return {
            postShoes,
            getShoes,
            getFilterBrand,
            getFilterColor,
            getFilterSize,
            getFilterBrandColorSize
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
                let html = shoesListTemplateInstance({
                    shoesEntry: data
                });
                let shoesTableHTML = html;
                getShoesTemplateInsertPoint.innerHTML = shoesTableHTML;
            });
    }

    infoBtn.addEventListener('click', function () {

        let brand = selectFilterBrand.value
        let color = selectFilterColor.value
        let size = selectFilterSize.value

        if (brand) {
            shoesService
                .getFilterBrand(brand)
                .then(function (results) {
                    let response = results.data;
                    console.log(response)
                    let data = response.data;
                    console.log(data)
                    let html = filteredShoesListTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredShoesTableHTML = html;
                    filteredShoesListTemplateInsertPoint.innerHTML = filteredShoesTableHTML;
                }).catch(function (err) {
                    alert(err);
                });
        } else if (color && !brand && !size) {
            shoesService
                .getFilterColor(color)
                .then(function (results) {
                    let response = results.data;
                    console.log(response)
                    let data = response.data;
                    console.log(data)
                    let html = filteredShoesListTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredShoesTableHTML = html;
                    filteredShoesListTemplateInsertPoint.innerHTML = filteredShoesTableHTML;
                }).catch(function (err) {
                    alert(err);
                });
        } else if (size && !color && !brand) {
            shoesService
                .getFilterSize(size)
                .then(function (results) {
                    let response = results.data;
                    console.log(response)
                    let data = response.data;
                    console.log(data)
                    let html = filteredShoesListTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredShoesTableHTML = html;
                    filteredShoesListTemplateInsertPoint.innerHTML = filteredShoesTableHTML;
                }).catch(function (err) {
                    alert(err);
                });
        } else if (brand && color && size) {
            shoesService
                .getFilterBrandColorSize(brand, color, size)
                .then(function (results) {
                    let response = results.data;
                    console.log(response)
                    let data = response.data;
                    console.log(data)
                    let html = filteredShoesListTemplateInstance({
                        filteredShoes: data
                    });
                    let filteredShoesTableHTML = html;
                    filteredShoesListTemplateInsertPoint.innerHTML = filteredShoesTableHTML;
                }).catch(function (err) {
                    alert(err);
                });
        }
    })

    addBtn.addEventListener('click', function () {


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