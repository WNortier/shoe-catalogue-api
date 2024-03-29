document.addEventListener('DOMContentLoaded', function () {

    function compileTemplate(selector) {
        const template = document.querySelector(selector);
        const templateInstance = Handlebars.compile(template.innerHTML);
        return templateInstance;
    }

    //QUERYSELECTORS
    const stockTemplateInsertPoint = document.querySelector('.stockTemplateInsertPoint');
    const stockTemplateInstance = compileTemplate('.stockTemplate')
    const filteredStockTemplateInstance = compileTemplate('.filteredStockTemplate')
    const cartedStockTemplateInsertPoint = document.querySelector(".cartedStockTemplateInsertPoint")
    const cartedStockTemplateInstance = compileTemplate('.cartedStockTemplate')
    const dynamicCarting = document.querySelector("#dynamicCarting")
    const updateErrorInsertPoint = document.querySelector('.updateErrorInsertPoint')
    const filterErrorInsertPoint = document.querySelector('.filterErrorInsertPoint')
    const errorsTemplateInstance = compileTemplate('.errorsTemplate');
    const checkoutMessageInsertPoint = document.querySelector('.checkoutMessageInsertPoint')
    const checkoutMessageInstance = compileTemplate('.checkoutMessageTemplate')
    const updateStockContainer = document.querySelector(".updateStockContainer")
    const modalTemplateInsertPoint = document.querySelector('.modalTemplateInsertPoint')
    const modalTemplateInstance = compileTemplate('.modalTemplate')
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    const overlay = document.querySelector('.modal-overlay')

    //BUTTONS
    const updateBtn = document.querySelector(".updateBtn");
    const filterBtn = document.querySelector(".filterBtn");
    const checkoutBtn = document.querySelector(".checkoutBtn")
    const cancelBtn = document.querySelector(".cancelBtn")
    const revealBtn = document.querySelector(".revealBtn")

    //FILTER DROPDOWN MENU 
    const selectFilterBrand = document.querySelector(".selectFilterBrand");
    const selectFilterColor = document.querySelector(".selectFilterColor");
    const selectFilterSize = document.querySelector(".selectFilterSize");

    //ADD DROPDOWN MENU 
    const selectAddBrand = document.querySelector(".selectAddBrand");
    const selectAddColor = document.querySelector(".selectAddColor");
    const selectAddSize = document.querySelector(".selectAddSize");

    //ADD INPUT FIELDS 
    const addPrice = document.querySelector(".addPrice");
    const addQuantity = document.querySelector(".addQuantity");

    //FACTORYFUNCTION
    const shoesService = ShoesService();

    //UTILITY FUNCTIONS
    function clearFields() {
        addPrice.value = "";
        addQuantity.value = "";
        // updateErrorInsertPoint.innerHTML = "";
        // filterErrorInsertPoint.innerHTML = "";
        let dropdowns = document.querySelectorAll('.dropdowns');
        for (var i = 0, l = dropdowns.length; i < l; i++) {
            dropdowns[i].selected = dropdowns[i].defaultSelected;
        }
    }

    revealBtn.addEventListener('click', function () {
        updateStockContainer.style.display = (updateStockContainer.style.display !== "none") ? "none" : "block";
    })

    overlay.addEventListener('click', toggleModal)

    var closemodal = document.querySelectorAll('.modal-close')
    for (var i = 0; i < closemodal.length; i++) {
        closemodal[i].addEventListener('click', toggleModal)
    }

    function toggleModal() {
        modal.classList.toggle('opacity-0')
        modal.classList.toggle('pointer-events-none')
        body.classList.toggle('modal-active')
    }

    //API CALLS 
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

    filterBtn.addEventListener('click', function () {

        let brand = selectFilterBrand.value
        let color = selectFilterColor.value
        let size = selectFilterSize.value

        var error = [];
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
                    if (data.length == 0) {
                        error = [];
                        error.push('No entries found!')
                        filterErrorInsertPoint.innerHTML = errorsTemplateInstance({
                            error
                        });
                        clearFields();
                        setTimeout(function () {
                            filterErrorInsertPoint.innerHTML = '';
                        }, 3000)
                    } else {
                        let html = filteredStockTemplateInstance({
                            filteredShoes: data
                        });
                        let filteredShoesTableHTML = html;
                        stockTemplateInsertPoint.innerHTML = filteredShoesTableHTML;
                        clearFields();
                    }
                }).catch(function (err) {
                    alert(err);
                });

        } else if (color && color !== "all" && !brand && !size) {
            shoesService
                .getFilterColor(color)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    if (data.length == 0) {
                        error = [];
                        error.push('No entries found!')
                        filterErrorInsertPoint.innerHTML = errorsTemplateInstance({
                            error
                        });
                        clearFields();
                        setTimeout(function () {
                            filterErrorInsertPoint.innerHTML = '';
                        }, 3000)
                    } else {
                        let html = filteredStockTemplateInstance({
                            filteredShoes: data
                        });
                        let filteredStockTableHTML = html;
                        stockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                        clearFields();
                    }
                }).catch(function (err) {
                    alert(err);
                });
        } else if (size && size !== "all" && !color && !brand) {
            shoesService
                .getFilterSize(size)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    if (data.length == 0) {
                        error = [];
                        error.push('No entries found!')
                        filterErrorInsertPoint.innerHTML = errorsTemplateInstance({
                            error
                        });
                        clearFields();
                        setTimeout(function () {
                            filterErrorInsertPoint.innerHTML = '';
                        }, 3000)
                    } else {
                        let html = filteredStockTemplateInstance({
                            filteredShoes: data
                        });
                        let filteredStockTableHTML = html;
                        stockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                        clearFields();
                    }
                }).catch(function (err) {
                    alert(err);
                });
        } else if (brand && brand !== "all" && size && size !== "all" && !color) {
            shoesService
                .getFilterBrandSize(brand, size)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    if (data.length == 0) {
                        error = [];
                        error.push('No entries found!')
                        filterErrorInsertPoint.innerHTML = errorsTemplateInstance({
                            error
                        });
                        clearFields();
                        setTimeout(function () {
                            filterErrorInsertPoint.innerHTML = '';
                        }, 3000)
                    } else {
                        let html = filteredStockTemplateInstance({
                            filteredShoes: data
                        });
                        let filteredStockTableHTML = html;
                        stockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                        clearFields();
                    }
                }).catch(function (err) {
                    alert(err);
                });
        } else if (brand && brand !== "all" && color && color !== "all" && size && size !== "all") {
            shoesService
                .getFilterBrandColorSize(brand, color, size)
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    if (data.length == 0) {
                        error = [];
                        error.push('No entries found!')
                        filterErrorInsertPoint.innerHTML = errorsTemplateInstance({
                            error
                        });
                        clearFields();
                        setTimeout(function () {
                            filterErrorInsertPoint.innerHTML = '';
                        }, 3000)
                    } else {
                        let html = filteredStockTemplateInstance({
                            filteredShoes: data
                        });
                        let filteredStockTableHTML = html;
                        stockTemplateInsertPoint.innerHTML = filteredStockTableHTML;
                        clearFields();
                    }
                }).catch(function (err) {
                    alert(err);
                });
        } else if (brand == "all" || color == "all" || size == "all") {
            shoesService
                .getShoes()
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    if (data.length == 0) {
                        error = [];
                        error.push('No entries found!')
                        filterErrorInsertPoint.innerHTML = errorsTemplateInstance({
                            error
                        });
                        clearFields();
                        setTimeout(function () {
                            filterErrorInsertPoint.innerHTML = '';
                        }, 3000)
                    } else {
                        let html = stockTemplateInstance({
                            shoesEntry: data
                        });
                        let stockTableHTML = html;
                        stockTemplateInsertPoint.innerHTML = stockTableHTML;
                        clearFields();
                    }
                }).catch(function (err) {
                    alert(err);
                });
        } else {
            filterErrorInsertPoint.innerHTML = errorsTemplateInstance({
                error
            });
            setTimeout(function () {
                filterErrorInsertPoint.innerHTML = '';
            }, 3000)
            clearFields();
        }
    })

    dynamicCarting.addEventListener("click", function (event) {
        event.preventDefault()
        var isModal = event.target.id.endsWith("png")
        var openmodal = document.querySelectorAll('.modal-open')
        if (event.target.id.length < 5) {
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
                    // let successMessage = []
                    // successMessage.push("Item carted!")
                    // let successHtml = checkoutMessageInstance({
                    //     confirmation: successMessage
                    // });
                    // let successMessageHtml = successHtml;
                    // filterErrorInsertPoint.innerHTML = successMessageHtml
                    // setTimeout(function () {
                    //     filterErrorInsertPoint.innerHTML = '';
                    // }, 3000)
                }).catch({

                })
        } else if (isModal) {
            let html = modalTemplateInstance({
                modalImage: event.target.id
            })
            let modalHtml = html
            modalTemplateInsertPoint.innerHTML = modalHtml
            event.preventDefault()
            modal.classList.toggle('opacity-0')
            modal.classList.toggle('pointer-events-none')
            body.classList.toggle('modal-active')
        }
    })

    checkoutBtn.addEventListener('click', function () {
        console.log(cartedStockTemplateInsertPoint.innerHTML.length)
        if (cartedStockTemplateInsertPoint.innerHTML.length > 100) {
            var successMessage = []
            var errorMessage = []
            shoesService.postCheckout()
                .then(function (results) {
                    let response = results.data;
                    let data = response.data;
                    let html = cartedStockTemplateInstance({
                        cartedShoes: data
                    });
                    successMessage.push("Order received!")
                    let cartedTableHtml = html;
                    cartedStockTemplateInsertPoint.innerHTML = cartedTableHtml;
                }).then(function () {
                    showShoes();
                    clearFields();
                    cartedStockTemplateInsertPoint.innerHTML = "";
                    let html = checkoutMessageInstance({
                        confirmation: successMessage
                    });
                    let successMessageHtml = html;
                    checkoutMessageInsertPoint.innerHTML = successMessageHtml
                    setTimeout(function () {
                        checkoutMessageInsertPoint.innerHTML = '';
                    }, 3000)
                }).catch(function (err) {
                    alert(err);
                });
        } else {
            var errorMessage = []
            errorMessage.push("Cart is empty!")
            checkoutMessageInsertPoint.innerHTML = errorsTemplateInstance({
                error: errorMessage
                
            });
            setTimeout(function () {
                checkoutMessageInsertPoint.innerHTML = '';
            }, 3000)
        }
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
                    let successMessage = []
                    successMessage.push("Stock added!")
                    let successHtml = checkoutMessageInstance({
                        confirmation: successMessage
                    });
                    let successMessageHtml = successHtml;
                    updateErrorInsertPoint.innerHTML = successMessageHtml
                    setTimeout(function () {
                        updateErrorInsertPoint.innerHTML = '';
                    }, 3000)
                })
                .catch(function (err) {
                    alert(err);
                });
        } else {
            updateErrorInsertPoint.innerHTML = errorsTemplateInstance({
                error
            })
            setTimeout(function () {
                updateErrorInsertPoint.innerHTML = '';
            }, 3000)
        }
    });

    showShoes();
    showCart();
})