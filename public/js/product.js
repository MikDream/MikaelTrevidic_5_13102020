// Affichage de la page produit
var urlProduit = new URL(window.location.href);
urlProduit = (urlProduit.searchParams.get("id"));
if(urlProduit){// si un id est détécté dans l'url, appel des fonctions d'affichage du produit
    get('http://localhost:3000/api/teddies/'+urlProduit).then(function(response){
        let produit = JSON.parse(response);
        afficherProduit(produit); // affichage du produit
        addCart(produit); // ajout au localStorage
        compteurPanier(); 
    }).catch(catchError);
}else{ // si aucun id n'est présent dans l'url, redirection sur page index.html
    var pathUrlArray = window.location.pathname.split( "/" );
    var pageUrl = pathUrlArray[pathUrlArray.length - 1];
    pathUrlArray.pop();
    pathUrlArray.push('index.html');
    var redirectPath = "";
    for(i=0; i<pathUrlArray.length; i++){
        redirectPath += "/";
        redirectPath += pathUrlArray[i];
    }
    if(window.confirm("Veuillez selectionner un produit !")){
        window.location.pathname=redirectPath;
    };
};
// Fonction de l'affichage produit lorsqu'un id est présent dans l'url
let afficherProduit = function(produit){
    let nomPageProduit = document.querySelector('head > title');
    nomPageProduit.textContent = produit.name;              //Création nom page
    let imageProduit = document.querySelector('.product > img');
    imageProduit.src = produit.imageUrl;                    //Création image
    let nomProduit = document.querySelector('.product > h1');
    nomProduit.textContent = produit.name;                  //Création h1
    let descriptionProduit = document.querySelector('.descriptionProduit');
    descriptionProduit.textContent = produit.description;  //Création description
    let prixProduit = document.querySelector('.product--price');
    prixProduit.insertAdjacentText('beforeend', formatPrix(produit.price)+'€');//Création prix
    produit.colors.forEach(color => {
        var select = document.querySelector('#colors-select');
        var option = document.createElement('option');
        option.innerText = color;
        select.appendChild(option);
    });
};
let numberOfSameToCart = function(){
    let quantite = 1;
    document.querySelector('#moreArticle').addEventListener('click', function(e){
        document.querySelector('#lessArticle').removeAttribute('disabled');
        quantite++;
        document.querySelector('#numberOfArticle').setAttribute('value', quantite);
    });
    document.querySelector('#lessArticle').addEventListener('click', function(){
        if(quantite!=1 && quantite > 0)
            document.querySelector('#lessArticle').removeAttribute('disabled');
            else
            document.querySelector('#lessArticle').setAttribute('disabled', true);
        quantite--;
        document.querySelector('#numberOfArticle').setAttribute('value', quantite);
    });
};
// Fonction d'ajout au localStorage
let addCart = function(article){
    numberOfSameToCart();
    document.querySelector('#addCart').addEventListener('click' ,function(){
        let value = document.querySelector('#numberOfArticle');
        let quantite = value.getAttribute('value');
        for(let i=1; i<=quantite; i++){
            countCart();
            let cartArray = [];
            let itemStorage = "panier";
            let cartArray_json = localStorage.getItem(itemStorage);
            let articleInfo = {
                'nom': article.name,
                'prix': article.price,
                'id': article._id,
                'quantite': 1,
                'image': article.imageUrl
            };
            if(cartArray_json == null){
                cartArray.push(articleInfo);
                setStorage(cartArray_json, cartArray, itemStorage);
            }else{
                cartArray = JSON.parse(cartArray_json);
                cartArray.push(articleInfo);
                setStorage(cartArray_json, cartArray, itemStorage);
            }
        };
    });
};
// Fonction de conversion en JSON de l'objet produit et création de l'objet en local storage
let setStorage = function(json, toJson, nameItem){
    json = JSON.stringify(toJson);
    localStorage.setItem(nameItem, json);
};
// Fonction du compteur des articles
let countCart = function(){
    var numberArt = localStorage.getItem("number");
    if(numberArt == null)
        numberArt = 0;
     else
        numberArt = parseInt(numberArt, 10);
    numberArt++;
    localStorage.setItem("number", (numberArt).toString(10));
    compteurPanier();
};
//Fonction de formatage du prix
let formatPrix = function(prix){
    let resultat = prix / 100;
    new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(resultat);
    return resultat;
};