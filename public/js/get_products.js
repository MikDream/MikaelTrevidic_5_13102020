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
let compteurPanier = function(){
    let compteur = localStorage.getItem("number");
    if(compteur == null)
        compteur = 0;
    document.querySelector(".compteurPanier > span").textContent =  " Panier ("+compteur+")";
};