module.exports = function (shoeService) {

    async function allShoes(req, res) {
        try {
            let results = await shoeService.allStock();
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

            if (brand && !color && !size) {
                var filteredData = await shoeService.filterBrand(brand);
            }
            if (color && !brand && !size) {
                var filteredData = await shoeService.filterColor(color);
            }
            if (size && !brand && !color) {
                var filteredData = await shoeService.filterSize(size);
            }
            if (brand && size) {
                var filteredData = await shoeService.filterBrandSize(brand, size);
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

    async function cartShoes(req, res) {
        try {
            let id = Number(req.params.id)
            var cartData = await shoeService.cart(id)
            res.json({
                status: "success",
                data: cartData
            });
        } catch (err) {
            res.json({
                status: "error",
                error: err.stack
            });
        }
    };

    async function checkoutShoes(req, res) {
        try {
            await shoeService.checkout()
            res.json({
                status: "success",
                data: cartData
            });
        } catch (err) {
            res.json({
                status: "error",
                error: err.stack
            });
        }
    };

    async function cancelShoes(req, res) {
        try {
            await shoeService.cancel()
            res.json({
                status: "success",
                data: cartData
            });
        } catch (err) {
            res.json({
                status: "error",
                error: err.stack
            });
        }
    }

    return {
        allShoes,
        addShoe,
        filterShoes,
        cartShoes,
        checkoutShoes,
        cancelShoes
    }
}