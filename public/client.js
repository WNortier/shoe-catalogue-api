document.addEventListener('DOMContentLoaded', function () {

    let shoesListTemplate = document.querySelector('.shoesListTemplate')
    let getShoesTemplateInsertPoint = document.querySelector('.getShoesTemplateInsertPoint');
    let shoesListTemplateInstance = Handlebars.compile(shoesListTemplate.innerHTML);

    //ADD DROPDOWN MENU 
    var selectAddBrand = document.querySelector(".selectAddBrand");
    var selectAddStyle = document.querySelector(".selectAddStyle");
    var selectAddColor = document.querySelector(".selectAddColor");
    //ADD INPUT FIELDS 
    var addPrice = document.querySelector(".addPrice");
    var addQuantity = document.querySelector(".addQuantity");
    //ADD BUTTON 
    var addBtn = document.querySelector(".addBtn");


    function ShoesService() {
        function postShoes(data) {
            return axios.post('/api/shoes', data)
        }

        function getShoes() {
            return axios.get('/api/shoes')
        }

        return {
            postShoes,
            getShoes
        }
    }

    let shoesService = ShoesService();



    function showShoes() {
        shoesService
            .getShoes()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                console.log(data)
                let html = shoesListTemplateInstance({
                    shoesEntry: data
                });
                let shoesTableHTML = html;
                getShoesTemplateInsertPoint.innerHTML = shoesTableHTML;
            });

    }

    addBtn.addEventListener('click', function() {

        let description = productNameElem.value;
        let category_id = categoryIdElem.value;
        let price = priceElem.value;

        let brand = selectAddBrand.value
        let style =  selectAddStyle.value
        let color =  selectAddColor.value
        let price = addPrice.value
        let quantity = addQuantity.value

        let errors = [];
        if (!brand) {
            errors.push('Select a brand!');
        }
        if (!style) {
            errors.push('Select a style!');
        }
        if (!color) {
            errors.push('Select a color!');
        }
        if (!price){
            errors.push('Enter a price!')
        }
        if (!quantity){
            errors.push('Enter a quantity!')
        }

        if (errors.length === 0) {
            errorsElem.innerHTML = '';
            productService.addProduct({
                category_id,
                description,
                price
            })
            .then(function() {
                showProducts();
                clearFields();
            })
            .catch(function(err){
                alert(err);
            });
        }
        else {
            errorsElem.innerHTML = errorsTemplateInstance({errors});
        }
        
    });

    showShoes();

});