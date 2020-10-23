let get = function(url){
    return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === 4){
                if(request.status === 200)
                    resolve(request.responseText);
                else
                    reject(request);        
            };
        };
        request.open('GET', url, true);
        request.send();
    });
};
let catchError = function(error){
    console.error('Erreur AJAX', error);
};
get('http://localhost:3000/api/teddies').then(function(response){
    let produits = JSON.parse(response);
    var urlPage = new URL(window.location.href);
    urlPage = (urlPage.searchParams.get("id"));
    switch(urlPage){
        case null:
            productsImage(produits);
            productsName(produits);
            break;
        case urlPage:
            products(produits);
            break;
    }
}).catch(catchError);