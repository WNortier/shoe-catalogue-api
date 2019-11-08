module.exports = function ShoesRoutes(shoesService) {

    // function sendRoute(req, res, err) {
    //     res.send("Basic ExpressJS Server Template");
    // }

    function homeRoute(req, res, next) {
        try {
            res.render('home');
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    // async function show(req, res, next) {
	// 	try {
	// 		let results = await productService.all(); 
	// 		res.render('products/home', {
	// 			no_products: results.length === 0,
	// 			products: results,
	// 		});
	// 	}
	// 	catch (err) {
	// 		next(err);
	// 	}
	// };

    // async function aPostRoute(req, res, err, next) {
    //     try {
    //         let inputOne = req.body.anInput
    //         console.log(inputOne)
    //         let inputTwo = req.body.anotherInput
    //         console.log(inputTwo)
    //         res.redirect("/");
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    return {
        homeRoute
    }
}