module.exports = function(shoesService) {

    
	
        async function allShoes(req, res) {
            try {
                let results = await shoesService.all();
                res.json({
                    status: 'success',
                    data: results
                });
            }
            catch (err) {
                next(err);
            }
        };

        async function addShoe(req, res) {
            try {
                await shoesService.add(req.body.brand, req.body.color, Number(req.body.size), Number(req.body.price), Number(req.body.quantity))
                res.json({
                    status: "success",
                });
            }
            catch (err) {
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
    
        // async function get(req, res) {
        //     try {
        //         let id = req.params.id;
        //         let product = await productService.get(id);
        //         res.json({
        //             status: "success",
        //             data: product
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
            addShoe
            //add
            // add,
            // get,
            // delete : deleteProduct,
            // update
        }
    
    

}