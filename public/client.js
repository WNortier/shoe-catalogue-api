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
    // let filterErrorElem = document.querySelector('.filterError')
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
    //const onClickFactory = OnClickFactory(); 


    function clearFields() {
        addPrice.value = "";
        addQuantity.value = "";
        // updateErrorElem.innerHTML = "";
        // filterErrorElem.innerHTML = "";
        let dropdowns = document.querySelectorAll('.dropdowns');
        for (var i = 0, l = dropdowns.length; i < l; i++) {
            dropdowns[i].selected = dropdowns[i].defaultSelected;
        }
    }

    revealBtn.addEventListener('click', function () {
        updateStockContainer.style.display = (updateStockContainer.style.display !== "none") ? "none" : "block";
    })

    //This code keeps the filter stock table header in place if there is currently no table data
    // function tableHeadersPlaceholder() {
    //     //less than 50 to account for whitespaces in the markup
    //     if (document.querySelector(".filteredStockTemplateInsertPoint").innerHTML.length < 50) {
    //         let table = document.createElement("table");
    //         table.setAttribute("class", "table-fixed px-4 py-2 headerPlaceHolder")
    //         let head = document.createElement("thead")
    //         table.appendChild(head)
    //         let row = document.createElement("tr")
    //         row.setAttribute("class", "bg-gray-100")
    //         head.appendChild(row)

    //         let headerOne = document.createElement("th")
    //         headerOne.setAttribute("class", "w-1/2 px-4 py-2")
    //         let headerOneText = document.createTextNode("Brand");
    //         headerOne.appendChild(headerOneText)
    //         row.appendChild(headerOne)

    //         let headerTwo = document.createElement("th")
    //         headerTwo.setAttribute("class", "w-1/2 px-4 py-2")
    //         let headerTwoText = document.createTextNode("Color");
    //         headerTwo.appendChild(headerTwoText)
    //         row.appendChild(headerTwo)

    //         let headerThree = document.createElement("th")
    //         headerThree.setAttribute("class", "w-1/2 px-4 py-2")
    //         let headerThreeText = document.createTextNode("Size");
    //         headerThree.appendChild(headerThreeText)
    //         row.appendChild(headerThree)

    //         let headerFour = document.createElement("th")
    //         headerFour.setAttribute("class", "w-1/2 px-4 py-2")
    //         let headerFourText = document.createTextNode("Price");
    //         headerFour.appendChild(headerFourText)
    //         row.appendChild(headerFour)

    //         let headerFive = document.createElement("th")
    //         headerFive.setAttribute("class", "w-1/2 px-4 py-2")
    //         let headerFiveText = document.createTextNode("Quantity");
    //         headerFive.appendChild(headerFiveText)
    //         row.appendChild(headerFive)
    //         document.querySelector(".filteredStockTemplateInsertPoint").appendChild(table)
    //         var headerPlaceHolder = document.querySelector(".headerPlaceHolder")
    //     } else(headerPlaceHolder.parentNode.removeChild(headerPlaceHolder))
    // }

    // tableHeadersPlaceholder()

    function showShoes() {
        shoesService
            .getShoes()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                let html = stockTemplateInstance({
                    shoesEntry: data
                });
                console.log(localStorage.length)
                let stockTableHTML = html;
                stockTemplateInsertPoint.innerHTML = stockTableHTML;

            });
    }

    function showCart() {
        console.log("hi")
        shoesService.getCart()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                console.log(data)


                let html = cartedStockTemplateInstance({
                    cartedShoes: data
                });
                let cartedTableHtml = html;
                cartedStockTemplateInsertPoint.innerHTML = cartedTableHtml;
                //clearFields();
            }).catch(function (err) {
                alert(err);
            })
    }
    showCart();

    filterBtn.addEventListener('click', function () {
        console.log("works?")
        if (selectFilterBrand.value || selectFilterColor.value || selectFilterSize.value) {
            brand = selectFilterBrand.value
            color = selectFilterColor.value
            size = selectFilterSize.value
            localStorage.clear()
        } else {
            brand = localStorage.getItem("brand")
            color = localStorage.getItem("color")
            size = localStorage.getItem("size")
        }

        console.log(brand)
        console.log(color)
        console.log(size)

        let error = [];
        error.length = 0;
        if (!brand && !color && !size) {
            error.push('Please complete all inputs!')
        } else if (!size || !brand) {
            error.push('Invalid search combination!')
        }

        if (brand && brand !== "all" && !color && !size) {
            console.log("brand")
            localStorage.setItem("brand", brand);
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
            console.log("color")
            localStorage.setItem("color", color)
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
            console.log("size")
            localStorage.setItem("size", size)
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
            console.log("brandsize")
            localStorage.setItem("brand", brand)
            localStorage.setItem("size", size)
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
            console.log("brandcolorsize")
            localStorage.setItem("brand", brand)
            localStorage.setItem("color", color)
            localStorage.setItem("size", size)
            shoesService
                .getFilterBrandColorSize(brand, color, size)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = filteredStockTemplateInstance({
                        filteredShoes: data
                    });
                    //console.log(response.data)
                    let filteredStockTableHTML = html;
                    stockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                    clearFields();
                }).catch(function (err) {
                    alert(err);
                });
        } else if (brand == "all" || color == "all" || size == "all") {
            console.log("all")
            localStorage.setItem("brand", brand)
            localStorage.setItem("color", color)
            localStorage.setItem("size", size)
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
            // localStorage.clear()
            // filterErrorElem.innerHTML = errorsTemplateInstance({
            //     error
            // });
            return false
        }
    })



    dynamicCarting.addEventListener("click", function (event) {

        //console.log(event.target.id)
        // console.log(event.target.dataid)


        // let error = [];
        // error.length = 0;
        // if (!brand || !color || !size) {
        //     error.push('Please complete all inputs!')
        // }

        if (event.target.id) {
            shoesService.getCart(event.target.id)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    //console.log(data)

                    let html = cartedStockTemplateInstance({
                        cartedShoes: data
                    });
                    let cartedTableHtml = html;
                    cartedStockTemplateInsertPoint.innerHTML = cartedTableHtml;
                    clearFields();
                }).catch(function (err) {
                    alert(err);
                })
        } else {
            // filterErrorElem.innerHTML = errorsTemplateInstance({
            //     error
            // });
            alert("nope")
        }
    })



    // cartBtns.addEventListener('click', function () {

    //     let color = selectFilterColor.value
    //     let size = Number(selectFilterSize.value)

    //     let error = [];
    //     error.length = 0;
    //     if (!brand || !color || !size) {
    //         error.push('Please complete all inputs!')
    //     }

    //     if (brand && color && size) {
    //         shoesService.getCart(brand, color, size)
    //             .then(function (results) {
    //                 let response = results.data;
    //                 let data = response.data;

    //                 let html = cartedStockTemplateInstance({
    //                     cartedShoes: data
    //                 });
    //                 let cartedTableHtml = html;
    //                 cartedStockTemplateInsertPoint.innerHTML = cartedTableHtml;
    //                 clearFields();
    //             }).catch(function (err) {
    //                 alert(err);
    //             })
    //     } else {
    //         filterErrorElem.innerHTML = errorsTemplateInstance({
    //             error
    //         });
    //     }
    // })

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
                //showShoes();
                clearFields();
                cartedStockTemplateInsertPoint.innerHTML = "";
                if (localStorage.length > 0) {
                    let event = new Event("click", {
                        bubbles: true
                    });
                    filterBtn.dispatchEvent(event)
                } else {
                    showShoes();
                }
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
                localStorage.clear()
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