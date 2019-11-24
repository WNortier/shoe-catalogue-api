document.addEventListener('DOMContentLoaded', async function (pool) {
    let errorElem = document.querySelector('.error');
    if (errorElem.innerHTML !== ''){
        setTimeout(function(){
            errorElem.innerHTML = '';
        }, 5000);
    }
});

