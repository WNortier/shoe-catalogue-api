document.addEventListener('DOMContentLoaded', function () {

    let shoesListTemplate = document.querySelector('.shoesListTemplate')
    let getShoesTemplateInsertPoint = document.querySelector('.getShoesTemplateInsertPoint');
    let shoesListTemplateInstance = Handlebars.compile(shoesListTemplate.innerHTML);


    function ShoesService() {
        function postShoes(data) {
            return axios.post('/api/shoes', data)
        }

        function getShoes() {
            return axios.get('/api/shoes')
        }

        return {
            postShoes,
            getShoes
        }
    }

    let shoesService = ShoesService();



    function showShoes() {
        shoesService
            .getShoes()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                console.log(data)
                let html = shoesListTemplateInstance({
                    shoesEntry: data
                });
                let shoesTableHTML = html;
                getShoesTemplateInsertPoint.innerHTML = shoesTableHTML;
            });

    }

    showShoes();

});