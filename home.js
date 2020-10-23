let productsImage = function(produits){
    let imageProduit = document.querySelector('#imgAlaUne');
    imageProduit.src = produits[3].imageUrl;
};
let productsName = function(produits){
    let lenghtArrayProduit = produits.length;
    let blocNomsProduits = document.querySelector('#products-list');
    let names;
    for(let i = 0; i < lenghtArrayProduit; i++){
        names = document.createElement('li');
        names.innerHTML = "<a href='produit.html?id="+produits[i]._id+"'>"+produits[i].name+"</a>";
        blocNomsProduits.appendChild(names);
    };
};