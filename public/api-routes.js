function ShoesService() {
    function postShoes(data) {
        return axios.post('/api/shoes', data)
    }

    function getShoes() {
        return axios.get('/api/shoes')
    }

    function getFilterBrand(brand) {
        return axios.get('/api/shoes/brand/' + brand)
    }

    function getFilterColor(color) {
        return axios.get('/api/shoes/color/' + color)
    }

    function getFilterSize(size) {
        return axios.get('/api/shoes/size/' + size)
    }

    function getFilterBrandSize(brand, size) {
        return axios.get('/api/shoes/brand/' + brand + '/size/' + size)
    }

    function getFilterBrandColorSize(brand, color, size) {
        return axios.get('/api/shoes/brand/' + brand + '/size/' + color + '/color/' + size)
    }

    function getCart(brand, color, size) {
        return axios.get('/api/shoes/cart/brand/' + brand + '/size/' + size + '/color/' + color)
    }

    function postCheckout() {
        return axios.post('/api/shoes/checkout')
    }

    function postCancel() {
        return axios.post('/api/shoes/cancel')
    }

    return {
        postShoes,
        getShoes,
        getFilterBrand,
        getFilterColor,
        getFilterSize,
        getFilterBrandSize,
        getFilterBrandColorSize,
        getCart,
        postCheckout,
        postCancel
    }
}