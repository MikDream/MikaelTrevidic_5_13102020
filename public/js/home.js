get('http://localhost:3000/api/teddies').then(function(response){
    let produits = JSON.parse(response);
    productsFirst(produits);
    productsInfos(produits);
    compteurPanier();
}).catch(catchError);
// Affichage du produit à la une
let productsFirst = function(produit){
    let imageProduit = document.createElement('img');
    let nomProduit = document.createElement('a');
    imageProduit.setAttribute('id', 'imgAlaUne');
    imageProduit.setAttribute('src', produit[3].imageUrl);
    imageProduit.setAttribute('alt', 'image de '+produit[3].name);
    nomProduit.setAttribute('href', 'produit.html?id='+produit[3]._id);
    nomProduit.innerHTML = '<h3>'+produit[3].name+'</h3>';
    document.querySelector('.aLaUne__image').append(imageProduit, nomProduit);
};
//Création de chaque carte de produits
let createCard = function(produit, i, blocParent){
    let link = document.createElement('a');
    let card = document.createElement('li');
    let image = document.createElement('img');
    let text = document.createElement('div');
    let name = document.createElement('h3');
    let price = document.createElement('p');
    link.setAttribute('href', 'produit.html?id='+produit[i]._id);
    card.setAttribute('class', 'card');
    image.setAttribute('src', produit[i].imageUrl);
    image.setAttribute('alt', 'image de '+produit[i].name);
    text.setAttribute('class', 'card__text');
    name.textContent = produit[i].name;
    price.textContent = 'Prix : '+formatPrix(produit[i].price)+'€';
    text.append(name, price);
    card.append(image, text);
    link.appendChild(card);
    blocParent.appendChild(link);
};
// Affichage des produits
let productsInfos = function(produits){
    let lenghtArrayProduit = produits.length;
    let blocNomsProduits = document.querySelector('#products-list');
    for(let i = 0; i < lenghtArrayProduit; i++){
        createCard(produits, i, blocNomsProduits);
    };
};
//Fonction de formatage du prix
let formatPrix = function(prix){
    let resultat = prix / 100;
    new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(resultat);
    return resultat;
};