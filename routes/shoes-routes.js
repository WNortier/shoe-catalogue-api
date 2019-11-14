module.exports = function ShoesRoutes(shoeService) {

    // function sendRoute(req, res, err) {
    //     res.send("Basic ExpressJS Server Template");
    // }

    async function homeRoute(req, res, next) {
        try {
            res.render('home', {
                shoesEntry: await shoeService.all()
            });
        } catch (err) {
            next(err);
        }
    }

    async function addRoute(req, res, next) {
        try {
            console.log(req.body)
            await shoeService.add(req.body)
            res.redirect("/");
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
                    shoesEntry: await shoeService.all()
                });
            } else if (color && !brand && !size) {
                res.render("home", {       
                    filteredShoes: await shoeService.filterColor(color),
                    shoesEntry: await shoeService.all()
                });
            } else if (size && !color && !brand) {
                res.render("home", {
                    filteredShoes: await shoeService.filterSize(size),
                    shoesEntry: await shoeService.all()
                });
            } else if (brand && color && size) {
                res.render("home", {
                    filteredShoes: await shoeService.filterBrandColorSize(brand, color, size),
                    shoesEntry: await shoeService.all()
                });
            }
        } catch (err) {
            next(err);
        }
    }

    return {
        homeRoute,
        addRoute,
        filterRoute
    }
}

// it can all be done from one route 

// if req.body.brand -> then we filter brand

// if req.body.color -> then we filter color 

// if req.body.size -> then we filter size