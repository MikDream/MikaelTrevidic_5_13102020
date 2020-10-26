var urlProduit = new URL(window.location.href);
urlProduit = (urlProduit.searchParams.get("id"));
// Création du bloc individuel des produits en fonction de l'_id
let products = function(produits){
    let i = 0;
    let x = 0;
    let lenghtArrayProduit = produits.length;
    while(i < lenghtArrayProduit ){
        if((produits[i]._id) == urlProduit){
            let imageProduit = document.querySelector('.product > img');
            imageProduit.src = produits[i].imageUrl;
            let nomProduit = document.querySelector('.product > h1');
            nomProduit.textContent = produits[i].name;
            let descriptionProduit = document.querySelector('.descriptionProduit');
            descriptionProduit.textContent = produits[i].description;
            let prixProduit = document.querySelector('.prixProduit');
            prixProduit.insertAdjacentText('beforeend', produits[i].price);
            let lenghtArrayColor = produits[i].colors.length;
            while(x < lenghtArrayColor){
                let select = document.querySelector('#colors-select');
                let option = document.createElement('option');
                option.innerText = produits[i].colors[x];
                select.appendChild(option);
                x++;
            };
            break;
        };
        i++; 
    };
};

