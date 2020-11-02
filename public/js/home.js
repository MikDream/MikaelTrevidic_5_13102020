get('http://localhost:3000/api/teddies').then(function(response){
    let produits = JSON.parse(response);
    productsFirst(produits);
    productsInfos(produits);
    compteurPanier();
}).catch(catchError);
let productsFirst = function(produit){
    let imageProduit = document.querySelector('#imgAlaUne');
    imageProduit.src = produit[3].imageUrl;
    let nomProduit = document.querySelector(".aLaUne__image > h3");
    nomProduit.textContent = produit[3].name;
};
let productsInfos = function(produits){
    let lenghtArrayProduit = produits.length;
    let blocNomsProduits = document.querySelector('#products-list');
    let names;
    for(let i = 0; i < lenghtArrayProduit; i++){
        names = document.createElement('li');
        names.innerHTML = "<a href='produit.html?id="+produits[i]._id+"'>"+produits[i].name+"</a>";
        blocNomsProduits.appendChild(names);
    };
};