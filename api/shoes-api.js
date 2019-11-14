module.exports = function (shoeService) {



    async function allShoes(req, res) {
        try {
            let results = await shoeService.all();
            res.json({
                status: 'success',
                data: results
            });
        } catch (err) {
            next(err);
        }
    };

    async function addShoe(req, res) {
        try {
            await shoeService.add(req.body)
            res.json({
                status: "success",
            });
        } catch (err) {
            res.json({
                status: "error",
                error: err.stack
            });
        }
    };

    async function filterShoes(req, res) {
        try {
            let brand = req.params.brand
            let color = req.params.color
            let size = req.params.size
            //console.log(brand)
            if (brand && !color && !size) {
                var filteredData = await shoeService.filterBrand(brand);
            }
            if (color && !brand && !size) {
                var filteredData = await shoeService.filterColor(color);
            }
            if (size && !brand && !color) {
                var filteredData = await shoeService.filterSize(size);
            }
            if (brand && color && size) {
                var filteredData = await shoeService.filterBrandColorSize(brand, color, size);
            }
            res.json({
                status: "success",
                data: filteredData
            });
        } catch (err) {
            res.json({
                status: "error",
                error: err.stack
            });
        }
    };

    // async function add(req, res) {

    //     try {
    //         await productService.create({
    //             category_id: Number(req.body.category_id),
    //             description : req.body.description,
    //             price: Number(req.body.price)
    //         });

    //         res.json({
    //             status: "success",
    //         });
    //     }
    //     catch (err) {
    //         res.json({
    //             status: "error",
    //             error: err.stack
    //         });
    //     }
    // };



    // async function update(req, res, next) {
    //     try{
    //         await productService.update({
    //             category_id: Number(req.body.category_id),
    //             description: req.body.description,
    //             price: Number(req.body.price),
    //             id: req.params.id
    //         });
    //         res.json({
    //             status: "success"
    //         });
    //     }
    //     catch(err){
    //         res.json({
    //             status: "error",
    //             error: err.stack
    //         });
    //     }
    // };

    // async function deleteProduct (req, res, next) {
    //     try{
    //         var id = req.params.id;
    //         await productService.delete(id);
    //         res.json({
    //             status: "success"
    //         });
    //     }
    //     catch(err){
    //         res.json({
    //             status: "error",
    //             error: err.stack
    //         });
    //     }
    // };

    return {
        allShoes,
        addShoe,
        filterShoes
        //add
        // add,
        // get,
        // delete : deleteProduct,
        // update
    }



}