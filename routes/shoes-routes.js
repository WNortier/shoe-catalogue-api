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
            console.log(req.body.brand)
            console.log(req.body.color)
            console.log(req.body.size)
            await shoeService.add(req.body.brand, req.body.color, Number(req.body.size), Number(req.body.price), Number(req.body.quantity))
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