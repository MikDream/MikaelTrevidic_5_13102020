// Récupération des données de l'api
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
// En cas d'erreur
let catchError = function(error){
    console.error('Erreur AJAX', error);
};
// Appel de la fonction get
get('http://localhost:3000/api/teddies').then(function(response){
    let produits = JSON.parse(response);
    var pathUrlArray = window.location.pathname.split( "/" );
    var pageUrl = pathUrlArray[pathUrlArray.length - 1];
    switch(pageUrl){                    // Va permettre d'appeler les fonctions soit sur index.html soit sur produit.html
        case 'index.html':
            productsImage(produits);
            productsName(produits);
            break;
        case 'produit.html':
            var urlPage = new URL(document.location.href);
            urlPage = (urlPage.searchParams.get("id"));
            if(urlPage == null){
                pathUrlArray.pop();
                pathUrlArray.push('index.html');
                var redirectPath = "";
                for(i=0; i<pathUrlArray.length; i++){
                    redirectPath += "/";
                    redirectPath += pathUrlArray[i];
                }
                window.location.pathname=redirectPath;
            }else
                products(produits);
            break;
        case 'panier.html':
            break;
    };
}).catch(catchError);