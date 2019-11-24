module.exports = function ShoesRoutes(shoeService) {

    async function homeRoute(req, res, next) {
        try {
            res.render('home', {
                shoesEntry: await shoeService.allStock()
            });
        } catch (err) {
            next(err);
        }
    }

    async function addRoute(req, res, next) {
        try {
            let brand = req.body.brand
            let color = req.body.color 
            let size = Number(req.body.size)
            let price = Number(req.body.price)
            let quantity = Number(req.body.quantity)

            if (brand && color && size && price && quantity){
            await shoeService.add(req.body)
            res.redirect("/");
        } else {
            res.redirect("/")
        }
        } catch (err) {
            next(err);
        }
    };

    async function filterRoute(req, res, next) {
        try {
            let brand = req.body.brand
            let color = req.body.color
            let size = req.body.size
            
            if (brand && !color && !size) {
                res.render("home", {
                    filteredShoes: await shoeService.filterBrand(brand),
                    shoesEntry: await shoeService.allStock()
                });
            } else if (color && !brand && !size) {
                res.render("home", {
                    filteredShoes: await shoeService.filterColor(color),
                    shoesEntry: await shoeService.allStock()
                });
            } else if (size && !color && !brand) {
                res.render("home", {
                    filteredShoes: await shoeService.filterSize(size),
                    shoesEntry: await shoeService.allStock()
                });
            } else if (brand && color && size) {
                res.render("home", {
                    filteredShoes: await shoeService.filterBrandColorSize(brand, color, size),
                    shoesEntry: await shoeService.allStock()
                });
            }
        } catch (err) {
            next(err);
        }
    }

    async function cartRoute(req, res, next) {
        try {
            let brand = req.body.brand
            let color = req.body.color
            let size = req.body.size

            if (brand && !color && !size) {
                return false
            } else if (color && !brand && !size) {
                return false
            } else if (size && !color && !brand) {
                return false
            } else if (brand && color && size) {
                res.render("home", {
                    cartedShoes: await shoeService.cart(brand, color, size),
                    shoesEntry: await shoeService.allStock()
                });
            }
        } catch (err) {
            next(err);
        }
    }

    async function checkoutRoute(req, res, next) {
        try {
            await shoeService.checkout()
            res.redirect("/");
        } catch (err) {
            next(err);
        }
    }

    async function cancelRoute(req, res, next) {
        try {
            await shoeService.cancel();
            res.redirect("/")
        } catch (err) {
            next(err);
        }
    }

    return {
        homeRoute,
        addRoute,
        filterRoute,
        cartRoute,
        checkoutRoute,
        cancelRoute
    }
}