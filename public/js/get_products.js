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
    var urlPage = new URL(document.location.href);
    urlPage = (urlPage.searchParams.get("id"));
    var pathArray = window.location.pathname.split( "/" );
    var lastPath = pathArray[pathArray.length - 1];
    switch(urlPage){                    // Va permettre d'appeler les fonctions soit sur index.html soit sur produit.html
        case null:
            if(lastPath == 'index.html'){
                productsImage(produits);
                productsName(produits);
            }else{
                pathArray.pop();
                pathArray.push('index.html');
                var redirectPath = "";
                for(i=0; i<pathArray.length; i++){
                    redirectPath += "/";
                    redirectPath += pathArray[i];
                }
                window.location.pathname=redirectPath;
            }
            break;
        case urlPage:
            products(produits);
            break;
    }
}).catch(catchError);