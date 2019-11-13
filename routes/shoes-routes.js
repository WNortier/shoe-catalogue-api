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
            await shoeService.add(req.body)
            res.redirect("/");
        } catch (err) {
            next(err);
        }
    };

    async function filterRoute(req, res, next) {

        try {
console.log(req.body.color)
            res.render("home",{
                filteredShoes: await shoeService.filterBrand(req.body.brand),
                //shoesEntry: await shoeService.all()
            })
            // res.redirect("/");
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