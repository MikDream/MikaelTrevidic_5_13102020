var urlProduit = new URL(window.location.href);
urlProduit = (urlProduit.searchParams.get("id"));

// Création du bloc individuel des produits en fonction de l'_id
var products = function(produits){
    let i = 0;
    let x = 0;
    let lenghtArrayProduit = produits.length;
    while(i < lenghtArrayProduit ){
        if((produits[i]._id) == urlProduit){
            var nomPageProduit = document.querySelector('head > title');
            nomPageProduit.textContent = produits[i].name;              //Création nom page
            var imageProduit = document.querySelector('.product > img');
            imageProduit.src = produits[i].imageUrl;                    //Création image
            var nomProduit = document.querySelector('.product > h1');
            nomProduit.textContent = produits[i].name;                  //Création h1
            var descriptionProduit = document.querySelector('.descriptionProduit');
            descriptionProduit.textContent = produits[i].description;  //Création description
            var prixProduit = document.querySelector('.prixProduit');
            prixProduit.insertAdjacentText('beforeend', produits[i].price);//Création prix
            var lenghtArrayColor = produits[i].colors.length;               // Bloc de récupération des options de couleurs
            while(x < lenghtArrayColor){
                var select = document.querySelector('#colors-select');
                var option = document.createElement('option');
                option.innerText = produits[i].colors[x];
                select.appendChild(option);
                x++;
            };
            break; 
        };
        i++; 
    };
    var add = document.querySelector('#addCart');
    add.addEventListener('click', function(){
        var numArt = localStorage.getItem("number");
    if(numArt == null) {
        numArt = 0;
      } else {
        numArt = parseInt(numArt, 10);
      }
      numArt++;
      localStorage.setItem("number", (numArt).toString(10));
        var store = {
            nom : produits[i].name,
            prix : produits[i].price,
            id : produits[i]._id
        };
        var store_json = JSON.stringify(store);
        localStorage.setItem("articlePanier"+numArt, store_json);
        console.log(localStorage);
    }); 
};
